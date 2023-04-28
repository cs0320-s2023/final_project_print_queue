package edu.brown.cs.student.unitTesting;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.Set;
import spark.Request;
import spark.Spark;

public class TestUtils {
  public static HttpURLConnection tryRequest(String apiCall) throws IOException {
    URL requestURL = new URL("http://localhost:" + Spark.port() + "/" + apiCall);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.connect();
    return clientConnection;
  }
  public static class RequestStub extends Request {
    //based on stackoverflow.com/questions/47357123/
    // how-to-create-a-request-and-response-objects-in-java-spark-microservice-framewor
    private Map<String, String> paramMap;
    RequestStub(Map<String, String> paramMap){
      this.paramMap = paramMap;
    }
    @Override
    public String queryParams(String key){
      return paramMap.get(key);
    }
  }
}
