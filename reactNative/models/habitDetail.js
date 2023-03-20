class HabitDetail {
  constructor(
    habitId,
    title,
    notes,
    completionsRequiredPerDay,
    habitCompletions
  ) {
    this.habitId = habitId;
    this.title = title;
    this.notes = notes;
    this.completionsRequiredPerDay = completionsRequiredPerDay;
    this.habitCompletions = habitCompletions;
  }
}

export default HabitDetail;
