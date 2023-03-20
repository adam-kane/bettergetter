package com.coe.bettergetter.reminder.repo;

import com.coe.bettergetter.reminder.entity.Reminder
import org.springframework.data.jpa.repository.JpaRepository

interface ReminderRepository : JpaRepository<Reminder, Int> {
    fun findRemindersByHabitId(habitId: Int): List<Reminder>
}