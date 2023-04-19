package queueclasses;

import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

/**
 * todo
 */
public class QueHandler {
  PriorityQueue<Double> printQueue;
  Map<Printer, PrinterState> printerStates;
  QueHandler(){
    this.printQueue = new PriorityQueue<>();
    this.printerStates = new HashMap<>();
  }
}
