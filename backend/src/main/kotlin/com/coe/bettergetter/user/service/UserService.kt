package com.coe.bettergetter.user.service

import com.coe.bettergetter.bCryptPasswordEncoder
import com.coe.bettergetter.user.dto.CreateUserDto
import com.coe.bettergetter.user.dto.UserDto
import com.coe.bettergetter.user.entity.User
import com.coe.bettergetter.user.mappers.UserMapper
import com.coe.bettergetter.user.repo.UserRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import javax.persistence.EntityNotFoundException


@Service
class UserService constructor(val userRepository: UserRepository, val mapper: UserMapper): UserDetailsService {

    fun getUserById(id: Int): UserDto {
        return mapper.userEntityToUserDto(findUserById(id))
    }

    fun createUser(createUserDto: CreateUserDto): UserDto {
        val user = mapper.createUserDtoToUserEntity(createUserDto)
        val userSaved = userRepository.save(user)
        return UserDto.build(userSaved)
    }

    fun deleteUser(userId: Int) {
        userRepository.deleteById(userId)
    }

    fun updateUser(userId: Int, createUserDto: CreateUserDto): UserDto {
        val userEntity = mapper.userEntityToStoredUserEntity(mapper.createUserDtoToUserEntity(createUserDto))
        if (userRepository.findById(userId).isPresent) {
            userEntity.id = userId
        }
        val updatedEntity = userRepository.save(userEntity)
        return mapper.userEntityToUserDto(updatedEntity)
    }

    private fun findUserById(id: Int): User {
        return userRepository.findById(id).orElseThrow { EntityNotFoundException("User not found") }
    }

    @Throws(Exception::class)
    fun findUserByEmail(email: String): UserDto? {
        if (userRepository.findByEmail(email) != null) {
            return UserDto.build(userRepository.findByEmail(email)!!)
        }
        return null
    }

    @kotlin.jvm.Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String?): UserDetails {
        if (userRepository.findByEmail(username ?: "") != null) {
            return UserDto.build(userRepository.findByEmail(username ?: "")!!)
        }

        throw UsernameNotFoundException("Failed to find user")
    }
}