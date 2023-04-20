package queueclasses;

import java.sql.Time;
import java.util.Optional;

public class Printer{
  String name;
  String filament;
  Status status;
  Time timeStarted;
  Optional<Job> currentJob;

  public Printer(String name, String filament, Status status, Time timeStarted,
      Optional<Job> currentJob){
    this.name = name;
    this.filament = filament;
    this.status = status;
    this.timeStarted = timeStarted;
    this.currentJob = currentJob;
  }
}

enum Status {
  BUSY,
  PENDING,
  MAINTENANCE,
  RESERVED
}