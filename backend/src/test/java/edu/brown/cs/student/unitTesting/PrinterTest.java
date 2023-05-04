package edu.brown.cs.student.unitTesting;

import edu.brown.cs.student.unitTesting.TestUtils.RequestStub;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import queueclasses.Printer;
import queueclasses.QHandler;
import queueclasses.Status;

public class PrinterTest {
  // todo: test time
  @Test
  public void setStateTest() {
    QHandler handler = new QHandler();
    Map<String, String> req1 = new HashMap<>(); // both filament and status changed
    Map<String, String> req2 = new HashMap<>(); // just filament
    Map<String, String> req3 = new HashMap<>(); // just status
    req1.put("command", "update");
    req1.put("printer_name", "p1");
    req1.put("filament", "purple");
    req1.put("status", "reserved");

    req2.put("command", "update");
    req2.put("printer_name", "p2");
    req2.put("filament", "purple");

    req3.put("command", "update");
    req3.put("printer_name", "p3");
    req3.put("status", "reserved");

    handler.update(new RequestStub(req1));
    handler.update(new RequestStub(req2));
    handler.update(new RequestStub(req3));

    Printer p1 = handler.printers.get("p1");
    Printer p2 = handler.printers.get("p2");
    Printer p3 = handler.printers.get("p3");

    Assertions.assertEquals(Status.RESERVED, p1.getStatus());
    Assertions.assertEquals("purple", p1.filament);

    Assertions.assertEquals(Status.AVAILABLE, p2.getStatus());
    Assertions.assertEquals("purple", p2.filament);

    Assertions.assertEquals(Status.RESERVED, p3.getStatus());
    Assertions.assertEquals("Unloaded", p3.filament);
  }

  // testing update functions

  // no name provided - test error handling
  @Test
  public void noNameTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "update");
    req.put("filament", "orange");
    String result = handler.update(new RequestStub(req));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"No printer name was provided!\"}", result);
  }

  // invalid name - non existent printer
  @Test
  public void invalidNameTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>(); // setting up requests hashmap
    req.put("command", "update");
    req.put("printer_name", "p9"); // a non-existent printer
    req.put("status", "reserved");
    String result = handler.update(new RequestStub(req));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"Printer name is invalid.\"}", result);
  }

  // error handling on invalid statuses
  @Test
  public void invalidStatusTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "update");
    req.put("printer_name", "p4");
    req.put("status", "invalid");
    String result = handler.update(new RequestStub(req));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"Status provided is invalid.\"}", result);
  }

  // error handling - no filament or status update provided
  @Test
  public void noChangesTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "update");
    req.put("printer_name", "p1");
    String result = handler.update(new RequestStub(req));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"No filament or status update was provided!\"}",
        result);
  }

  // changing only filament
  @Test
  public void filamentOnlyTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "update");
    req.put("printer_name", "p2");
    req.put("filament", "green");
    String result = handler.update(new RequestStub(req));
    Assertions.assertEquals("{\"result\":\"success\"}", result);
    Printer p2 = handler.printers.get("p2");
    Assertions.assertEquals(Status.AVAILABLE, p2.getStatus());
    Assertions.assertEquals("green", p2.filament);
  }

  @Test
  public void statusOnlyTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "update");
    req.put("printer_name", "p3");
    req.put("status", "maintenance");
    String result = handler.update(new RequestStub(req));
    Assertions.assertEquals("{\"result\":\"success\"}", result);
    Printer p3 = handler.printers.get("p3");
    Assertions.assertEquals(Status.MAINTENANCE, p3.getStatus());
    Assertions.assertEquals("Unloaded", p3.filament);
  }

  @Test
  public void rejectPrinterValidTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "enqueue");
    req.put("user", "Alice");
    req.put("contact", "alice@example.com");
    req.put(
        "duration", "PT2H30M"); // unsure of what formatting for print_time will look like just yet
    String result = handler.enqueue(new RequestStub(req));
    Map<String, String> req2 = new HashMap<>();
    req2.put("printerName", "p1");
    result = handler.rejectPrinter(new RequestStub(req2));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"printer p1 is not busy or reserved\"}",
        result);
    Printer p1 = handler.printers.get("p1");
    Assertions.assertEquals(Status.AVAILABLE, p1.getStatus());
    Assertions.assertEquals("Unloaded", p1.filament);
  }

  @Test
  public void rejectPrinterNotExistsTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "enqueue");
    req.put("user", "Alice");
    req.put("contact", "alice@example.com");
    req.put("duration", "PT2H30M");
    handler.enqueue(new RequestStub(req));

    Map<String, String> req2 = new HashMap<>();
    req2.put("printerName", "nonexistent");
    String result = handler.rejectPrinter(new RequestStub(req2));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"printer nonexistent does not exist\"}",
        result);
  }

  @Test
  public void rejectPrinterAvailableTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "enqueue");
    req.put("user", "Alice");
    req.put("contact", "alice@example.com");
    req.put("duration", "PT2H30M");
    handler.enqueue(new RequestStub(req));

    Map<String, String> req2 = new HashMap<>();
    req2.put("printerName", "p1");
    String result = handler.rejectPrinter(new RequestStub(req2));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"printer p1 is not busy or reserved\"}",
        result);
  }

  @Test
  public void rejectPrinterReservedTest() {
    QHandler handler = new QHandler();
    Map<String, String> req1 = new HashMap<>();
    req1.put("command", "enqueue");
    req1.put("user", "Alice");
    req1.put("contact", "alice@example.com");
    req1.put("duration", "PT2H30M");
    handler.enqueue(new RequestStub(req1));

    Map<String, String> req2 = new HashMap<>();
    req2.put("command", "enqueue");
    req2.put("user", "Bob");
    req2.put("contact", "bob@example.com");
    req2.put("duration", "PT2H");
    handler.enqueue(new RequestStub(req2));

    handler.printers.get("p1").setStatus("reserved");
    Map<String, String> req4 = new HashMap<>();
    req4.put("printerName", "p1");
    handler.rejectPrinter(new RequestStub(req4));
  }

  @Test
  public void claimPrinterTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "enqueue");
    req.put("user", "Alice");
    req.put("contact", "alice@example.com");
    req.put("duration", "PT2H30M");
    handler.enqueue(new RequestStub(req));
    handler.assignPrinters();
    Map<String, String> req2 = new HashMap<>();
    req2.put("printerName", "p1");
    String result = handler.claim(new RequestStub(req2));
    Assertions.assertEquals("{\"result\":\"success\",\"message\":\"printer p1 claimed\"}", result);
    Printer p1 = handler.printers.get("p1");
    Assertions.assertEquals(Status.BUSY, p1.getStatus());
  }

  @Test
  public void noPrinterProvidedTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "claim");
    String result = handler.claim(new RequestStub(req));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"No printer provided\"}", result);
  }

  @Test
  public void nonExistentPrinterTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "claim");
    req.put("printerName", "p9");
    String result = handler.claim(new RequestStub(req));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"printer p9 does not exist\"}", result);
  }

  @Test
  public void printerNotPendingTest() {
    QHandler handler = new QHandler();
    Map<String, String> req = new HashMap<>();
    req.put("command", "claim");
    req.put("printerName", "p2");
    String result = handler.claim(new RequestStub(req));
    Assertions.assertEquals(
        "{\"result\":\"error_bad_request\",\"message\":\"printer p2 does not have a job pending\"}",
        result);
  }
}
