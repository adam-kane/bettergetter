class HabitCompletionSummary {
  constructor(id, title, notes, completionsRequiredPerDay, completionSummary) {
    this.id = id;
    this.title = title;
    this.notes = notes;
    this.completionsRequiredPerDay = completionsRequiredPerDay;
    this.completionSummary = completionSummary;
  }

  static generateNewHabitCompletions() {
    const curr = new Date();
    const week = [];

    for (let i = 1; i <= 7; i += 1) {
      const first = curr.getDate() - curr.getDay() + i;
      const day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
      week.push({ date: day, numberOfCompletions: 0 });
    }
    return week;
  }
}

export default HabitCompletionSummary;
