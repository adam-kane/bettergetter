package com.coe.bettergetter.mood.repo;

import com.coe.bettergetter.mood.entity.Mood
import org.springframework.data.jpa.repository.JpaRepository

interface MoodRepository : JpaRepository<Mood, Int> {
}