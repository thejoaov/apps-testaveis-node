import { test, expect } from "vitest";
import { getFutureDate } from "../tests/utils/get-future-date";
import { Appointment } from "./appointment";

test("create an appointment", () => {
  const startsAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-11");

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt: new Date(startsAt),
    endsAt: new Date(endsAt),
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.customer).toBe("John Doe");
});

test("cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-09");

  expect(() => {
    new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

// cannot create an appointment with an start date before now
test("cannot create an appointment with an start date before now", () => {
  const startsAt = new Date(Date.now() - 1);
  const endsAt = new Date(startsAt.getTime() + 1);

  expect(() => {
    new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
