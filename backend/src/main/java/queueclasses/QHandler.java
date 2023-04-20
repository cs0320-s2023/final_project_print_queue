package queueclasses;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;
import spark.Request;
import spark.Response;
import spark.Route;

/**
 * todo
 */
public class QHandler implements Route {
  PriorityQueue<Job> printQ;
  List<Printer> printers;
  public QHandler(){
    this.printQ = new PriorityQueue<>();
    this.printers = new ArrayList<>();
  }

  @Override
  public Object handle(Request request, Response response) {
    return this.handleRequest(request);
  }

  private String handleRequest(Request request) {
    String command = request.queryParams("command");
    String user = request.queryParams("user");
    String contact = request.queryParams("contact");

    switch (command) {
      case "enqueue":
        return this.enqueue(user,contact);
      case "reject":
        return this.reject(user,contact);
      case "update":
        return this.update(user,contact);
      case "forfeit":
        return this.forfeit(user,contact);
      case "claim":
        return this.claim(user,contact);
    }
  }

  private String enqueue(String user, String contact) {}
  private String reject(String user, String contact) {}
  private String update(String user, String contact) {}
  private String forfeit(String user, String contact) {}
  private String claim(String user, String contact) {}

}
