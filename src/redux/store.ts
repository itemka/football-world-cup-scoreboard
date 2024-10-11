import { configureStore } from "@reduxjs/toolkit";
import scoreBoardReducer from "./scoreBoard/scoreBoardSlice.ts";

export const store = configureStore({
  reducer: {
    scoreBoard: scoreBoardReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;