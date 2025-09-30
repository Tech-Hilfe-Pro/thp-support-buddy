/**
 * Helper para esperar a que una condición se cumpla en tests
 */
export async function waitForCondition(
  condition: () => boolean,
  timeout = 3000,
  interval = 50
): Promise<void> {
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error("Timeout waiting for condition");
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}
