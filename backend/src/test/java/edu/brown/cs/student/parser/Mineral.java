package edu.brown.cs.student.parser;

/** Class used to test Parser. Represents a Mineral's data found in a CSV. */
public class Mineral {

  // made public to for easy access in tests
  public String name;
  public String color;
  public int hardness;
  public int price;

  /**
   * Constructor for a mineral object
   *
   * @param name - name of mineral
   * @param color - color of mineral
   * @param hardness - hardness of mineral
   * @param price - price of mineral
   */
  public Mineral(String name, String color, int hardness, int price) {
    this.name = name;
    this.color = color;
    this.hardness = hardness;
    this.price = price;
  }
}
