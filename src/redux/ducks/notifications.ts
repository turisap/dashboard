import { createAction } from "typesafe-actions";

import { actionPrefixer } from "utils/";
import { Notification } from "types/";

const DUCK_PREFIX = "notifications";

const prs = actionPrefixer(DUCK_PREFIX);

const enqueueNotification = createAction(prs("enqueueNotification"))<
  Notification
>();

// TODO use RxJS here

export { enqueueNotification };
