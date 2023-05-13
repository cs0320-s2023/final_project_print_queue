import printers from "./Mocks/PrinterMocks";
import PrintersPage from "./pages/PrintersPage/PrintersPage";
import { Printer, Status } from "./utils/types";
import "@testing-library/jest-dom";
import { render, screen, waitFor, within } from "@testing-library/react";
import PrinterCard from "./components/PrinterCard";

//added in two tests to make sure that the name and filament are being added properly

test("all printers have a name property", () => {
  expect.assertions(printers.length);
  printers.forEach((printer: Printer) => {
    expect(printer.name).toBeDefined();
  });
});

test("all printers have a filament property", () => {
  expect.assertions(printers.length);
  printers.forEach((printer: Printer) => {
    expect(printer.filament).toBeDefined();
  });
});
