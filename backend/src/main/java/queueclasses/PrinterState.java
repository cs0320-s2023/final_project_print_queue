package queueclasses;

import java.util.Optional;

/**
 * todo
 * @param status status of the printer
 * @param timeStarted time the printer started it's current state
 * @param job the job being printed (if applicable)
 */
public record PrinterState(Status status, Double timeStarted, Optional<Job> job) {
}
enum Status {
  BUSY,
  PENDING,
  MAINTENANCE,
  RESERVED
}