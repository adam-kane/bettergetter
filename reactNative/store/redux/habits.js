import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Network from "../../constants/Network";
import HabitCompletionSummary from "../../models/habitCompletionSummary";

const habitsSlice = createSlice({
  name: "habits",
  initialState: {
    habits: [],
    status: "idle",
    error: null,
  },
  reducers: {
    fetchHabits: (state, action) => {
      const habits = action.payload;
      state.habits = habits;
    },
    createNewHabit: (state, action) => {
      const { payload } = action;
      const habit = {
        id: payload.habitId,
        title: payload.title,
        completionsRequiredPerDay: payload.completionsRequiredPerDay,
        completionSummary: HabitCompletionSummary.generateNewHabitCompletions(),
      };
      state.habits.push(habit);
    },
    removeHabit: (state, action) => {
      const index = state.habits.indexOf(action.payload);
      if (index > -1) {
        state.habits.splice(index, 1);
      }
    },
    addCompletion: (state, action) => {
      state.habits
        .find((habit) => `${habit.id}` === `${action.payload.habitId}`)
        .completionSummary.find(
          (entry) => entry.date === action.payload.timeOfDay
        ).numberOfCompletions += 1;
    },
    editHabitDetails: (state, action) => {
      const index = state.habits.findIndex(
        (habit) => `${habit.id}` === `${action.payload.habitId}`
      );
      state.habits[index] = {
        ...state.habits[index],
        title: action.payload.title,
        notes: action.payload.notes,
        completionsRequiredPerDay: action.payload.completionsRequiredPerDay,
      };
    },
    errorHandler: (state, action) => {
      state.error = action.payload;
      console.log(action.payload);
    },
  },
});

export function fetchHabits() {
  return async function fetchCompletionThunk(dispatch) {
    const token = await AsyncStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `${Network.baseUrl}/user/2/habit`,
        requestOptions
      );
      dispatch({ type: "habits/fetchHabits", payload: await response.json() });
    } catch (e) {
      dispatch({ type: "habits/errorHandler", payload: e.message });
    }
  };
}

export function createHabit(habit) {
  return async function saveCompletionThunk(dispatch) {
    const token = await AsyncStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...habit,
      }),
    };
    try {
      const response = await fetch(
        `${Network.baseUrl}/user/2/habit`,
        requestOptions
      );
      const json = await response.json();
      dispatch({ type: "habits/createNewHabit", payload: json });
    } catch (e) {
      console.error(e);
    }
  };
}

export function editHabit(habitId, habitDetails) {
  return async function saveCompletionThunk(dispatch) {
    const token = await AsyncStorage.getItem("token");
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...habitDetails,
      }),
    };
    try {
      const response = await fetch(
        `${Network.baseUrl}/habit/${habitId}`,
        requestOptions
      );
      const json = await response.json();
      dispatch({ type: "habits/editHabitDetails", payload: json });
    } catch (e) {
      console.error(e);
    }
  };
}

export function addCompletionForHabit(habitId, date) {
  return async function saveCompletionThunk(dispatch, getState) {
    const token = await AsyncStorage.getItem("token");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        timeOfDay: date,
      }),
    };
    try {
      const response = await fetch(
        `${Network.baseUrl}/habit/${habitId}/habitCompletion`,
        requestOptions
      );
      const json = await response.json();
      json.habitId = habitId;
      dispatch({ type: "habits/addCompletion", payload: json });
    } catch (e) {
      console.error(e);
    }
  };
}

export const { removeHabit } = habitsSlice.actions;
export default habitsSlice.reducer;
export const selectAllUserHabits = (state) => state.habits.habits;
export const selectHabitById = (state, habitId) =>
  state.habits.find((habit) => habit.id === habitId);
export const habitsError = (state) => state.habits.error;
