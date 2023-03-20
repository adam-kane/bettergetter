package com.coe.bettergetter.habitcompletion.entity

import com.coe.bettergetter.habit.entity.Habit
import com.coe.bettergetter.user.entity.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "habit_completion")
open class HabitCompletion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    open var id: Int? = null

    @Column(name = "time_of_day", nullable = false)
    open var timeOfDay: LocalDate? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "habit_id")
    @JsonIgnore
    open var habit: Habit? = null

}