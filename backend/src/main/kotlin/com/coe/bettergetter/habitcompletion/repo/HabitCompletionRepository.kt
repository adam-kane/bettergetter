package com.coe.bettergetter.habitcompletion.repo

import com.coe.bettergetter.habitcompletion.entity.HabitCompletion
import org.springframework.data.jpa.repository.JpaRepository

interface HabitCompletionRepository : JpaRepository<HabitCompletion, Int> {
    fun findHabitCompletionsByHabitId(habitId: Int): List<HabitCompletion>
}