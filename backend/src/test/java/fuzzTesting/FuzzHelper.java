package fuzzTesting;

import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class FuzzHelper {

  /** generates and makes a random API call, asserting that the result is not a 500 error */
  private static List<String> possilbeCommands =
      List.of("enqueue", "rejectQueue", "update", "rejectPrinter", "claim", "getState");

  private static List<String> possibleParams =
      List.of(
          "user",
          "contact",
          "duration",
          "imgUrl",
          "printer_name",
          "filament",
          "status",
          "printerName");
  private static int maxArgLength = 20;

  /**
   * adapted from
   * https://stackoverflow.com/questions/7191325/get-a-random-subset-from-a-result-set-in-java
   *
   * @param vals the list to get a random sublist from
   * @param size the size of the desired result
   * @return a subslist of set
   */
  public List<String> randomSublist(List<String> vals, int size) {
    Collections.shuffle(vals);
    return vals.subList(0, size);
  }

  /**
   * adapted from https://www.baeldung.com/java-random-string
   *
   * @return a random alphanumeric string
   */
  public String randomString() {
    int leftLimit = 48; // numeral '0'
    int rightLimit = 122; // letter 'z'
    Random random = new Random();
    int targetStringLength = ThreadLocalRandom.current().nextInt(0, possibleParams.size());

    return random
        .ints(leftLimit, rightLimit + 1)
        .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
        .limit(targetStringLength)
        .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
        .toString();
  }

  public String makeRandomAPICall() {
    String command = randomSublist(possilbeCommands, 1).get(0);
    List<String> params =
        randomSublist(
            possibleParams, ThreadLocalRandom.current().nextInt(0, possibleParams.size()));
    String toReturn = "qHandle?command=" + command;
    for (String param : params) {
      toReturn += "&" + param + "=" + randomString();
    }
    return toReturn;
  }
}
