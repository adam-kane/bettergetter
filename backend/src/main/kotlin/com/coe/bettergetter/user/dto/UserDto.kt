package com.coe.bettergetter.user.dto

import com.coe.bettergetter.user.entity.User
import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*


class UserDto(
    val id: Int, private val username: String?, val email: String, @field:JsonIgnore private val password: String,
    private val authorities: Collection<GrantedAuthority>?
) : UserDetails {

    override fun getAuthorities(): Collection<GrantedAuthority>? {
        return authorities
    }

    override fun getPassword(): String {
        return password
    }

    override fun getUsername(): String? {
        return username
    }

    override fun isAccountNonExpired(): Boolean {
        return true
    }

    override fun isAccountNonLocked(): Boolean {
        return true
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true
    }

    override fun isEnabled(): Boolean {
        return true
    }

    override fun equals(o: Any?): Boolean {
        if (this === o) return true
        if (o == null || javaClass != o.javaClass) return false
        val user = o as UserDto
        return Objects.equals(id, user.id)
    }

    companion object {
        private const val serialVersionUID = 1L
        fun build(user: User): UserDto {
            val authorities: List<GrantedAuthority> = emptyList()
            return UserDto(
                user.id ?: 0,
                user.email ?: "",
                user.email ?: "",
                user.password ?: "",
                authorities
            )
        }
    }
}