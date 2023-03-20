package com.coe.bettergetter.habit.dto

import java.time.LocalDate


data class HabitOverviewDto (
    var id: String = "",
    var title: String = "",
    var notes: String = "",
    var completionsRequiredPerDay: Int = 1,
    var completionSummary: List<CompletionEntryDto>,
)

data class CompletionEntryDto (
    var date: LocalDate,
    var numberOfCompletions: Int
)