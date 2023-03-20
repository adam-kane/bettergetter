package com.coe.bettergetter.reminder.mapper

import com.coe.bettergetter.reminder.dto.CreateReminderDto
import com.coe.bettergetter.reminder.dto.ReminderDto
import com.coe.bettergetter.reminder.entity.Reminder
import com.coe.bettergetter.reminder.viewmodel.ReminderViewModel
import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface ReminderMapper {
    fun reminderEntityToReminderDto(reminder: Reminder): ReminderDto
    fun reminderDtoToReminderEntity(reminderDto: ReminderDto): Reminder
    fun reminderDtoToReminderViewModel(reminderDto: ReminderDto): ReminderViewModel
    fun reminderViewModelToReminderDto(reminderViewModel: ReminderViewModel): ReminderDto
    fun createReminderDtoToReminderEntity(createReminderDto: CreateReminderDto): Reminder
    fun createReminderDtoToReminderViewModel(createReminderDto: CreateReminderDto): ReminderViewModel
    fun reminderEntityToStoredReminderEntity(reminder: Reminder): Reminder
}