package server;

import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Types;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.file.Path;
import java.util.Map;
import okio.Buffer;

/**
 * Utilities class that has a static toJson method that every handler in server uses.
 */
public class APIUtilities {

  /**
   * Private constructor to ensure that the class is not instantiated.
   */
  private APIUtilities() {
  }

  public static <T> T requestToObject(String url, Class<T> outClass) throws IOException {
    T ret;
    HttpURLConnection clientConnection = tryRequest(url);
    try {
      if (clientConnection.getResponseCode() == 200) {
        ret = fromJSON(new Buffer().readFrom(clientConnection.getInputStream()), outClass);
      } else {
        throw new IOException(clientConnection.getResponseMessage());
      }
    } catch (IOException e) {
      throw new IOException(e.getMessage());
    }

    clientConnection.disconnect();
    return ret;
  }

  /**
   * Function to make GET requests using a given url. Used in requestToObject
   * to get response to be converted into Object
   * @param url - url of request
   * @return url connection
   * @throws IOException thrown by openConnection, setRequestMethod, and connect
   */
  public static HttpURLConnection tryRequest(String url) throws IOException{
    URL requestURL = new URL(url);
    HttpURLConnection clientConnection = (HttpURLConnection) requestURL.openConnection();
    clientConnection.setRequestMethod("GET");
    clientConnection.connect();
    return clientConnection;
  }

  /**
   * toJson method to serialize maps to be displayed on the API.
   *
   * @param map - map to serialize
   * @return String containing the serialized Json.
   */
  public static String toJson(Map<String, Object> map) {
    Moshi moshi = new Moshi.Builder().build();
    JsonAdapter<Map<String, Object>> jsonAdapter = moshi.adapter(Types.newParameterizedType(Map.class, String.class, Object.class));
    return jsonAdapter.toJson(map);
  }

  /**
   * Takes a buffer and converts it into JSON
   * @param input - Buffer object to be converted
   * @param outClass
   * @param <T>
   * @return
   * @throws IOException
   */
  public static <T> T fromJSON(Buffer input, Class<T> outClass) throws IOException {
    return new Moshi.Builder().build().adapter(outClass).fromJson(input);
  }

}
