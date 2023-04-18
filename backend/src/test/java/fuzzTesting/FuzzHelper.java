package fuzzTesting;

import edu.brown.cs.student.parser.CSVEndException;
import edu.brown.cs.student.parser.CSVToList;
import edu.brown.cs.student.parser.FactoryFailureException;
import edu.brown.cs.student.parser.Parser;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class FuzzHelper {


  public double randomCoordSearch(Double min, Double max) {
    Random random = new Random();
    return min + (max - min) * random.nextDouble();
  }

  public String randomStarSearch(Storage storage) throws IOException, FactoryFailureException {
    Parser<ArrayList<List<String>>> p = new Parser<>(new FileReader("data/stars/stardata.csv"), new CSVToList(), true);
    List<List<String>> csvArray = new ArrayList<>();
    while (true) {
      try {
        csvArray = p.rowCreate();
      } catch (CSVEndException e) {
        storage.loadCSV(csvArray, "data/stars/stardata.csv", true);
        break;
      }
    }

    String colName;
    String colInd;
    String value;
    Random random = new Random();
    int randomNumber = random.nextInt(5) + 1;
    int randomCol = random.nextInt(5);
    int randomValueCol = random.nextInt(5);
    int randomValueRow = random.nextInt(119618) + 1;

    String ret = "";
    switch(randomNumber) {
      case 1:
        colName = csvArray.get(0).get(randomCol);
        value = csvArray.get(randomValueRow).get(randomValueCol);
        ret = "searchcsv?val=" + value + "&colName=" + colName;
        break;
      case 2:
        colName = csvArray.get(0).get(randomCol);
        value = csvArray.get(randomValueRow).get(randomCol);
        ret = "searchcsv?val=" + value + "&colName=" + colName;
        break;
      case 3:
        colInd = Integer.toString(randomCol);
        value = csvArray.get(randomValueRow).get(randomValueCol);
        ret = "searchcsv?val=" + value + "&colInd=" + colInd;
        break;
      case 4:
        colInd = Integer.toString(randomCol);
        value = csvArray.get(randomValueRow).get(randomCol);
        ret = "searchcsv?val=" + value + "&colInd=" + colInd;
      case 5:
        value = csvArray.get(randomValueRow).get(randomCol);
        ret = "searchcsv?val=" + value;
    }
    return ret;
  }
}


