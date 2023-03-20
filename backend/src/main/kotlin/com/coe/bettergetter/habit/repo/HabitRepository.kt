package com.coe.bettergetter.habit.repo;

import com.coe.bettergetter.habit.entity.Habit
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import java.time.LocalDate

interface HabitRepository : JpaRepository<Habit, Int> {
    @Query("SELECT h FROM Habit h WHERE h.user.id=:userId")
    fun findHabitsByUserId(userId: Int): List<Habit>
}