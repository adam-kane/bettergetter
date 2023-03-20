import React, { createContext, useMemo, useState, useEffect } from "react";
import Network from "../../constants/Network";
import HabitCompletionSummary from "../../models/habitCompletionSummary";

export const HabitsContext = createContext({
  habits: [],
  addHabit: (habit) => {},
  editHabit: (habitId, newValue) => {},
  addHabitCompletion: (completion) => {},
});

function HabitsContextProvider({ children }) {
  const [habits, setHabits] = useState([]);

  function addHabits(habitsList) {
    setHabits(habitsList);
  }

  function addHabit(habit) {
    setHabits((currentHabits) => [...currentHabits, habit]);
  }

  function editHabit(habitId, newValue) {
    const items = [...habits];
    const index = items.findIndex((entry) => entry.id === `${habitId}`);
    const item = items[index];
    item.title = newValue.title;
    item.notes = newValue.notes;
    item.completionsRequiredPerDay = newValue.completionsRequiredPerDay;
    items[index] = item;
    setHabits(items);
  }

  function addHabitCompletion() {}

  const value = useMemo(
    () => ({
      habits,
      addHabit,
      editHabit,
      addHabitCompletion,
    }),
    [habits]
  );

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
}

export default HabitsContextProvider;
