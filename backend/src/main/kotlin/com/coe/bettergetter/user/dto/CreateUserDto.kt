package com.coe.bettergetter.user.dto

data class CreateUserDto(
    var email: String?,
    var firstName: String?,
    var lastName: String?,
    var password: String?
) {

}