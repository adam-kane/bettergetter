package com.coe.bettergetter.reminder.entity

import com.coe.bettergetter.habit.entity.Habit
import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import java.time.LocalDate
import javax.persistence.*

@Entity
@Table(name = "reminder")
open class Reminder {

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