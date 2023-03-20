package com.coe.bettergetter.habit.controller

import com.coe.bettergetter.habit.dto.CreateHabitDto
import com.coe.bettergetter.habit.dto.HabitOverviewDto
import com.coe.bettergetter.habit.mapper.HabitMapper
import com.coe.bettergetter.habit.service.HabitService
import com.coe.bettergetter.habit.viewmodel.HabitViewModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class HabitController constructor(private val habitMapper: HabitMapper, val habitService: HabitService) {

    @GetMapping("/habit/{habitId}")
    fun habitById(@PathVariable habitId: Int): ResponseEntity<HabitViewModel> {
        val overview = habitService.getHabitDetailCompletions(habitId, "month")
        return ResponseEntity.ok(HabitViewModel(overview.first()))
    }

    @GetMapping("/user/{id}/habit")
    fun getAllHabitsByUserId(
        @PathVariable(value = "id") userId: Int,
        @RequestParam(value = "timePeriod", defaultValue = "week") timePeriod: String,
    ): ResponseEntity<List<HabitOverviewDto>>? {
        val habits: List<HabitOverviewDto> = habitService.getHabitsWithCompletionsByUserId(userId, timePeriod)
        return ResponseEntity<List<HabitOverviewDto>>(habits, HttpStatus.OK)
    }

    @PostMapping("/user/{id}/habit")
    fun createHabit(
        @PathVariable(value = "id") userId: Int,
        @RequestBody createHabitDto: CreateHabitDto
    ): ResponseEntity<HabitViewModel> {
        val habit = habitMapper.habitDtoToHabitViewModel(habitService.createHabit(userId, createHabitDto))
        return ResponseEntity<HabitViewModel>(habit, HttpStatus.CREATED)
    }

    @PutMapping("/habit/{habitId}")
    fun updateHabit(
        @PathVariable habitId: Int,
        @RequestBody createHabitDto: CreateHabitDto
    ): ResponseEntity<HabitViewModel> {
        val habit = habitMapper.habitDtoToHabitViewModel(habitService.updateHabit(habitId, createHabitDto))
        return ResponseEntity<HabitViewModel>(habit, HttpStatus.ACCEPTED)
    }

    @DeleteMapping("/habit/{habitId}")
    fun deleteHabit(@PathVariable habitId: Int): HttpStatus {
        habitService.deleteHabit(habitId)
        return HttpStatus.OK
    }
}