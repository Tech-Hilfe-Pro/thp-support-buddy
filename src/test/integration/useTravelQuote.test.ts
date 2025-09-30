import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTravelQuote } from "@/hooks/useTravelQuote";
import { waitForCondition } from "../helpers";

// Mock de fetch
global.fetch = vi.fn();

describe("useTravelQuote - Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("debe inicializar con estado vacío", () => {
    const { result } = renderHook(() =>
      useTravelQuote({
        plz: "",
        hours: 1,
      })
    );

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("debe validar PLZ inválida", () => {
    const { result } = renderHook(() =>
      useTravelQuote({
        plz: "123", // inválida
        hours: 1,
      })
    );

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("PLZ muss 5 Ziffern sein");
  });

  it("debe hacer debounce de 300ms antes de llamar API", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          originBase: "Köln 50823",
          distance_km: 10,
          duration_min: 15,
          km_total: 20,
          min_total: 30,
          travel_fee: 15.5,
          breakdown: {
            fuel_cost: 2.5,
            wear_cost: 3.6,
            time_cost: 20,
            margen: 2.9,
          },
          currency: "EUR",
        }),
      } as Response)
    );
    global.fetch = mockFetch;

    const { result } = renderHook(() =>
      useTravelQuote({
        plz: "51063",
        hours: 1,
      })
    );

    // Inmediatamente después, no debe haber llamado API
    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(true);

    // Avanzar 200ms (antes del debounce)
    vi.advanceTimersByTime(200);
    expect(mockFetch).not.toHaveBeenCalled();

    // Avanzar otros 100ms (total 300ms)
    vi.advanceTimersByTime(100);

    await waitForCondition(() => mockFetch.mock.calls.length > 0);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("debe cachear resultados por clave", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          originBase: "Köln 50823",
          distance_km: 10,
          duration_min: 15,
          km_total: 20,
          min_total: 30,
          travel_fee: 15.5,
          breakdown: {
            fuel_cost: 2.5,
            wear_cost: 3.6,
            time_cost: 20,
            margen: 2.9,
          },
          currency: "EUR",
        }),
      } as Response)
    );
    global.fetch = mockFetch;

    // Primera llamada
    const { result: result1, unmount: unmount1 } = renderHook(() =>
      useTravelQuote({
        plz: "51063",
        hours: 1,
      })
    );

    vi.advanceTimersByTime(300);
    await waitForCondition(() => result1.current.data !== null);
    unmount1();

    // Segunda llamada con mismos parámetros (dentro de 2 min)
    mockFetch.mockClear();

    const { result: result2 } = renderHook(() =>
      useTravelQuote({
        plz: "51063",
        hours: 1,
      })
    );

    vi.advanceTimersByTime(300);

    // Debe usar cache, no llamar API
    await waitForCondition(() => result2.current.data !== null);
    expect(result2.current.data).not.toBeNull();
    expect(mockFetch).not.toHaveBeenCalled(); // Cache hit
  });

  it("debe generar summary correctamente", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          originBase: "Köln 50823",
          distance_km: 10,
          duration_min: 15,
          km_total: 20,
          min_total: 30,
          travel_fee: 15.5,
          breakdown: {
            fuel_cost: 2.5,
            wear_cost: 3.6,
            time_cost: 20,
            margen: 2.9,
          },
          currency: "EUR",
        }),
      } as Response)
    );
    global.fetch = mockFetch;

    const { result } = renderHook(() =>
      useTravelQuote({
        plz: "51063",
        hours: 1,
      })
    );

    vi.advanceTimersByTime(300);

    await waitForCondition(() => result.current.data !== null);

    expect(result.current.data?.summary).toContain("Basis: Köln 50823");
    expect(result.current.data?.summary).toContain("Distanz: 20 km");
    expect(result.current.data?.summary).toContain("Zeit: 30 min");
    expect(result.current.data?.summary).toContain("Anfahrt: 15.5 €");
  });

  it("debe manejar errores de API", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: async () => ({ error: "Internal Server Error" }),
      } as Response)
    );
    global.fetch = mockFetch;

    const { result } = renderHook(() =>
      useTravelQuote({
        plz: "51063",
        hours: 1,
      })
    );

    vi.advanceTimersByTime(300);

    await waitForCondition(() => result.current.error !== null);

    expect(result.current.error).toContain("Internal Server Error");
    expect(result.current.data).toBeNull();
  });

  it("debe cancelar petición anterior con AbortController", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          originBase: "Köln 50823",
          distance_km: 10,
          duration_min: 15,
          km_total: 20,
          min_total: 30,
          travel_fee: 15.5,
          breakdown: {
            fuel_cost: 2.5,
            wear_cost: 3.6,
            time_cost: 20,
            margen: 2.9,
          },
          currency: "EUR",
        }),
      } as Response)
    );
    global.fetch = mockFetch;

    const { rerender } = renderHook(
      ({ plz }) =>
        useTravelQuote({
          plz,
          hours: 1,
        }),
      { initialProps: { plz: "51063" } }
    );

    vi.advanceTimersByTime(150);

    // Cambiar PLZ antes de que termine el debounce
    rerender({ plz: "50823" });

    vi.advanceTimersByTime(300);

    await waitForCondition(() => mockFetch.mock.calls.length > 0);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it("debe proporcionar función refetch", async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({
          originBase: "Köln 50823",
          distance_km: 10,
          duration_min: 15,
          km_total: 20,
          min_total: 30,
          travel_fee: 15.5,
          breakdown: {
            fuel_cost: 2.5,
            wear_cost: 3.6,
            time_cost: 20,
            margen: 2.9,
          },
          currency: "EUR",
        }),
      } as Response)
    );
    global.fetch = mockFetch;

    const { result } = renderHook(() =>
      useTravelQuote({
        plz: "51063",
        hours: 1,
      })
    );

    vi.advanceTimersByTime(300);

    await waitForCondition(() => result.current.data !== null);

    mockFetch.mockClear();

    // Llamar refetch
    result.current.refetch();

    await waitForCondition(() => mockFetch.mock.calls.length > 0, 2000);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
