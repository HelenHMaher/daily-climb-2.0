import { configureStore } from "@reduxjs/toolkit";
import { usernameReducer } from "./reducers";

export const store = configureStore({
  reducer: usernameReducer,
});

console.log(store.getState());
