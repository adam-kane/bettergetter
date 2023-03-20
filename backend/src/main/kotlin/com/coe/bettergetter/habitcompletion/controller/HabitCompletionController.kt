package com.coe.bettergetter.habitcompletion.controller

import com.coe.bettergetter.habitcompletion.dto.CreateHabitCompletionDto
import com.coe.bettergetter.habitcompletion.mapper.HabitCompletionMapper
import com.coe.bettergetter.habitcompletion.service.HabitCompletionService
import com.coe.bettergetter.habitcompletion.viewmodel.HabitCompletionViewModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class HabitCompletionController constructor(
    val habitCompletionMapper: HabitCompletionMapper,
    val habitCompletionService: HabitCompletionService
) {

    @GetMapping("/habit/{habitId}/habitCompletion")
    fun getHabitCompletionsByHabitId(@PathVariable habitId: Int): ResponseEntity<List<HabitCompletionViewModel>> {
        val habitCompletions: List<HabitCompletionViewModel> =
            habitCompletionService.getHabitCompletionssByHabitId(habitId)
                .map { item -> habitCompletionMapper.habitCompletionDtoToHabitCompletionViewModel(item) }
        return ResponseEntity<List<HabitCompletionViewModel>>(habitCompletions, HttpStatus.OK)
    }

    @GetMapping("habitCompletion/{completionId}")
    fun habitCompletionById(@PathVariable completionId: Int): ResponseEntity<HabitCompletionViewModel> {
        val completion = habitCompletionMapper.habitCompletionDtoToHabitCompletionViewModel(
            habitCompletionService.getHabitCompletionById(completionId)
        )
        return ResponseEntity.ok(completion)
    }

    @PostMapping("/habit/{id}/habitCompletion")
    fun createHabitCompletion(
        @PathVariable(value = "id") habitId: Int,
        @RequestBody createHabitCompletionDto: CreateHabitCompletionDto
    ): ResponseEntity<HabitCompletionViewModel> {
        val habitCompletion = habitCompletionMapper.habitCompletionDtoToHabitCompletionViewModel(
            habitCompletionService.createHabitCompletion(
                habitId,
                createHabitCompletionDto
            )
        )
        return ResponseEntity<HabitCompletionViewModel>(habitCompletion, HttpStatus.CREATED)
    }

    @PutMapping("/habitCompletion/{completionId}")
    fun updateHabitCompletion(
        @PathVariable completionId: Int,
        @RequestBody createHabitCompletionDto: CreateHabitCompletionDto
    ): ResponseEntity<HabitCompletionViewModel> {
        val habitCompletion = habitCompletionMapper.habitCompletionDtoToHabitCompletionViewModel(habitCompletionService.updateHabitCompletion(completionId, createHabitCompletionDto))
        return ResponseEntity<HabitCompletionViewModel>(habitCompletion, HttpStatus.ACCEPTED)
    }

    @DeleteMapping("/habitCompletion/{completionId}")
    fun deleteHabitCompletion(@PathVariable completionId: Int): HttpStatus {
        habitCompletionService.deleteHabit(completionId)
        return HttpStatus.ACCEPTED
    }
}