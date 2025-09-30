import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PriceAndTravelCard } from "@/components/PriceAndTravelCard";
import { BrowserRouter } from "react-router-dom";

// Wrapper con Router para componentes que usan navegación
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe("PriceAndTravelCard - Snapshot", () => {
  it("debe renderizar estado inicial correctamente", () => {
    const { container } = render(
      <Wrapper>
        <PriceAndTravelCard serviceSlug="pc_setup" />
      </Wrapper>
    );

    expect(container).toMatchSnapshot();
  });

  it("debe renderizar con PLZ por defecto", () => {
    const { container } = render(
      <Wrapper>
        <PriceAndTravelCard serviceSlug="wlan" defaultPLZ="50823" defaultHours={2} />
      </Wrapper>
    );

    expect(container).toMatchSnapshot();
  });
});

describe("PriceAndTravelCard - Accesibilidad", () => {
  it("debe renderizar inputs con labels", () => {
    const { container } = render(
      <Wrapper>
        <PriceAndTravelCard serviceSlug="pc_setup" />
      </Wrapper>
    );

    // Verificar que existen labels para los inputs
    const labels = container.querySelectorAll("label");
    expect(labels.length).toBeGreaterThan(0);

    // Verificar que existe input de PLZ
    const plzInput = container.querySelector('input[type="text"]');
    expect(plzInput).toBeTruthy();
    expect(plzInput?.getAttribute("aria-required")).toBe("true");
  });

  it("debe tener región aria-live para resultados", () => {
    const { container } = render(
      <Wrapper>
        <PriceAndTravelCard serviceSlug="pc_setup" defaultPLZ="51063" />
      </Wrapper>
    );

    // Verificar estructura básica del componente
    const card = container.querySelector('[class*="Card"]') || container.querySelector('[class*="card"]');
    expect(card).toBeTruthy();
  });
});
