import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../tests/utils/get-future-date";
import { CreateAppointment } from "./create-appointment";

describe("Create appointment", () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlaping dates", async () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);
    await createAppointment.execute({
      customer: "John Doe",
      startsAt: startsAt,
      endsAt: endsAt,
    });

    // begins after the appointment start date and ends before the appointment end date
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-11"),
        endsAt: getFutureDate("20-08-12"),
      })
    ).rejects.toThrow();

    // begins before the appointment start date and ends before the appointment end date
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-09"),
        endsAt: getFutureDate("20-08-12"),
      })
    ).rejects.toThrow();

    // begins before the appointment start date and ends after the appointment end date
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-08"),
        endsAt: getFutureDate("20-08-16"),
      })
    ).rejects.toThrow();

    // begins after the appointment start date and ends after the appointment end date
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-11"),
        endsAt: getFutureDate("2022-08-16"),
      })
    ).rejects.toThrow();
  });
});
