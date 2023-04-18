package edu.brown.cs.student.parser;

import java.util.List;

/** Class represents a mineral store. Has info on types of minerals, hardness, color, and price. */
public class MineralStore implements CreatorFromRow<Mineral> {

  public MineralStore() {}

  /**
   * Example of "creator" function that will turn CSV rows to Mineral objects.
   *
   * @param row - list of strings from Parser
   * @return - returns the mineral object created
   * @throws FactoryFailureException - thrown on failed creation
   */
  @Override
  public Mineral create(List<String> row) throws FactoryFailureException {
    if (row.size() != 4) { // not enough data
      throw new FactoryFailureException("Failed to make entry", row);
    }

    String name = row.get(0);
    String color = row.get(1);
    int hardness, price;
    try {
      hardness = Integer.parseInt(row.get(2));
      price = Integer.parseInt(row.get(3));
    } catch (NullPointerException | NumberFormatException e) {
      throw new FactoryFailureException("Failed to make entry", row);
    }
    return new Mineral(name, color, hardness, price);
  }
}
