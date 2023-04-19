package server.csvapi;
// being kept as a template for future handlers.

// import edu.brown.cs.student.parser.CSVEndException;
// import edu.brown.cs.student.parser.CSVToList;
// import edu.brown.cs.student.parser.FactoryFailureException;
// import edu.brown.cs.student.parser.Parser;
// import java.io.FileNotFoundException;
// import java.io.FileReader;
// import java.io.IOException;
// import java.util.ArrayList;
// import java.util.HashMap;
// import java.util.List;
// import java.util.Map;
// import server.APIUtilities;
// import spark.Request;
// import spark.Response;
// import spark.Route;
//
/// **
// * Load handler class handles API requests for load_file.
// */
// public class LoadHandler implements Route {
//
//  //private final Storage storage;
//
//  /**
//   * Constructor for the load handler.
//   *
//   * @param storage - class that stores loaded csv information
//   */
//  public LoadHandler(Storage storage) {
//    this.storage = storage;
//  }
//
//  /**
//   * Handles the request sent from server.
//   *
//   * @param request  - contains user parameters for loading file
//   * @param response - not used, originally from handle() function signature
//   * @return JSON string for output
//   */
//  @Override
//  public Object handle(Request request, Response response) {
//    return this.loadCsv(request);
//  }
//
//  /**
//   * Loads CSV file from API request.
//   *
//   * @param request - contains user parameters for loading file
//   * @return JSON string for output
//   */
//  private String loadCsv(Request request) {
//    String filepath = request.queryParams("filepath");
//    String header = request.queryParams("header");
//    Map<String, Object> map = new HashMap<>();
//    map.put("filepath", filepath);
//    map.put("header", header);
//
//    if (filepath == null) { // error handling
//      map.put("result", "error_bad_request");
//      map.put("message", "Filepath not provided!");
//      return APIUtilities.toJson(map); // serialize to JSON for output
//    }
//
//    boolean hasHeader = false; // check if headers indicated in request
//    if (header != null) {
//      hasHeader = request.queryParams("header").equalsIgnoreCase("true");
//    }
//
//    List<List<String>> csvList = new ArrayList<>();
//
//    try { // prepare a 2D Arraylist to represent the CSV with CSV parser
//      Parser<ArrayList<List<String>>> parser = new Parser<>(new FileReader(filepath),
//          new CSVToList(), hasHeader);
//      while (true) { // CSVEndException will always be caught, look at CSVParser
//        csvList = parser.rowCreate();
//      }
//    } catch (CSVEndException e) { // Expected exception, look at CSVParser
//      this.storage.loadCSV(csvList, filepath, hasHeader);
//      map.put("result", "success");
//    } catch (FactoryFailureException | FileNotFoundException e) {
//      map.put("result", "error_datasource");
//      map.put("message", "File not found");
//    } catch (IOException e) {
//      map.put("result", "error_bad_request");
//      map.put("message", "Failure in processing file.");
//    }
////    return APIUtilities.toJson(map); // serialize to JSON for output
//  }
//
//
// }
