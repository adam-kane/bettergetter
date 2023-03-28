package com.coe.bettergetter.user.entity

import com.coe.bettergetter.habit.entity.Habit
import com.coe.bettergetter.habitcompletion.entity.HabitCompletion
import com.fasterxml.jackson.annotation.JsonIgnore
import java.awt.print.Book
import javax.persistence.*


@Entity
@Table(name = "\"user\"")
open class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    open var id: Int? = null

    @Column(name = "first_name", nullable = false)
    open var firstName: String? = null

    @Column(name = "last_name", nullable = false)
    open var lastName: String? = null

    @Column(name = "email", nullable = false)
    open var email: String? = null

    @Column(name = "password", nullable = false)
    open var password: String? = null

    @OneToMany(cascade = [CascadeType.ALL], targetEntity = Habit::class, mappedBy = "user")
    open var habits: MutableList<Habit>? = null

//    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
//    @JoinTable(name = "user_habit",
//        joinColumns = [JoinColumn(name = "user_id", referencedColumnName = "id")],
//        inverseJoinColumns = [JoinColumn(name = "habit_id", referencedColumnName = "id")])
//    @JsonIgnore
//    open var habits: MutableList<Habit>? = null
}