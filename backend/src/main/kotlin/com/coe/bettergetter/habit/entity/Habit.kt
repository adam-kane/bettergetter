package com.coe.bettergetter.habit.entity

import com.coe.bettergetter.habitcompletion.entity.HabitCompletion
import com.coe.bettergetter.user.entity.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.hibernate.annotations.OnDelete
import org.hibernate.annotations.OnDeleteAction
import javax.persistence.*


@Entity
@Table(name = "habit")
open class Habit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    open var id: Int? = null

    @Column(name = "title", nullable = false)
    open var title: String? = null

    @Column(name = "notes")
    open var notes: String? = null

    @Column(name = "completions_required_per_day", nullable = false)
    open var completionsRequiredPerDay: Int? = null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    open var user: User? = null

    @OneToMany(cascade = [CascadeType.ALL], targetEntity = HabitCompletion::class, mappedBy = "habit")
    open var habitCompletions: List<HabitCompletion> = emptyList()
}