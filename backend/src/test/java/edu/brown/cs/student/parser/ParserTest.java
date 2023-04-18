package edu.brown.cs.student.parser;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.StringReader;
import org.junit.jupiter.api.Test;

public class ParserTest {

  /**
   * Testing with StringReader and a very simple CreatorFromRow class that just adds the length of
   * the row with the length of the first string. Tests using StringReader and returning Integer
   *
   * @throws CSVEndException
   * @throws IOException
   * @throws FactoryFailureException
   */
  @Test
  public void testWithStringReader() throws CSVEndException, IOException, FactoryFailureException {
    StringReader reader = new StringReader("rock, grass, electric\nnormal, ground");
    Parser p = new Parser(reader, new TesterCreator(), false);
    assertEquals(7, p.rowCreate());
    assertEquals(8, p.rowCreate());
  }

  /**
   * Testing using FileReader and using returning a user-defined object, "Mineral" with a user
   * defined CreatorFromRow "MineralStore." Shows that object returned by the create() method
   * matches with expected first entry of the csv file.
   */
  @Test
  public void testWithFileReader() throws IOException, CSVEndException, FactoryFailureException {
    FileReader fileReader = new FileReader("data/minerals.csv");
    MineralStore ms = new MineralStore();
    Parser p = new Parser(fileReader, ms, false);

    Mineral bixbite = new Mineral("Red Beryl", "Dark red", 7, 7000);
    Mineral testMin = (Mineral) p.rowCreate();
    assertEquals(bixbite.color, testMin.color);
    assertEquals(bixbite.name, testMin.name);
    assertEquals(bixbite.hardness, testMin.hardness);
    assertEquals(bixbite.price, testMin.price);
  }

  /**
   * Testing that CSVEndException is thrown when at end of file for user to catch and decide what to
   * do with. Done with ten-star.csv showing some functionality with CSVs with headers.
   */
  @Test
  public void testCSVException() throws IOException, CSVEndException, FactoryFailureException {
    FileReader reader = new FileReader("data/stars/ten-star.csv");
    TesterCreator creator = new TesterCreator();
    Parser p = new Parser(reader, creator, true);
    for (int i = 0; i < 10; i++) {
      p.rowCreate();
    }
    assertThrows(CSVEndException.class, p::rowCreate);
    assertThrows(CSVEndException.class, p::rowCreate);
  }

  /**
   * Tests that the FactoryFailureException is thrown when the creator is unable to make an object
   * from the Parser.
   *
   * @throws FileNotFoundException
   */
  @Test
  public void testFactoryException() throws FileNotFoundException {
    FileReader reader = new FileReader("data/stars/ten-star.csv");
    MineralStore creator = new MineralStore();
    Parser p = new Parser(reader, creator, true);
    assertThrows(FactoryFailureException.class, p::rowCreate);
  }
}
