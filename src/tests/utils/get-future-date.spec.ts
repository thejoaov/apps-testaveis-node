import { it, expect } from "vitest";
import { getFutureDate } from "./get-future-date";

// it should increases date with 1 year
it("should increases date with 1 year", () => {
  const year = new Date().getFullYear();
  expect(getFutureDate(`${year}-08-10`).getFullYear()).toBe(
    new Date().getFullYear() + 1
  );
});
