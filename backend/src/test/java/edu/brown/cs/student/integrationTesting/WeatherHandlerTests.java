package edu.brown.cs.student.integrationTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static spark.Spark.after;

import com.google.common.util.concurrent.UncheckedExecutionException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import server.weatherapi.WeatherCache;
import server.weatherapi.WeatherHandler;
import server.weatherapi.WeatherQuery;
import server.weatherapi.WeatherUtilities;
import spark.Spark;

/**
 * integration and unit tests for weather api and caching
 */
public class WeatherHandlerTests {

  /**
   * Before all tests, a server is sparked on port 0 and a root logger is established.
   */
  @BeforeAll
  public static void setup_before_everything() {

    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
  }

  /**
   * Gets results from queried connection, re-implemented from WeatherQuery
   *
   * @param inURL queried connection
   * @return query results string
   * @throws IOException when error occurs in connection
   */
  private String getQueryResult(HttpURLConnection inURL) throws IOException {
    BufferedReader in = new BufferedReader(
        new InputStreamReader(inURL.getInputStream()));
    String inputLine;
    StringBuilder content = new StringBuilder();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    inURL.disconnect();
    return content.toString(); // return contents as a string
  }

  /**
   * Before each test the server is initialized with all handlers prepared. Ensures a fresh server
   * for every test.
   */
  @BeforeEach
  public void setup() {
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
          response.header("Content-Type", "application/json");
        });
    Spark.get("weather", new WeatherHandler(3, TimeUnit.SECONDS, 1.0));
    Spark.init();
    Spark.awaitInitialization();
  }

  /**
   * After each test, gracefully stop the Spark server.
   */
  @AfterEach
  public void teardown() {
    // Gracefully stop Spark listening on both endpoints
    Spark.unmap("/weather");
    Spark.awaitStop();
  }

  /**
   * Sends request to the server api and establishes a connection.
   *
   * @param apiCall - request to be sent
   * @return - return the connection
   * @throws IOException thrown when creating URL, calling openConnection(), or connect()
   */
  static private HttpURLConnection tryRequest(String apiCall) throws IOException {
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    return clientConnection;
  }

  /**
   * Tests that a bad request error is returned when weather is requested with no arguments
   * @throws IOException thrown by tryRequest
   */
  @Test
  public void testWeather() throws IOException{
    HttpURLConnection weatherConnection = tryRequest("weather");
    String response = this.getQueryResult(weatherConnection);
    assertEquals(response, "{\"result\":\"error_bad_request\",\"message\":\"Please provide "
        + "doubles for both latitude ('lat') and longitude ('lon') to get weather temperature\"}");
  }

  /**
   * tests that a weather query successfullu stores the results in a WeatherRecord and that the values
   * are correct
   * @throws IOException thrown by tryRequest
   * @throws ExecutionException thrown by queryWeather
   */
  @Test
  public void testWeatherWithCoords() throws IOException, ExecutionException {
    WeatherQuery weatherQuery = new WeatherQuery();
    WeatherCache cache = new WeatherCache(1, TimeUnit.MINUTES, weatherQuery);
    tryRequest("weather?lat=41.8&lon=-71.4");
    WeatherUtilities.WeatherCoordinates queryCoord = new WeatherUtilities.WeatherCoordinates(41.8, -71.4, 1.);
    WeatherUtilities.WeatherRecord value = cache.queryWeather(queryCoord);
    assertEquals(value.date(), java.time.LocalDateTime.now().toLocalDate().toString());
    assertEquals(value.temperatureUnit(), "F");
    assertEquals(value.timezone(), java.time.ZoneId.systemDefault().toString());
    assertNotNull(value.temperature());
    assertNotNull(value.time());
  }

  /**
   * tests to see if inputting coordinates not in the NWS system throws an UncheckedExecutionException
   */
  @Test
  public void testWeatherBadCoords() {
    WeatherQuery weatherQuery = new WeatherQuery();
    WeatherCache cache = new WeatherCache(1, TimeUnit.MINUTES, weatherQuery);
    WeatherUtilities.WeatherCoordinates queryCoord = new WeatherUtilities.WeatherCoordinates(-41.8, 71.4, 1.);
    assertThrows(UncheckedExecutionException.class, () -> cache.queryWeather(queryCoord));
  }

  /**
   * tests that the correct error response is thrown when inputted coordinates are not doubles
   * @throws IOException
   */
  @Test
  public void testWeatherNoDoubles() throws IOException {
    HttpURLConnection weatherConnection = tryRequest("weather?lat=41&lon=-71");
    String response = this.getQueryResult(weatherConnection);
    assertEquals(response, "{\"result\":\"error_datasource\",\"lon\":\"-71\",\"message\":"
        + "\"java.lang.IllegalStateException: Failure to establish connection with or error response"
        + " from https://api.weather.gov\",\"lat\":\"41\"}");
  }

  /**
   * tests that the cache can hold multiple weather records after they are queried and that subsequent
   * calls to the weather api within the distance threshold return the cached weather record
   * @throws IOException see above
   * @throws ExecutionException see above
   */
  @Test
  public void testCaching() throws IOException, ExecutionException {
    WeatherQuery weatherQuery = new WeatherQuery();
    WeatherCache cache = new WeatherCache(1, TimeUnit.MINUTES, weatherQuery);
    WeatherUtilities.WeatherCoordinates queryCoord = new WeatherUtilities.WeatherCoordinates(41.8, -71.4, 1.);
    WeatherUtilities.WeatherRecord cachedValue1 = cache.queryWeather(queryCoord);
    queryCoord = new WeatherUtilities.WeatherCoordinates(34.01, -118.49, 1.);
    WeatherUtilities.WeatherRecord cachedValue2 = cache.queryWeather(queryCoord);
    queryCoord = new WeatherUtilities.WeatherCoordinates(39.09, -94.57, 1.);
    WeatherUtilities.WeatherRecord cachedValue3 = cache.queryWeather(queryCoord);

    queryCoord = new WeatherUtilities.WeatherCoordinates(41.1, -71.9, 1.);
    WeatherUtilities.WeatherRecord value = cache.queryWeather(queryCoord);
    assertEquals(value, cachedValue1);
    queryCoord = new WeatherUtilities.WeatherCoordinates(34.5, -118.9, 1.);
    value = cache.queryWeather(queryCoord);
    assertEquals(value, cachedValue2);
    queryCoord = new WeatherUtilities.WeatherCoordinates(39.5, -95.1, 1.);
    value = cache.queryWeather(queryCoord);
    assertEquals(value, cachedValue3);
  }

  /**
   * tests that returns from the weather api are different when coordinates are different from cached
   * coordinates
   * @throws ExecutionException - see above
   */
  @Test
  public void testCachingNewCoords() throws ExecutionException {
    WeatherQuery weatherQuery = new WeatherQuery();
    WeatherCache cache = new WeatherCache(1, TimeUnit.MINUTES, weatherQuery);
    WeatherUtilities.WeatherCoordinates queryCoord = new WeatherUtilities.WeatherCoordinates(41.8, -71.4, 1.);
    WeatherUtilities.WeatherRecord cachedValue1 = cache.queryWeather(queryCoord);
    queryCoord = new WeatherUtilities.WeatherCoordinates(43.2, -75.5, 1.);
    WeatherUtilities.WeatherRecord value = cache.queryWeather(queryCoord);
    assertNotEquals(value, cachedValue1);
  }
}
