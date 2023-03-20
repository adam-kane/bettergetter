package com.coe.bettergetter.habitcompletion.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class CreateHabitCompletionDto(
    @JsonProperty(value = "timeOfDay")
    var timeOfDay: LocalDate?)
{
}