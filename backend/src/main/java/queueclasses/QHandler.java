package queueclasses;

import java.lang.StackWalker.Option;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.PriorityQueue;
import java.util.Optional;
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
  HashMap<String, Printer> printers;
  public QHandler(){
    this.printQ = new PriorityQueue<>();
    this.printers = new HashMap<>();
    // put real name later
    this.printers.put("p1", new Printer("p1", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
    this.printers.put("p2", new Printer("p2", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
    this.printers.put("p3", new Printer("p3", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
    this.printers.put("p4", new Printer("p4", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
    this.printers.put("p5", new Printer("p5", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
    this.printers.put("p6", new Printer("p6", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
    this.printers.put("p7", new Printer("p7", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
    this.printers.put("p8", new Printer("p8", "Unloaded", Status.PENDING, LocalTime.now(), Optional.empty()));
  }

  @Override
  public Object handle(Request request, Response response) {
    return this.handleRequest(request);
  }

  private String handleRequest(Request request) {
    String command = request.queryParams("command");
    // TODO: make sure frontend formats duration correctly

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
        return this.enqueue(request);
      case "rejectQueue":
        return this.rejectFromQueue(request);
      case "update":
        return this.update(request);
      case "forfeit":
        return this.forfeit(request);
      case "claim":
        return this.claim(request);
    }
  }

  private String enqueue(Request request) {
    String user = request.queryParams("user");
    String contact = request.queryParams("contact");
    String duration = request.queryParams("duration");
    LocalTime time = LocalTime.now();
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
  private String rejectFromQueue(Request request) {
    //todo: contact should be unique, in an enforce way
    String user = request.queryParams("user");
    String contact = request.queryParams("contact");
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
   * Updates printer status. Makes changes to printer object's instance variables.
   * Does not remove users from printer - use forfeit.
   * @param user
   * @param contact
   * @return
   */
  private String update(Request request) {
    String name = request.queryParams("printer_name");
    String filament = request.queryParams("filament");
    String status = request.queryParams("status");
    Map<String, Object> map = new HashMap<>();




  }
  private String forfeit(Request request) {}
  private String claim(Request request) {}

}
