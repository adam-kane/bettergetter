package com.coe.bettergetter.reminder.service

import com.coe.bettergetter.habit.repo.HabitRepository
import com.coe.bettergetter.reminder.dto.CreateReminderDto
import com.coe.bettergetter.reminder.dto.ReminderDto
import com.coe.bettergetter.reminder.entity.Reminder
import com.coe.bettergetter.reminder.mapper.ReminderMapper
import com.coe.bettergetter.reminder.repo.ReminderRepository
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException

@Service
class ReminderService constructor(
    private val habitRepository: HabitRepository,
    private val reminderRepository: ReminderRepository,
    private val mapper: ReminderMapper
) {

    fun getReminderById(id: Int): ReminderDto {
        return mapper.reminderEntityToReminderDto(findReminderById(id))
    }

    fun getRemindersByHabitId(habitId: Int): List<ReminderDto> {
        return reminderRepository.findRemindersByHabitId(habitId).map { item -> mapper.reminderEntityToReminderDto(item) }
    }

    fun createReminder(habitId: Int, createReminderDto: CreateReminderDto): ReminderDto {
        val reminder = mapper.createReminderDtoToReminderEntity(createReminderDto)
        val habit = habitRepository.findById(habitId)
        if (habit.isPresent) {
            habit.get().apply {
                reminder.habit = this
                reminderRepository.save(reminder)
            }
        }
        return mapper.reminderEntityToReminderDto(reminder)
    }

    fun deleteReminder(reminderId: Int) {
        val reminder = findReminderById(reminderId)
        reminder.id?.let { reminderRepository.deleteById(it) }
    }

    fun updateReminder(reminderId: Int, createReminderDto: CreateReminderDto): ReminderDto {
        val reminder = reminderRepository.findById(reminderId)
        val update = mapper.createReminderDtoToReminderEntity(createReminderDto)
        if (reminder.isPresent) {
            reminder.get().apply {
                this.timeOfDay = update.timeOfDay
                reminderRepository.save(this)
                return mapper.reminderEntityToReminderDto(this)
            }
        }
        return mapper.reminderEntityToReminderDto(update)
    }

    private fun findReminderById(id: Int): Reminder {
        return reminderRepository.findById(id).orElseThrow { EntityNotFoundException("Reminder not found") }
    }
}