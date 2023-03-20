package com.coe.bettergetter.user.mappers

import com.coe.bettergetter.user.dto.CreateUserDto
import com.coe.bettergetter.user.dto.UserDto
import com.coe.bettergetter.user.entity.User
import com.coe.bettergetter.user.viewmodel.UserViewModel
import org.mapstruct.Mapper
import org.mapstruct.ReportingPolicy

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
interface UserMapper {
    fun userEntityToUserDto(user: User): UserDto
    fun userDtoToUserEntity(userDto: UserDto): User
    fun userDtoToUserViewModel(userDto: UserDto): UserViewModel
    fun userViewModelToUserDto(userViewModel: UserViewModel): UserDto
    fun createUserDtoToUserEntity(createUserDto: CreateUserDto): User
    fun createUserDtoToUserViewModel(createUserDto: CreateUserDto): UserViewModel
    fun userEntityToStoredUserEntity(user: User): User
}