package queueclasses;

/**
 * possible statuses: AVAILABLE: the printer is not in use, and can have a new job assigned to it.
 * if the printer is in this state, currentJob should be empty
 *
 * <p>BUSY: the printer is currently working on a job. currentJob should NOT be empty
 *
 * <p>PENDING: the printer has a job assigned to it, but that job has not been started yet. if the
 * printer goes a while without the job being started, the printer should be forfeited and set to
 * available. in this state, currentJob should NOT be empty
 *
 * <p>MAINTENANCE: the printer is down for maintenance
 *
 * <p>RESERVED: bdw monitors have removed the printer from circulation for some reason
 */
public enum Status {
  AVAILABLE,
  BUSY,
  PENDING,
  MAINTENANCE,
  RESERVED
}
