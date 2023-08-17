import {appActions, AppInitialStateType, appSlice} from "./app.slice";

let startState: AppInitialStateType;

beforeEach(() => {
  startState = { error: null, status: "idle", isInitialized: false };
});

test("correct error message should be set", () => {
  const endState = appSlice(
    startState,
    appActions.setAppError({ error: "some error" })
  );
  expect(endState.error).toBe("some error");
});
