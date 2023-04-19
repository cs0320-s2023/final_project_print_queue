package queueclasses;

/**
 * todo
 * @param name should be consistent with BDW naming
 * @param filamentColor currently loaded filament
 */
public record Printer(String name, Color filamentColor) {
}
enum Color {
  EX1,//todo: real colors
  EX2,
}