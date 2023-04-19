package fuzzTesting;

import static org.testng.AssertJUnit.assertTrue;
import static spark.Spark.after;

import edu.brown.cs.student.parser.FactoryFailureException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.TimeUnit;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import server.csvapi.LoadHandler;
import server.weatherapi.WeatherHandler;
import spark.Spark;

public class FuzzTest {

  /** Before all tests, a server is sparked on port 0 and a root logger is established. */
  @BeforeAll
  public static void setup_before_everything() {

    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
  }

  final Storage storage = new Storage();

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
    Spark.get("loadcsv", new LoadHandler(this.storage));
    Spark.get("viewcsv", new ViewHandler(this.storage));
    Spark.get("searchcsv", new SearchHandler(this.storage));
    Spark.get("weather", new WeatherHandler(3, TimeUnit.SECONDS, 1.0));
    Spark.init();
    Spark.awaitInitialization();
  }

  /** After each test, gracefully stop the Spark server. */
  @AfterEach
  public void teardown() {
    Spark.unmap("/loadcsv");
    Spark.unmap("/viewcsv");
    Spark.unmap("/searchcsv");
    Spark.unmap("/weather");
    Spark.awaitStop();
  }

  /**
   * Gets results from queried connection, re-implemented from WeatherQuery
   *
   * @param inURL queried connection
   * @return query results string
   * @throws IOException when error occurs in connection
   */
  private String getQueryResult(HttpURLConnection inURL) throws IOException {
    BufferedReader in = new BufferedReader(new InputStreamReader(inURL.getInputStream()));
    String inputLine;
    StringBuilder content = new StringBuilder();
    while ((inputLine = in.readLine()) != null) {
      content.append(inputLine);
    }
    in.close();
    inURL.disconnect();
    return content.toString();
  }

  /**
   * Sends request to the server api and establishes a connection.
   *
   * @param apiCall - request to be sent
   * @throws IOException thrown when creating URL, calling openConnection(), or connect()
   */
  private static HttpURLConnection tryRequest(String apiCall) throws IOException {
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    return clientConnection;
  }

  /**
   * fuzz tests search with valid inputs
   *
   * @throws IOException thrown when an error occurs in the connection
   * @throws FactoryFailureException thrown when creator fails -- doesn't
   */
  @Test
  public void fuzzSearchTest() throws IOException, FactoryFailureException {
    HttpURLConnection request =
        tryRequest("loadcsv?filepath=data%2Fstars%2Fstardata.csv&header=True");
    FuzzHelper fuzzHelper = new FuzzHelper();
    for (int i = 0; i < 500; i++) {
      String apiCall = fuzzHelper.randomStarSearch(this.storage);
      request = tryRequest(apiCall);
      assertTrue(request.getResponseCode() != -1);
    }
  }

  /**
   * fuzz tests valid weather coords
   *
   * @throws IOException thrown when a connection error occurs
   */
  @Test
  public void fuzzWeatherTest() throws IOException {
    FuzzHelper fuzzHelper = new FuzzHelper();
    for (int i = 0; i < 1000; i++) {
      Double lat = fuzzHelper.randomCoordSearch(20.0, 50.0);
      Double lon = fuzzHelper.randomCoordSearch(-130.0, -160.0);
      HttpURLConnection request = tryRequest("weather?lat=" + lat + "&lon=" + lon);
      // assertTrue(request.getResponseCode() != -1);
    }
  }
}
