package com.coe.bettergetter.habitcompletion.mapper

import com.coe.bettergetter.habitcompletion.dto.CreateHabitCompletionDto
import com.coe.bettergetter.habitcompletion.dto.HabitCompletionDto
import com.coe.bettergetter.habitcompletion.entity.HabitCompletion
import com.coe.bettergetter.habitcompletion.viewmodel.HabitCompletionViewModel
import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface HabitCompletionMapper {
    fun habitCompletionEntityToHabitCompletionDto(habitCompletion: HabitCompletion): HabitCompletionDto
    fun habitCompletionDtoToHabitCompletionEntity(habitCompletionDto: HabitCompletionDto): HabitCompletion
    fun habitCompletionDtoToHabitCompletionViewModel(habitCompletionDto: HabitCompletionDto): HabitCompletionViewModel
    fun habitCompletionViewModelToHabitCompletionDto(habitCompletionViewModel: HabitCompletionViewModel): HabitCompletionDto
    fun createHabitCompletionDtoToHabitCompletionEntity(createHabitCompletionDto: CreateHabitCompletionDto): HabitCompletion
    fun createHabitCompletionDtoToHabitCompletionViewModel(createHabitCompletionDto: CreateHabitCompletionDto): HabitCompletionViewModel
    fun habitCompletionEntityToStoredHabitCompletionEntity(habitCompletion: HabitCompletion): HabitCompletion
}