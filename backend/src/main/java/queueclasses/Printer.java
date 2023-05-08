package queueclasses;

import java.time.Duration;
import java.time.LocalTime;
import org.jetbrains.annotations.Nullable;

public class Printer {
  private String name;
  public String filament;
  private Status status;
  private String timeStarted;
  private @Nullable Job currentJob;

  /**
   * @param name The name of the printer. Should match the names used by the bdw
   * @param filament description of the currently loaded status
   * @param status the state of the printer. options described more fully in hte Status enum
   * @param timeStarted when the printer last changed state
   */
  public Printer(String name, String filament, Status status, String timeStarted) {
    this.name = name;
    this.filament = filament;
    this.status = status;
    this.timeStarted = timeStarted;
    this.currentJob = null;
  }

  /**
   * setter for the filament parameter
   *
   * @param filament the new filament description
   */
  public void setFilament(String filament) {
    this.filament = filament;
  }

  /**
   * setter for the status parameter
   *
   * @param status the string form of the new status
   */
  public boolean setStatus(String status) {
    boolean ret = true;
    switch (status) {
      case "available" -> this.status = Status.AVAILABLE;
      case "busy" -> this.status = Status.BUSY;
      case "pending" -> this.status = Status.PENDING;
      case "maintenance" -> this.status = Status.MAINTENANCE;
      case "reserved" -> this.status = Status.RESERVED;
      default -> ret = false;
    }
    return ret; // false if status was invalid
  }
  /**
   * setter for the currentJob parameter
   *
   * @param currentJob the new Optional<job>
   */
  public void setCurrentJob(Job currentJob) {
    this.currentJob = currentJob;
  }

  /**
   * getter for currentJob
   * @return the current job
   */
  public Job getCurrentJob() {
    return this.currentJob;
  }
  /**
   * setter for the timeStarted parameter
   *
   * @param time the new time
   */
  public void setTimeStarted(String time) {
    this.timeStarted = time;
  }

  /**
   *
   * @return the time started as a localTime object
   */
  public LocalTime getTimeStarted(){
    return LocalTime.parse(this.timeStarted);
  }

  /**
   * getter for the status parameter
   *
   * @return the current status
   */
  public Status getStatus() {
    return this.status;
  }
}
