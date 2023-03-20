package com.coe.bettergetter.habitcompletion.viewmodel

import com.fasterxml.jackson.annotation.JsonProperty

data class HabitCompletionViewModel(
    @JsonProperty(value = "completionId")
    var id: Int,
    @JsonProperty(value = "timeOfDay")
    var timeOfDay: String?,
) {
}