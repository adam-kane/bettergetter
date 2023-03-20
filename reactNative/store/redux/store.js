import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habits";

export const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});
