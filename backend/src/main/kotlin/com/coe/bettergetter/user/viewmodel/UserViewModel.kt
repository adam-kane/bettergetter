package com.coe.bettergetter.user.viewmodel

import com.fasterxml.jackson.annotation.JsonProperty

data class UserViewModel(
    @JsonProperty(value = "userId")
    var id: Int,
    @JsonProperty(value = "firstName")
    var firstName: String?,
    @JsonProperty(value = "lastName")
    var lastName: String?,
    @JsonProperty(value = "email")
    var email: String?
) {
}