package edu.brown.cs.student.integrationTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static spark.Spark.after;

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
import spark.Spark;
import server.weatherapi.WeatherHandler;

/**
 * Integration testing for csvapi-related handlers.
 */
public class HandlerTests {

  /**
   * Integration testing for csvapi-related handlers.
   */
  public class TestHandlerIntegration {

  }

  /**
   * Before all tests, a server is sparked on port 0 and a root logger is established.
   */
  @BeforeAll
  public static void setup_before_everything() {

    Spark.port(0);
    Logger.getLogger("").setLevel(Level.WARNING); // empty name = root logger
  }

  final Storage storage = new Storage();

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
    return content.toString();
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
    Spark.get("loadcsv", new LoadHandler(this.storage));
    Spark.get("viewcsv", new ViewHandler(this.storage));
    Spark.get("searchcsv", new SearchHandler(this.storage));
    Spark.get("weather", new WeatherHandler(3, TimeUnit.SECONDS, 1.0));
    Spark.init();
    Spark.awaitInitialization();
  }

  /**
   * After each test, gracefully stop the Spark server.
   */
  @AfterEach
  public void teardown() {
    Spark.unmap("/loadcsv");
    Spark.unmap("/viewcsv");
    Spark.unmap("/searchcsv");
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
   * Testing that each handler is successfully connected and responsive by the success code 200.
   *
   * @throws IOException - thrown by get ResponseCode()
   */
  @Test
  public void TestHandlerResponses() throws IOException {
    HttpURLConnection loadcsvConnection = tryRequest("loadcsv");
    assertEquals(200, loadcsvConnection.getResponseCode());

    HttpURLConnection viewcsvConnection = tryRequest("viewcsv");
    assertEquals(200, viewcsvConnection.getResponseCode());

    HttpURLConnection searchcsvConnection = tryRequest("searchcsv");
    assertEquals(200, searchcsvConnection.getResponseCode());

    HttpURLConnection weatherConnection = tryRequest("weather");
    assertEquals(200, weatherConnection.getResponseCode());
  }

  /**
   * Testing a general successful loading of a CSV File.
   *
   * @throws IOException - see first test
   */
  @Test
  public void testLoadGeneral() throws IOException {
    HttpURLConnection loadcsvConnection = tryRequest("loadcsv?filepath=data%2Fminerals.csv");
    String response = this.getQueryResult(loadcsvConnection);
    assertEquals(response, "{\"result\":\"success\",\"filepath\":\"data/minerals.csv\"}");
  }

  /**
   * Testing successful general loading of a csv file with headers.
   *
   * @throws IOException see first test
   */
  @Test
  public void testLoadGeneralHeader() throws IOException {
    HttpURLConnection loadcsvConnection = tryRequest(
        "loadcsv?filepath=data%2Fstars%2Fstardata.csv&header=true");
    String response = this.getQueryResult(loadcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"filepath\":\"data/stars/stardata.csv\",\"header\":\"true\"}");
  }

  /**
   * Testing malformed load_file with no args.
   *
   * @throws IOException see first test
   */
  @Test
  public void testLoadNoArgs() throws IOException {
    HttpURLConnection loadcsvConnection = tryRequest("loadcsv");
    String response = this.getQueryResult(loadcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Filepath not provided!\"}");
  }

  /**
   * Testing a malformed load_file with a non-real filepath.
   *
   * @throws IOException see first test
   */
  @Test
  public void testLoadMalformed() throws IOException {
    HttpURLConnection loadcsvConnection = tryRequest("loadcsv?filepath=notarealfilepath.csv");
    String response = this.getQueryResult(loadcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_datasource\",\"filepath\":\"notarealfilepath.csv\",\"message\":\"File not found\"}");
  }

  /**
   * Testing view_file successful run.
   *
   * @throws IOException see first test
   */
  @Test
  public void testViewGeneral() throws IOException {
    HttpURLConnection loadcsvConnection = tryRequest("loadcsv?filepath=data%2Fminerals.csv");
    String response1 = this.getQueryResult(loadcsvConnection);
    HttpURLConnection viewcsvConnection = tryRequest("viewcsv?filepath=data%2Fminerals.csv");
    String response = this.getQueryResult(viewcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"data\":[[\"Red Beryl\",\"Dark red\",\"7\",\"7000\"],[\"Morganite\",\"Orange\",\"7\",\"300\"],[\"Zultanite\",\"Color-Change\",\"6\",\"400\"],[\"Tsavorite\",\"Green\",\"7\",\"200\"],[\"Opal\",\"Rainbow\",\"5\",\"100\"],[\"Alexandrite\",\"Color-Change\",\"7\",\"300\"],[\"Tanzanite\",\"Purple\",\"8\",\"200\"]]}");
  }

  /**
   * Testing error message for view when no files are loaded.
   *
   * @throws IOException see first test
   */
  @Test
  public void testViewNoneLoaded() throws IOException {
    HttpURLConnection viewcsvConnection = tryRequest("viewcsv?filepath=data%2Fminerals.csv");
    String response = this.getQueryResult(viewcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"no csv loaded!\"}");
  }

  /**
   * Testing successful search with value only.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchValueOnly() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv?val=Morganite");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"data\":\"Morganite,Orange,7,300\"}");

    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fstars%2Fstardata.csv"));
    searchcsvConnection = tryRequest("searchcsv?val=Andreas");
    response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"data\":\"1,Andreas,282.43485,0.00449,5.36884\"}");
  }

  /**
   * Testing successful search with column index specified.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchColInd() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv?val=Morganite&colInd=0");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"data\":\"Morganite,Orange,7,300\"}");
    searchcsvConnection = tryRequest("searchcsv?val=7000&colInd=3");
    response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"data\":\"Red Beryl,Dark red,7,7000\"}");
  }

  /**
   * Testing successful search with column name specified.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchHeader() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fstars%2Fstardata.csv&header=True"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv?val=Andreas&colName=ProperName");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"data\":\"1,Andreas,282.43485,0.00449,5.36884\"}");
    searchcsvConnection = tryRequest("searchcsv?val=282.43485&colName=X");
    response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"success\",\"data\":\"1,Andreas,282.43485,0.00449,5.36884\"}");
  }

  /**
   * Error message for search with no file loaded.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchNoLoaded() throws IOException {
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv?val=Andreas&colName=ProperName");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"No CSV file loaded.\"}");
  }

  /**
   * Error message for search missing search term.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchNoSearchTerm() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Value to search for is missing.\"}");
    response = this.getQueryResult(tryRequest("searchcsv?colInd=2"));
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Value to search for is missing.\"}");
    response = this.getQueryResult(tryRequest("searchcsv?colName=heehee"));
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Value to search for is missing.\"}");
  }

  /**
   * Error message for search missing search term with column index.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchNoSearchTermWithColInd() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Value to search for is missing.\"}");
  }

  /**
   * Error message for search with both a column index and column name.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchIndexAndColName() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fstars%2Fstardata.csv&header=True"));
    HttpURLConnection searchcsvConnection = tryRequest(
        "searchcsv?val=Andreas&colInd=2&colName=zest");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_json\",\"message\":\"Invalid input: provide column name or column index, not both.\"}");
  }

  /**
   * Error message for search with column name given but with a file with no column headers.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchColNameGiven() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv?val=Morganite&colName=names");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Column name can only be used when file is loaded with header\"}");
  }

  /**
   * Error message for search with column index out of bounds.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchColIndOutofBounds() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv?val=Morganite&colInd=37");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Column index out of bounds\"}");
  }

  /**
   * Error message for search performed with a column index specified that is not an integer.
   *
   * @throws IOException see first test
   */
  @Test
  public void testSearchColIndNotaNumber() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    HttpURLConnection searchcsvConnection = tryRequest("searchcsv?val=Morganite&colInd=names");
    String response = this.getQueryResult(searchcsvConnection);
    assertEquals(response,
        "{\"result\":\"error_bad_request\",\"message\":\"Column index not parsable to integer\"}");
  }

  /**
   * State testing that correct CSV is loaded.
   *
   * @throws IOException see first test
   */
  @Test
  public void stateTest() throws IOException {
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fminerals.csv"));
    assertEquals("data/minerals.csv", this.storage.getFilepath());
    this.getQueryResult(tryRequest("loadcsv?filepath=data%2Fstars%2Fstardata.csv"));
    assertEquals("data/stars/stardata.csv", this.storage.getFilepath());
  }

}
