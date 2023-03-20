package com.coe.bettergetter.mood.controller

import com.coe.bettergetter.habit.entity.Habit
import com.coe.bettergetter.mood.entity.Mood
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class MoodController {

    @GetMapping("/user/{id}/mood")
    fun moods(@PathVariable id: Int): List<Mood> {
        return emptyList()
    }

    @GetMapping("/user/{id}/mood/{moodId}")
    fun moodById(@PathVariable id: Int, @PathVariable moodId: Int): Optional<Mood> {
        return Optional.empty()
    }

    @PostMapping("/user/{id}/mood")
    fun createMood(@RequestBody mood: Mood): HttpStatus {
        return HttpStatus.CREATED
    }

    @PutMapping("/user/{id}/mood/{moodId}")
    fun updateMood(@PathVariable id: Int, @PathVariable moodId: Int, @RequestBody mood: Mood): HttpStatus {
        return HttpStatus.ACCEPTED
    }

    @DeleteMapping("/user/{id}/mood/{moodId}")
    fun deleteMood(@PathVariable id: Int, @PathVariable moodId: Int): HttpStatus {
        return HttpStatus.ACCEPTED
    }
}