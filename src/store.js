import { configureStore, getDefaultMiddleward } from "@reduxjs/toolkit";
import { mainReducer } from "./reducers";

export const store = configureStore({
  reducer: mainReducer,
  middleware: getDefaultMiddleward(),
});
