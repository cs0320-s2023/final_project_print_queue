package edu.brown.cs.student.searcher;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

/** Unit Tests for the search utility. Testing for User 1 primarily. */
public class testSearch {

  /** General Test using stardata. Testing for CSV data with headers */
  @Test
  public void testSearcher() {
    assertEquals(
        "75,Dempsey,397.9963,1.55016,-481.89369",
        SearchFunction.searchCSV("data/stars/stardata.csv", "ProperName", "Dempsey", true));
  }

  /** Testing for CSV data with no headers. Made my own data: minerals.csv in Data folder */
  @Test
  public void testNoHeader() {
    assertEquals(
        "Morganite,Orange,7,300",
        SearchFunction.searchCSV("data/minerals.csv", "0", "Orange", false));
  }

  /**
   * Testing search function with a value not anywhere in CSV. Confirms it returns empty string.
   * Note: it does still print an informative "No Match Found" for the end-user.
   */
  @Test
  public void testNotInCSV() {
    assertEquals("", SearchFunction.searchCSV("data/minerals.csv", "0", "NotinCSV", false));
  }

  /**
   * Testing searching for a column header. Expected to return empty string since headers are
   * ignored.
   */
  @Test
  public void testValueInHeader() {
    assertEquals("", SearchFunction.searchCSV("data/stars/stardata.csv", "StarID", "StarID", true));
  }
}
