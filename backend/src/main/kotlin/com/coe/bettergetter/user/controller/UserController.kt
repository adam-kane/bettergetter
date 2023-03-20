package com.coe.bettergetter.user.controller

import com.coe.bettergetter.user.dto.CreateUserDto
import com.coe.bettergetter.user.dto.UserDto
import com.coe.bettergetter.user.mappers.UserMapper
import com.coe.bettergetter.user.service.UserService
import com.coe.bettergetter.user.viewmodel.UserViewModel
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class UserController constructor(val userService: UserService, val mapper: UserMapper) {

    @GetMapping("/user/{id}")
    fun userById(@PathVariable id: Int): ResponseEntity<UserViewModel> {
        return ResponseEntity.ok(getUser(id))
    }

    @PostMapping("/user")
    fun createUser(@RequestBody createUserDto: CreateUserDto): ResponseEntity<UserViewModel> {
        val userViewModel = createUserViewModel(createUserDto)
        return ResponseEntity.ok(userViewModel)
    }

    @PutMapping("/user/{id}")
    fun updateUser(@PathVariable id: Int, @RequestBody createUserDto: CreateUserDto): ResponseEntity<UserViewModel> {
        val userViewModel = mapper.userDtoToUserViewModel(userService.updateUser(id, createUserDto))
        return ResponseEntity.ok(userViewModel)
    }

    @DeleteMapping("/user/{id}")
    fun deleteUser(@PathVariable id: Int): HttpStatus {
        userService.deleteUser(id)
        return HttpStatus.OK
    }

    private fun getUser(id: Int): UserViewModel {
        val userDto: UserDto = userService.getUserById(id)
        return mapper.userDtoToUserViewModel(userDto)
    }

    private fun createUserViewModel(createUserDto: CreateUserDto): UserViewModel {
        val userDto = userService.createUser(createUserDto)
        return mapper.userDtoToUserViewModel(userDto)
    }
}