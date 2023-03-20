package com.coe.bettergetter.habit.mapper

import com.coe.bettergetter.habit.dto.CreateHabitDto
import com.coe.bettergetter.habit.dto.HabitDto
import com.coe.bettergetter.habit.entity.Habit
import com.coe.bettergetter.habit.viewmodel.HabitViewModel
import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface HabitMapper {
    fun habitEntityToHabitDto(habit: Habit): HabitDto
    fun habitDtoToHabitEntity(habitDto: HabitDto): Habit
    fun habitDtoToHabitViewModel(habitDto: HabitDto): HabitViewModel
    fun habitViewModelToUserDto(habitViewModel: HabitViewModel): HabitDto
    fun createHabitDtoToHabitEntity(createHabitDto: CreateHabitDto): Habit
    fun createHabitDtoToUserViewModel(createHabitDto: CreateHabitDto): HabitViewModel
    fun habitEntityToStoredHabitEntity(habit: Habit): Habit
}