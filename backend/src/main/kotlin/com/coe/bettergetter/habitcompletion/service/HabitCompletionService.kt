package com.coe.bettergetter.habitcompletion.service

import com.coe.bettergetter.habit.repo.HabitRepository
import com.coe.bettergetter.habitcompletion.dto.CreateHabitCompletionDto
import com.coe.bettergetter.habitcompletion.dto.HabitCompletionDto
import com.coe.bettergetter.habitcompletion.entity.HabitCompletion
import com.coe.bettergetter.habitcompletion.mapper.HabitCompletionMapper
import com.coe.bettergetter.habitcompletion.repo.HabitCompletionRepository
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException

@Service
class HabitCompletionService constructor(
    private val habitRepository: HabitRepository,
    private val habitCompletionRepository: HabitCompletionRepository,
    private val mapper: HabitCompletionMapper
) {

    fun getHabitCompletionById(id: Int): HabitCompletionDto {
        return mapper.habitCompletionEntityToHabitCompletionDto(findHabitCompletionById(id))
    }

    fun getHabitCompletionssByHabitId(habitId: Int): List<HabitCompletionDto> {
        return habitCompletionRepository.findHabitCompletionsByHabitId(habitId)
            .map { item -> mapper.habitCompletionEntityToHabitCompletionDto(item) }
    }

    fun createHabitCompletion(habitId: Int, createHabitCompletionDto: CreateHabitCompletionDto): HabitCompletionDto {
        val habitCompletion = mapper.createHabitCompletionDtoToHabitCompletionEntity(createHabitCompletionDto)
        val habit = habitRepository.findById(habitId)
        if (habit.isPresent) {
            habit.get().apply {
                habitCompletion.habit = this
                habitCompletionRepository.save(habitCompletion)
            }
        }
        return mapper.habitCompletionEntityToHabitCompletionDto(habitCompletion)
    }

    fun deleteHabit(completionId: Int) {
        val habitCompletion = findHabitCompletionById(completionId)
        habitCompletion.id?.let { habitCompletionRepository.deleteById(it) }
    }

    fun updateHabitCompletion(completionId: Int, createHabitCompletionDto: CreateHabitCompletionDto): HabitCompletionDto {
        val habitCompletion = habitCompletionRepository.findById(completionId)
        val update = mapper.createHabitCompletionDtoToHabitCompletionEntity(createHabitCompletionDto)
        if (habitCompletion.isPresent) {
            habitCompletion.get().apply {
                this.timeOfDay = update.timeOfDay
                habitCompletionRepository.save(this)
                return mapper.habitCompletionEntityToHabitCompletionDto(this)
            }
        }
        return mapper.habitCompletionEntityToHabitCompletionDto(update)
    }

    private fun findHabitCompletionById(id: Int): HabitCompletion {
        return habitCompletionRepository.findById(id)
            .orElseThrow { EntityNotFoundException("Habit completion not found") }
    }
}