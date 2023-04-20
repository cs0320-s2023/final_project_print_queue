package queueclasses;

import java.time.LocalTime;
import java.util.Optional;

public class Printer{
  private String name;
  private String filament;
  private Status status;
  private LocalTime timeStarted;
  private Optional<Job> currentJob;

  public Printer(String name, String filament, Status status, LocalTime timeStarted,
      Optional<Job> currentJob){
    this.name = name;
    this.filament = filament;
    this.status = status;
    this.timeStarted = timeStarted;
    this.currentJob = currentJob;
  }

  public void setFilament(String filament) {
    this.filament = filament;
  }
  public void setStatus(String status) {
    switch (status) {
      case "available" -> this.status = Status.AVAILABLE;
      case "busy" -> this.status = Status.BUSY;
      case "pending" -> this.status = Status.PENDING;
      case "maintenance" -> this.status = Status.MAINTENANCE;
      case "reserved" -> this.status = Status.RESERVED;
    }
  }
  public void setCurrentJob(Optional<Job> currentJob) {
    this.currentJob = currentJob;
  }
  public void setTimeStarted(LocalTime time){
    this.timeStarted = time;
  }
  public Status getStatus() {
    return this.status;
  }

}

enum Status {
  AVAILABLE,
  BUSY,
  PENDING,
  MAINTENANCE,
  RESERVED,
  AVAILABLE
}