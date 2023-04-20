package queueclasses;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.PriorityQueue;
import server.APIUtilities;
import spark.Request;
import spark.Response;
import spark.Route;
import java.time.Duration;

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
    String duration = request.queryParams("duration");
    // TODO: make sure frontend formats duration correctly
    LocalTime currTime = LocalTime.now();

    Map<String, Object> map = new HashMap<>();
    // error handling
    if (command == null) {
      map.put("result", "error_bad_request");
      map.put("message", "No command provided.");
      return APIUtilities.toJson(map); // serialize to JSON for output
    }
  // TODO: reject from printer method later
    switch (command) {
      case "enqueue":
        return this.enqueue(user,contact, duration, currTime);
      case "rejectQueue":
        return this.rejectFromQueue(user,contact);
      case "update":
        return this.update(user,contact);
      case "forfeit":
        return this.forfeit(user,contact);
      case "claim":
        return this.claim(user,contact);
    }
  }

  private String enqueue(String user, String contact, String duration, LocalTime time) {
    Duration printDuration = Duration.parse(duration);
    this.printQ.add(new Job(user, contact, printDuration, time));
    Map<String, Object> map = new HashMap<>();
    map.put("user", user);
    map.put("contact", contact);
    map.put("duration", duration);
    map.put("time", time);
    map.put("result", "success");
    return APIUtilities.toJson(map); // serialize to JSON for output
  }

  /**
   * Kicks user from queue if not already assigned to printer.
   * @param user
   * @param contact
   * @return
   */
  private String rejectFromQueue(String user, String contact) {
    //todo: contact should be unique, in an enforce way
    Map<String, Object> map = new HashMap<>();
    // error handling - user/contact not provided
    if (user == null || contact == null) {
      map.put("result", "error_bad_request");
      map.put("message", "No user and/or contact provided");
      return APIUtilities.toJson(map); // serialize to JSON for output
    }
    map.put("user", user);
    map.put("contact", contact);
    if (this.printQ.removeIf(job -> contact.equals(job.contact()))) {
      // true when elements are removed
      map.put("result", "success");
      return APIUtilities.toJson(map); // serialize to JSON for output
    }
    map.put("result", "failure");
    map.put("message", "No contact in queue matched!");
    return APIUtilities.toJson(map); // serialize to JSON for output
  }

  /**
   * Updates printer status. Makes changes to printer object's instance variables
   * @param user
   * @param contact
   * @return
   */
  private String update(String user, String contact) {




  }
  private String forfeit(String user, String contact) {}
  private String claim(String user, String contact) {}

}
