import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { loadPLZMap, getFromDataset, clearCache, getDatasetStats } from "../../../functions/lib/plzDataset";

describe("PLZ Dataset Loader", () => {
  beforeEach(() => {
    clearCache();
  });

  afterEach(() => {
    clearCache();
  });

  describe("loadPLZMap", () => {
    it("debe cargar el dataset correctamente", async () => {
      const map = await loadPLZMap();

      expect(map).toBeInstanceOf(Map);
      expect(map.size).toBeGreaterThan(0);
    });

    it("debe usar singleton en llamadas posteriores", async () => {
      const map1 = await loadPLZMap();
      const map2 = await loadPLZMap();

      // Deben ser la misma instancia (singleton)
      expect(map1).toBe(map2);
    });

    it("debe cargar PLZ conocidas", async () => {
      const map = await loadPLZMap();

      expect(map.has("50823")).toBe(true); // Köln
      expect(map.has("50259")).toBe(true); // Pulheim
      expect(map.has("41460")).toBe(true); // Neuss
    });

    it("debe contener coordenadas válidas", async () => {
      const map = await loadPLZMap();
      const koeln = map.get("50823");

      expect(koeln).toBeDefined();
      expect(koeln?.lat).toBeCloseTo(50.949, 2);
      expect(koeln?.lon).toBeCloseTo(6.92, 2);
    });
  });

  describe("getFromDataset", () => {
    it("debe devolver coordenadas para PLZ existente", async () => {
      const result = await getFromDataset("50823");

      expect(result).not.toBeNull();
      expect(result?.source).toBe("dataset");
      expect(result?.lat).toBeCloseTo(50.949, 2);
      expect(result?.lon).toBeCloseTo(6.92, 2);
    });

    it("debe devolver null para PLZ inexistente", async () => {
      const result = await getFromDataset("99999");

      expect(result).toBeNull();
    });

    it("debe validar formato de PLZ (5 dígitos)", async () => {
      const invalid1 = await getFromDataset("123");
      const invalid2 = await getFromDataset("12345678");
      const invalid3 = await getFromDataset("abcde");

      expect(invalid1).toBeNull();
      expect(invalid2).toBeNull();
      expect(invalid3).toBeNull();
    });

    it("debe manejar lookup O(1) rápido", async () => {
      // Pre-cargar
      await loadPLZMap();

      const start = Date.now();
      
      // 100 lookups
      for (let i = 0; i < 100; i++) {
        await getFromDataset("50823");
      }

      const elapsed = Date.now() - start;

      // Debe ser muy rápido (< 10ms para 100 lookups)
      expect(elapsed).toBeLessThan(10);
    });

    it("debe funcionar para todas las bases conocidas", async () => {
      const koeln = await getFromDataset("50823");
      const pulheim = await getFromDataset("50259");
      const neuss = await getFromDataset("41460");

      expect(koeln).not.toBeNull();
      expect(pulheim).not.toBeNull();
      expect(neuss).not.toBeNull();

      expect(koeln?.source).toBe("dataset");
      expect(pulheim?.source).toBe("dataset");
      expect(neuss?.source).toBe("dataset");
    });
  });

  describe("clearCache", () => {
    it("debe limpiar el cache correctamente", async () => {
      // Cargar dataset
      await loadPLZMap();

      // Limpiar cache
      clearCache();

      // Verificar que se recarga
      const map = await loadPLZMap();
      expect(map).toBeInstanceOf(Map);
    });
  });

  describe("getDatasetStats", () => {
    it("debe devolver estadísticas correctas", async () => {
      const statsBeforeLoad = await getDatasetStats();

      expect(statsBeforeLoad.total).toBeGreaterThan(0);

      // Después de la primera carga, debe estar cached
      const statsAfterLoad = await getDatasetStats();

      expect(statsAfterLoad.cached).toBe(true);
      expect(statsAfterLoad.total).toBe(statsBeforeLoad.total);
    });
  });

  describe("Validación de datos", () => {
    it("debe contener solo PLZ válidas (5 dígitos)", async () => {
      const map = await loadPLZMap();

      for (const plz of map.keys()) {
        expect(plz).toMatch(/^\d{5}$/);
      }
    });

    it("debe contener coordenadas en rango válido para Alemania", async () => {
      const map = await loadPLZMap();

      for (const coords of map.values()) {
        // Alemania: lat ~47-55, lon ~6-15
        expect(coords.lat).toBeGreaterThan(47);
        expect(coords.lat).toBeLessThan(56);
        expect(coords.lon).toBeGreaterThan(5);
        expect(coords.lon).toBeLessThan(16);
      }
    });
  });

  describe("Performance", () => {
    it("debe cargar el dataset rápido (< 100ms)", async () => {
      clearCache();

      const start = Date.now();
      await loadPLZMap();
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(100);
    });

    it("debe usar cache en llamadas subsecuentes (< 1ms)", async () => {
      // Primera carga
      await loadPLZMap();

      // Segunda carga (cacheada)
      const start = Date.now();
      await loadPLZMap();
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(1);
    });
  });
});
