package com.coe.bettergetter.habit.viewmodel

import com.coe.bettergetter.habit.dto.HabitOverviewDto
import com.fasterxml.jackson.annotation.JsonProperty

data class HabitViewModel(
    @JsonProperty(value = "habitDetailOverview")
    var habitDetailOverview: HabitOverviewDto?
) {
}