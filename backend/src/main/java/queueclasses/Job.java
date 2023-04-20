package queueclasses;

import java.time.LocalTime;
import java.time.Duration;

/**
 *
 * @param user given by the user through the enqueue menu
 * @param contact given by the user through the enqueue menu
 * @param printTime given by the user through the enqueue menu. Should be derived
 *                  from the Prusa Slicer estimate, but not checked
 * @param timeQueued recorded automatically
 */
public record Job(String user, String contact, Duration printTime, LocalTime timeQueued) {}
