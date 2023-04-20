package server;

import static spark.Spark.after;

import queueclasses.QHandler;
import spark.Spark;

/**
 * Server class that begins the API. Running main() will begin the server on localhost with port
 * 3232.
 */
public class Server {

  /**
   * Main method that starts the server.
   *
   * @param args - terminal arguments, not used here
   */
  public static void main(String[] args) {
    Spark.port(3232);
    after(
        (request, response) -> {
          response.header("Access-Control-Allow-Origin", "*");
          response.header("Access-Control-Allow-Methods", "*");
        });
    Spark.get("qHandle", new QHandler());
    Spark.init();
    Spark.awaitInitialization();
    System.out.println("Server started.");
  }
}
