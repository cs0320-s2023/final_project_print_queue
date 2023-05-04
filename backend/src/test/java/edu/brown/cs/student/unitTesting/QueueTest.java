package edu.brown.cs.student.unitTesting;

import edu.brown.cs.student.unitTesting.TestUtils.RequestStub;
import java.util.HashMap;
import java.util.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import queueclasses.Job;
import queueclasses.QHandler;

public class QueueTest {

  @Test
  public void enqueueTest() {
    QHandler handler = QHandler.fullyReserved();
    Map<String, String> req1 = new HashMap<>();
    Map<String, String> req2 = new HashMap<>();
    Map<String, String> req3 = new HashMap<>();
    req1.put("command", "enqueue");
    req1.put("user", "u1");
    req1.put("contact", "u1@brown.edu");
    req1.put("duration", "PT30M");

    req2.put("command", "enqueue");
    req2.put("user", "u2");
    req2.put("contact", "u2@brown.edu");
    req2.put("duration", "PT30M");

    req3.put("command", "enqueue");
    req3.put("user", "u3");
    req3.put("contact", "u3@brown.edu");
    req3.put("duration", "PT30M");
    handler.enqueue(new RequestStub(req1));
    handler.enqueue(new RequestStub(req2));
    handler.enqueue(new RequestStub(req3));
    Job first = handler.printQ.dequeue();
    Job second = handler.printQ.dequeue();
    Job third = handler.printQ.dequeue();
    Assertions.assertEquals("u1", first.user());
    Assertions.assertEquals("u1@brown.edu", first.contact());
    Assertions.assertEquals("PT30M", first.printTime());

    Assertions.assertEquals("u2", second.user());
    Assertions.assertEquals("u2@brown.edu", second.contact());
    Assertions.assertEquals("PT30M", second.printTime());

    Assertions.assertEquals("u3", third.user());
    Assertions.assertEquals("u3@brown.edu", third.contact());
    Assertions.assertEquals("PT30M", third.printTime());

    // todo: test time
  }

  @Test
  public void dequeueTest() {
    QHandler handler = QHandler.fullyReserved();
    Map<String, String> req1 = new HashMap<>();
    Map<String, String> req2 = new HashMap<>();
    Map<String, String> req3 = new HashMap<>();
    Map<String, String> req4 = new HashMap<>();

    req1.put("command", "enqueue");
    req1.put("user", "u1");
    req1.put("contact", "u1@brown.edu");
    req1.put("duration", "PT30M");

    req2.put("command", "enqueue");
    req2.put("user", "u2");
    req2.put("contact", "u2@brown.edu");
    req2.put("duration", "PT30M");

    req3.put("command", "enqueue");
    req3.put("user", "u3");
    req3.put("contact", "u3@brown.edu");
    req3.put("duration", "PT30M");

    req4.put("command", "rejectFromQueue");
    req4.put("user", "u2");
    req4.put("contact", "u2@brown.edu");

    handler.enqueue(new RequestStub(req1));
    handler.enqueue(new RequestStub(req2));
    handler.enqueue(new RequestStub(req3));
    handler.rejectFromQueue(new RequestStub(req4));

    Job first = handler.printQ.dequeue();
    Job second = handler.printQ.dequeue();

    Assertions.assertEquals("u1", first.user());
    Assertions.assertEquals("u1@brown.edu", first.contact());
    Assertions.assertEquals("PT30M", first.printTime());

    Assertions.assertEquals("u3", second.user());
    Assertions.assertEquals("u3@brown.edu", second.contact());
    Assertions.assertEquals("PT30M", second.printTime());
  }
}
