package com.coe.bettergetter.reminder.dto

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class CreateReminderDto(
    @JsonProperty(value = "timeOfDay")
    var timeOfDay: LocalDate?)
{
}