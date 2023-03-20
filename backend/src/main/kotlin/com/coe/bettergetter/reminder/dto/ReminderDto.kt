package com.coe.bettergetter.reminder.dto

import com.coe.bettergetter.habit.entity.Habit
import java.time.LocalDate

data class ReminderDto(
    var id: Int?,
    var timeOfDay: LocalDate?,
    var habit: Habit?)
{
}