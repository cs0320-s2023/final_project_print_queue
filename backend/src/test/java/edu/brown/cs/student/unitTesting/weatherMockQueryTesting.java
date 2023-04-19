package edu.brown.cs.student.unitTesting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.google.common.util.concurrent.UncheckedExecutionException;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.Test;
import server.weatherapi.WeatherCache;
import server.weatherapi.WeatherQuery;
import server.weatherapi.WeatherUtilities.WeatherCoordinates;
import server.weatherapi.WeatherUtilities.WeatherRecord;

/**
 * Mock queries are used here to do unit testing on how queries are read, how states are handled in
 * the program, and more.
 */
public class weatherMockQueryTesting {

  /** General weather query usage */
  @Test
  public void testWeatherQuery() {
    // Repeated use of query object
    WeatherQuery query = new WeatherQuery();

    // One period forecast
    WeatherRecord record = query.queryWeather(new WeatherCoordinates(37., 73., 0.), true);
    assertEquals(record.temperature(), 51);
    assertEquals(record.temperatureUnit(), "F");
  }

  /** Test exceptions thrown when null coordinates are input. */
  @Test
  public void testNullCoordinates() {
    WeatherQuery query = new WeatherQuery();

    // Both lat and lon missing
    assertThrows(
        IllegalArgumentException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(null, null, 0.), true);
        });

    // Lat missing
    assertThrows(
        IllegalArgumentException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(0., null, 0.), true);
        });

    // Lon missing
    assertThrows(
        IllegalArgumentException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(null, 0., 0.), true);
        });
  }

  /** Test illegal states from empty, null, or unparsable calls with cache. */
  @Test
  public void testIllegalStatesCache() {
    WeatherQuery queryObj = new WeatherQuery();
    WeatherCache query = new WeatherCache(1, TimeUnit.SECONDS, queryObj);

    assertThrows(
        UncheckedExecutionException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(0., 0., 0.));
        });
    assertThrows(
        UncheckedExecutionException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(80., 80., 0.));
        });

    assertThrows(
        UncheckedExecutionException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(5., 5., 0.));
        });
  }

  /** Test illegal state throws without cache. */
  @Test
  public void testIllegalStates() {
    WeatherQuery query = new WeatherQuery();

    // Null point
    assertThrows(
        IllegalStateException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(0., 0., 0.), true);
        });

    // Empty forecast
    assertThrows(
        IllegalStateException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(46., -70., 0.), true);
        });

    // Null forecast
    assertThrows(
        IllegalStateException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(80., 80., 0.), true);
        });

    // Unparsable forecast
    assertThrows(
        IllegalStateException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(5., 5., 0.), true);
        });
  }

  /** Test exception thrown from null coordinates with cache. */
  @Test
  public void testNullCoordinatesCache() {
    WeatherQuery queryObj = new WeatherQuery();
    WeatherCache query = new WeatherCache(1, TimeUnit.SECONDS, queryObj);

    // Both lat and lon missing
    assertThrows(
        UncheckedExecutionException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(null, null, 0.));
        });

    // Lat missing
    assertThrows(
        UncheckedExecutionException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(0., null, 0.));
        });

    // Lon missing
    assertThrows(
        UncheckedExecutionException.class,
        () -> {
          query.queryWeather(new WeatherCoordinates(null, 0., 0.));
        });
  }
}
