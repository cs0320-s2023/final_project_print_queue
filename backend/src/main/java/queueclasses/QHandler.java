package queueclasses;

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

/**
 * todo
 */
public class QHandler {
  PriorityQueue<Job> printQ;
  Map<Printer, PrinterState> printerStates;
  QHandler(){
    this.printQ = new PriorityQueue<>();
    this.printerStates = new HashMap<>();
  }

}
