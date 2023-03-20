package com.coe.bettergetter.reminder.controller

import com.coe.bettergetter.reminder.dto.CreateReminderDto
import com.coe.bettergetter.reminder.mapper.ReminderMapper
import com.coe.bettergetter.reminder.service.ReminderService
import com.coe.bettergetter.reminder.viewmodel.ReminderViewModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class ReminderController constructor(private val reminderMapper: ReminderMapper, private val reminderService: ReminderService) {

    @GetMapping("/habit/{habitId}/reminder")
    fun getHabitRemindersByHabitId(@PathVariable habitId: Int): ResponseEntity<List<ReminderViewModel>> {
        val reminders = reminderService.getRemindersByHabitId(habitId)
        return ResponseEntity(reminders.map { item -> reminderMapper.reminderDtoToReminderViewModel(item) }, HttpStatus.OK)
    }

    @GetMapping("/reminder/{reminderId}")
    fun habitReminderById(@PathVariable reminderId: Int): ResponseEntity<ReminderViewModel> {
        val reminder = reminderMapper.reminderDtoToReminderViewModel(reminderService.getReminderById(reminderId))
        return ResponseEntity(reminder, HttpStatus.OK)
    }

    @PostMapping("/habit/{habitId}/reminder")
    fun createHabitReminder(@PathVariable habitId: Int, @RequestBody createReminderDto: CreateReminderDto): ResponseEntity<ReminderViewModel> {
        val reminder = reminderMapper.reminderDtoToReminderViewModel(reminderService.createReminder(habitId, createReminderDto))
        return ResponseEntity(reminder, HttpStatus.CREATED)
    }

    @PutMapping("/reminder/{reminderId}")
    fun updateHabitReminder(@PathVariable reminderId: Int, @RequestBody createReminderDto: CreateReminderDto): ResponseEntity<ReminderViewModel> {
        val reminder = reminderMapper.reminderDtoToReminderViewModel(reminderService.updateReminder(reminderId, createReminderDto))
        return ResponseEntity(reminder, HttpStatus.ACCEPTED)
    }

    @DeleteMapping("/reminder/{reminderId}")
    fun deleteHabitReminder(@PathVariable reminderId: Int): HttpStatus {
        reminderService.deleteReminder(reminderId)
        return HttpStatus.ACCEPTED
    }
}