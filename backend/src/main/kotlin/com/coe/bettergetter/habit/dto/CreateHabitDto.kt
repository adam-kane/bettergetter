package com.coe.bettergetter.habit.dto

data class CreateHabitDto(
    var title: String?,
    var notes: String?,
    var completionsRequiredPerDay: Int?,
) {

}