import { configureStore } from "@reduxjs/toolkit";
import habitsReducer from "./habits";
import authReducer from "./auth";

export const store = configureStore({
  reducer: { habits: habitsReducer, auth: authReducer },
});
