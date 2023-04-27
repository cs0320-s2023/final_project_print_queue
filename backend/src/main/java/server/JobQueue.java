package server;

import java.util.LinkedList;
import java.util.Queue;
import queueclasses.Job;

public class JobQueue {
  private final Queue<Job> queue = new LinkedList<>();

  public Queue<Job> getQueue() {
    return this.queue;
  }
  public void enqueue(Job job) {
    this.queue.offer(job);
  }

  public Job dequeue() {
    return this.queue.poll();
  }

  public int size() {
    return this.queue.size();
  }
}
