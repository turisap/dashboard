import faker from "faker";
import { times } from "ramda";

export const fakeNotifications = (n: number) =>
  times(
    (id: number) => ({
      id,
      text: faker.lorem.sentence(),
    }),
    n
  );
