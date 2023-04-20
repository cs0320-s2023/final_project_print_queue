package queueclasses;

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

/**
 * todo
 */
public class QueueHandler {
  PriorityQueue<Job> printQueue;
  Map<Printer, PrinterState> printerStates;
  QueueHandler(){
    this.printQueue = new PriorityQueue<>();
    this.printerStates = new HashMap<>();
  }

}
