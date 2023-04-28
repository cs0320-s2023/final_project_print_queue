package queueclasses;

import static queueclasses.Status.AVAILABLE;
import static queueclasses.Status.PENDING;

import java.time.LocalTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import server.APIUtilities;
import server.JobQueue;
import spark.Request;
import spark.Response;
import spark.Route;
import java.time.Duration;

public class QHandler implements Route {
  public JobQueue printQ;
  HashMap<String, Printer> printers;
  public QHandler(){
    this.printQ = new JobQueue();
    this.printers = new HashMap<>();
    // put real name later
    this.printers.put("p1", new Printer("p1", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
    this.printers.put("p2", new Printer("p2", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
    this.printers.put("p3", new Printer("p3", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
    this.printers.put("p4", new Printer("p4", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
    this.printers.put("p5", new Printer("p5", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
    this.printers.put("p6", new Printer("p6", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
    this.printers.put("p7", new Printer("p7", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
    this.printers.put("p8", new Printer("p8", "Unloaded", Status.AVAILABLE, LocalTime.now(), Optional.empty()));
  }
  /**
   * Used for testing
   * @return a QHandler with all printers reserved
   */
  static public QHandler fullyReserved(){
    QHandler toReturn = new QHandler();
    toReturn.printers.values().stream().forEach(printer -> printer.setStatus("reserved"));
    return toReturn;
  }

  /**
   * passes an api request along to the handleRequest function
   * @param request
   * @param response
   * @return the serialized result to return to the client
   */
  @Override
  public Object handle(Request request, Response response) {
    return this.handleRequest(request);
  }

  /**
   * Identifies the command being invoked, and passes it along to the appropriate handler
   * @param request
   * @return the serialized result to return to the client
   */
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
    String ret = switch (command) {
      case "enqueue" -> this.enqueue(request);
      case "rejectQueue" -> this.rejectFromQueue(request);
      case "update" -> this.update(request);
      case "rejectPrinter" -> this.rejectPrinter(request);
      case "claim" -> this.claim(request);
      case "getState" -> this.getState(request);
      default -> {
        map.put("result", "error_bad_request");
        map.put("message", "No command provided.");
        yield APIUtilities.toJson(map);
      }
    };
    this.assignPrinters();
    return ret;
  }

  /**
   *
   * @param request the original API request object. not used here
   * @return the serialization of printQ and printers
   */
  private String getState(Request request){
    Map toSerialize = new HashMap();
    toSerialize.put("printQ", printQ);
    toSerialize.put("printers", printers);
    toSerialize.put("result", "success");
    return APIUtilities.toJson(toSerialize); // serialize to JSON for output
  }

  /**
   *  Adds a job to the queue
   * @param request should contain user, contact, and duration parameters
   * @return A success or failure message
   */
  public String enqueue(Request request) {
    String user = request.queryParams("user");
    String contact = request.queryParams("contact");
    String duration = request.queryParams("duration");
    LocalTime time = LocalTime.now();
    Duration printDuration = Duration.parse(duration);
    this.printQ.enqueue(new Job(user, contact, printDuration, time));
    Map<String, Object> map = new HashMap<>();
    map.put("user", user);
    map.put("contact", contact);
    map.put("duration", duration);
    map.put("result", "success");
    return APIUtilities.toJson(map); // serialize to JSON for output
  }

  /**
   * Kicks user from queue if not already assigned to printer.
   * @param request The original API request object. Should hold a user and contact param
   * @return success or failure message
   */
  public String rejectFromQueue(Request request) {
    //todo: contact should be unique, in an enforced way
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
    if (this.printQ.getQueue().removeIf(job -> contact.equals(job.contact()))) {
      // true when elements are removed
      map.put("result", "success");
      return APIUtilities.toJson(map); // serialize to JSON for output
    }
    map.put("result", "failure");
    map.put("message", "No contact in queue matched!");
    return APIUtilities.toJson(map); // serialize to JSON for output
  }

  /**
   *  Updates printer status. Makes changes to printer object's instance variables.
   *  Does not remove users from printer - use forfeit.
   * @param request should contain printer_name, filament, and status params
   * @return a success or failure message
   */
  public String update(Request request) {
    String name = request.queryParams("printer_name");
    String filament = request.queryParams("filament");
    String status = request.queryParams("status");
    Map<String, Object> map = new HashMap<>();

    // error handling - no name
    if (name == null) {
      map.put("result", "error_bad_request");
      map.put("message", "No printer name was provided!");
      return APIUtilities.toJson(map); // serialize to JSON for output
    }
    // nothing was specified
    if (filament == null && status == null) {
      map.put("result", "error_bad_request");
      map.put("message", "No filament or status update was provided!");
      return APIUtilities.toJson(map); // serialize to JSON for output
    }
    Printer printerToUpdate = this.printers.get(name);
    if (printerToUpdate == null) {
      map.put("result", "error_bad_request");
      map.put("message", "Printer name is invalid.");
      return APIUtilities.toJson(map); // serialize to JSON for output
    }
    // now, assuming we have a valid printer, filament and/or status to update

    //updates the start time
    printerToUpdate.setTimeStarted(LocalTime.now());
    if (filament != null) {
      printerToUpdate.setFilament(filament);
    }
    if (status != null) {
      printerToUpdate.setStatus(status);
    }
    map.put("result", "success");
    return APIUtilities.toJson(map); // serialize to JSON for output
  }

  /**
   * removes any current job from the specified printer, and makes the printer available
   * @param request Should hold a printerName param
   * @return a success or failure message
   */
  private String rejectPrinter(Request request) {
    String printerName = request.queryParams("printerName");
    Map<String, Object> message = new HashMap<>();
    // error handling - user/contact not provided
    if (printerName == null) {
      message.put("result", "error_bad_request");
      message.put("message", "No printer provided");
      return APIUtilities.toJson(message); // serialize to JSON for output
    }
    Printer printer = printers.get(printerName);
    if (printer == null){
      message.put("result", "error_bad_request");
      message.put("message", "printer " + printerName + " does not exist");
      return APIUtilities.toJson(message); // serialize to JSON for output
    }
    switch (printer.getStatus()) {
      case BUSY:
      case PENDING:
        printer.setStatus("available");
        printer.setTimeStarted(LocalTime.now());
        message.put("result", "success");
        message.put("message", "printer " + printerName + " is now available");
        break;
      case MAINTENANCE:
      case RESERVED:
      case AVAILABLE:
        message.put("result", "error_bad_request");
        message.put("message", "printer " + printerName + " is not busy or reserved");
        break;
    }
    return APIUtilities.toJson(message); // serialize to JSON for output
  }

  /**
   * Changes a printer with a pending job to busy status
   * @param request should contain a printerName parameter
   * @return a success or failure message
   */
  private String claim(Request request) {
    String printerName = request.queryParams("printerName");
    Map<String, Object> message = new HashMap<>();
    // error handling - user/contact not provided
    if (printerName == null) {
      message.put("result", "error_bad_request");
      message.put("message", "No printer provided");
      return APIUtilities.toJson(message); // serialize to JSON for output
    }
    Printer printer = this.printers.get(printerName);
    if (printer == null){
      message.put("result", "error_bad_request");
      message.put("message", "printer " + printerName + " does not exist");
      return APIUtilities.toJson(message); // serialize to JSON for output
    }
    if (printer.getStatus() == PENDING){
      printer.setStatus("busy");
      printer.setTimeStarted(LocalTime.now());
      message.put("result", "success");
      message.put("message", "printer " + printerName + " claimed");
      return APIUtilities.toJson(message); // serialize to JSON for output
    }else {
      message.put("result", "error_bad_request");
      message.put("message", "printer " + printerName + " does not have a job pending");
    }
    return APIUtilities.toJson(message); // serialize to JSON for output
  }

  private void assignPrinters() {
    for (Printer printer : this.printers.values()) {
      if (printer.getStatus() == AVAILABLE && !(this.printQ.getQueue().isEmpty())) {
        printer.setCurrentJob(this.printQ.dequeue());
        printer.setStatus("busy");
        printer.setTimeStarted(LocalTime.now());
      }
    }
  }
}
