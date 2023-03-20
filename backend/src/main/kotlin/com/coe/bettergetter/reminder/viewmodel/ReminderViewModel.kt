package com.coe.bettergetter.reminder.viewmodel

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class ReminderViewModel(
    @JsonProperty(value = "reminderId")
    var id: Int,
    @JsonProperty(value = "timeOfDay")
    var timeOfDay: LocalDate?
) {
}