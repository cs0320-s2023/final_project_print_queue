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
  //todo: test time
  @Test
  public void setStateTest(){
    QHandler handler = new QHandler();
    Map<String, String> req1 = new HashMap<>(); //both filament and status changed
    Map<String, String> req2 = new HashMap<>(); //just filament
    Map<String, String> req3 = new HashMap<>(); //just status
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
}
