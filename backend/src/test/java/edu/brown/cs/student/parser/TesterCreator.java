package edu.brown.cs.student.parser;

import java.util.List;

/**
 * Very simple implementation of a CreatorFromRow class that turns rows into integers. Meant to help
 * with debugging and testing.
 */
public class TesterCreator implements CreatorFromRow<Integer> {

  /** No parameters needed. Simple constructor. */
  public TesterCreator() {}

  /**
   * Simple create() function that just returns the length of the row added to the length of a row's
   * first element.
   *
   * @param row - list of strings for first CSV row
   * @return - returns Integer of sum of length of row and length of first element.
   */
  @Override
  public Integer create(List<String> row) {
    return row.size() + row.get(0).length();
  }
}
