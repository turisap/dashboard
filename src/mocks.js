import { times } from "ramda";

export const fakeNotifications = (n) =>
  times(
    (id) => ({
      id,
      text: "in voluptate velit esse cillum dolore eu fugiat nulla pariatu",
    }),
    n
  );
