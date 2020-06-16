import { createReducer, createAction } from "typesafe-actions";
import produce from "immer";

import { actionPrefixer } from "utils/";
import { REDUCERS, DocumentStatus } from "types/";

import { fakeNotifications } from "../../mocks";

const DUCK_PREFIX = "system";

const prs = actionPrefixer(DUCK_PREFIX);

const docVisibilityChanged = createAction(prs("docVisibilityChanged"))<
  DocumentStatus
>();

const DEFAULT: REDUCERS.SystemState = {
  documentStatus: "visible",
  messages: fakeNotifications(5),
};

const systemReducer = createReducer<REDUCERS.SystemState>(DEFAULT).handleAction(
  docVisibilityChanged,
  (state: REDUCERS.SystemState, { payload }) =>
    produce(state, (draftState) => {
      draftState.documentStatus = payload;
    })
);

export default systemReducer;

export { docVisibilityChanged };
