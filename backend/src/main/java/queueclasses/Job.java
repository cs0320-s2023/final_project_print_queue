package queueclasses;

/**
 *
 * @param user given by the user through the enqueue menu
 * @param contact given by the user through the enqueue menu
 * @param printTime given by the user through the enqueue menu. Should be derived
 *                  from the Prusa Slicer estimate, but not checked
 * @param timeQueued recorded automaticaly
 */
public record Job(String user, String contact, double printTime, double timeQueued) {}
