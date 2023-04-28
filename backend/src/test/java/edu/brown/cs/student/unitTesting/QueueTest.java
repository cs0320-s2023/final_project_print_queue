package edu.brown.cs.student.unitTesting;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import queueclasses.QHandler;
import spark.Request;

public class QueueTest {
  //TODO for milo: test setState, enqueue, and rejectFromQueue (the methods, not using api calls)
  @Test
  public void enqueueTest(){
    QHandler handler = QHandler.fullyReserved();
    handler.enqueue(new Request());
  }
}
