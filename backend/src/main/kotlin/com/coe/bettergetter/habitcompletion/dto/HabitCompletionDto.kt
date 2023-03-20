package com.coe.bettergetter.habitcompletion.dto

import com.coe.bettergetter.habit.entity.Habit
import java.time.LocalDate


data class HabitCompletionDto(
    var id: Int?,
    var timeOfDay: LocalDate?,
    var habit: Habit?)
{

}