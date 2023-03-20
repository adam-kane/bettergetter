package com.coe.bettergetter.habit.service

import com.coe.bettergetter.habit.dto.*
import com.coe.bettergetter.habit.entity.Habit
import com.coe.bettergetter.habit.mapper.HabitMapper
import com.coe.bettergetter.habit.repo.HabitRepository
import com.coe.bettergetter.user.repo.UserRepository
import org.springframework.stereotype.Service
import java.time.DayOfWeek
import java.time.LocalDate
import java.util.stream.Collectors
import javax.persistence.EntityNotFoundException

@Service
class HabitService constructor(
    private val habitRepository: HabitRepository,
    private val userRepository: UserRepository,
    private val mapper: HabitMapper
) {

    fun getHabitById(id: Int): HabitDto {
        return mapper.habitEntityToHabitDto(findHabitById(id))
    }

    fun getHabitsWithCompletionsByUserId(userId: Int, timePeriod: String): List<HabitOverviewDto> {
        val habits = habitRepository.findHabitsByUserId(userId).map { item -> mapper.habitEntityToHabitDto(item) }
        return generateCompletionsForTimePeriod(timePeriod, habits)
    }

    fun getHabitDetailCompletions(habitId: Int, timePeriod: String): List<HabitOverviewDto> {
        val habits = habitRepository.findById(habitId)
        habits.get().let {
            val mapped = mapper.habitEntityToHabitDto(it)
            return generateCompletionsForTimePeriod(timePeriod, listOf(mapped))
        }
    }

    fun generateCompletionsForTimePeriod(timePeriod: String, habits: List<HabitDto>): List<HabitOverviewDto> {
        val overviewDto = mutableListOf<HabitOverviewDto>()
        val now = LocalDate.now()
        val startDate = if(timePeriod == "week") now.with(DayOfWeek.MONDAY) else now.withDayOfMonth(1)
        val endDate = if(timePeriod == "week") now.with(DayOfWeek.SUNDAY) else now.withDayOfMonth(now.month.length(now.isLeapYear))

        for (habit in habits) {
            val relevantDates = startDate.datesUntil(endDate.plusDays(1))
                .collect(Collectors.toMap({ key -> key }, { 0 })).toSortedMap()
            val habitOverviewDto = HabitOverviewDto(
                habit.id.toString(),
                habit.title ?: "",
                habit.notes ?: "",
                habit.completionsRequiredPerDay ?: 1,
                emptyList()
            )
            val relevantCompletions = habit.habitCompletions.filter { completion ->
                (completion.timeOfDay?.isEqual(
                    startDate
                ) == true || completion.timeOfDay?.isAfter(startDate) == true) && (completion.timeOfDay?.isEqual(endDate) == true || completion.timeOfDay?.isBefore(
                    endDate
                ) == true)
            }
            for (completion in relevantCompletions) {
                relevantDates[completion.timeOfDay] = relevantDates[completion.timeOfDay]?.plus(1)
            }
            habitOverviewDto.completionSummary = relevantDates.map { entry -> CompletionEntryDto(entry.key, entry.value) }
            overviewDto.add(habitOverviewDto)
        }
        return overviewDto
    }

    fun createHabit(userId: Int, createHabitDto: CreateHabitDto): HabitDto {
        val habit = mapper.createHabitDtoToHabitEntity(createHabitDto)
        val user = userRepository.findById(userId)
        if (user.isPresent) {
            user.get().apply {
                this.habits?.add(habit)
                userRepository.save(this)
                habit.user = this
            }
        }
        habitRepository.save(habit)
        return mapper.habitEntityToHabitDto(habit)
    }

    fun deleteHabit(habitId: Int) {
        val habit = findHabitById(habitId)
        habit.id?.let { habitRepository.deleteById(it) }
    }

    fun updateHabit(habitId: Int, createHabitDto: CreateHabitDto): HabitDto {
        val foundHabit = habitRepository.findById(habitId)
        val habit = mapper.habitEntityToStoredHabitEntity(mapper.createHabitDtoToHabitEntity(createHabitDto))
        if (foundHabit.isPresent) {
            habit.id = foundHabit.get().id
            habit.user = foundHabit.get().user
        }
        val updatedEntity = habitRepository.save(habit)
        return mapper.habitEntityToHabitDto(updatedEntity)
    }

    private fun findHabitById(id: Int): Habit {
        return habitRepository.findById(id).orElseThrow { EntityNotFoundException("Habit not found") }
    }
}