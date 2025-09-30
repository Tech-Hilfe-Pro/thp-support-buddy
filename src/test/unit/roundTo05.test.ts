import { describe, it, expect } from "vitest";
import { roundTo05 } from "../../../functions/lib/travelConfig";

describe("roundTo05", () => {
  it("debe redondear hacia arriba al siguiente 0.5", () => {
    expect(roundTo05(12.3)).toBe(12.5);
    expect(roundTo05(12.26)).toBe(12.5);
  });

  it("debe redondear hacia abajo al 0.5 más cercano", () => {
    expect(roundTo05(12.2)).toBe(12.0);
    expect(roundTo05(12.24)).toBe(12.0);
  });

  it("debe redondear hacia arriba al siguiente entero", () => {
    expect(roundTo05(12.7)).toBe(13.0);
    expect(roundTo05(12.76)).toBe(13.0);
  });

  it("debe mantener valores ya redondeados", () => {
    expect(roundTo05(12.0)).toBe(12.0);
    expect(roundTo05(12.5)).toBe(12.5);
    expect(roundTo05(13.0)).toBe(13.0);
  });

  it("debe manejar valores pequeños correctamente", () => {
    expect(roundTo05(0.3)).toBe(0.5);
    expect(roundTo05(0.2)).toBe(0.0);
    expect(roundTo05(0.25)).toBe(0.5);
  });

  it("debe manejar valores negativos (edge case)", () => {
    expect(roundTo05(-12.3)).toBe(-12.5);
    expect(roundTo05(-12.7)).toBe(-13.0);
  });
});
