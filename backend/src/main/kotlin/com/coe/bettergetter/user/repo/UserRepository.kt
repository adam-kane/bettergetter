package com.coe.bettergetter.user.repo

import com.coe.bettergetter.user.entity.User
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.JpaSpecificationExecutor

interface UserRepository : JpaRepository<User, Int>, JpaSpecificationExecutor<User> {
    fun findByEmail(email: String): User?
}