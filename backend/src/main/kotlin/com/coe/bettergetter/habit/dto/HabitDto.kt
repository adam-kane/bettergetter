package com.coe.bettergetter.habit.dto

import com.coe.bettergetter.habitcompletion.entity.HabitCompletion

data class HabitDto(
    var id: Int?,
    var title: String?,
    var notes: String?,
    var completionsRequiredPerDay: Int?,
    var habitCompletions: List<HabitCompletion> = emptyList()
)
