package com.coe.bettergetter.authentication

import com.coe.bettergetter.authentication.dto.RefreshToken
import com.coe.bettergetter.authentication.service.RefreshTokenService
import com.coe.bettergetter.authentication.service.TokenRefreshException
import com.coe.bettergetter.configuration.JwtUtils
import com.coe.bettergetter.user.dto.CreateUserDto
import com.coe.bettergetter.user.dto.UserDto
import com.coe.bettergetter.user.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*


@CrossOrigin(origins = ["*"], maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
class AuthController constructor(
    val userService: UserService,
    val passwordEncoder: PasswordEncoder,
    val jwtUtils: JwtUtils,
    val authenticationManager: AuthenticationManager,
    val refreshTokenService: RefreshTokenService
) {

    @PostMapping("/signin")
    fun authenticateUser(@RequestBody loginRequest: LoginRequest): ResponseEntity<*> {
        val authentication: Authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(loginRequest.email, loginRequest.password)
        )
        SecurityContextHolder.getContext().authentication = authentication
        val jwt = jwtUtils.generateJwtToken(authentication)
        val userDetails: UserDto = authentication.principal as UserDto
        val roles: List<String> = emptyList()
        val refreshToken: RefreshToken = refreshTokenService.createRefreshToken(userDetails.id)
        return ResponseEntity.ok<Any>(
            JwtResponse(
                token = jwt,
                id = userDetails.id ?: 0,
                username = userDetails.email ?: "",
                email = userDetails.email ?: "",
                roles = roles,
                refreshToken = refreshToken.token ?: ""
            )
        )
    }

    @PostMapping("/refreshtoken")
    fun refreshtoken(@RequestBody refreshToken: String): ResponseEntity<*> {
        val token = refreshTokenService.findByToken(refreshToken)
        val verify = refreshTokenService.verifyExpiration(token!!.get())
        val thing = verify.user
        val generated = jwtUtils.generateTokenFromUsername(thing!!.email)
        if (generated != null) {
            return ResponseEntity.ok(TokenRefreshResponse(generated, refreshToken))
        }
        throw TokenRefreshException(refreshToken, "Failed to refresh")
    }

    @PostMapping("/signup")
    fun registerUser(@RequestBody signUpRequest: SignupRequest): ResponseEntity<*> {
        if (userService.findUserByEmail(signUpRequest.email) != null) {
            return ResponseEntity
                .badRequest()
                .body<Any>(MessageResponse("Error: Username is already taken!"))
        }
        if (userService.findUserByEmail(signUpRequest.email) != null) {
            return ResponseEntity
                .badRequest()
                .body<Any>(MessageResponse("Error: Email is already in use!"))
        }

        // Create new user's account
        val password = passwordEncoder.encode(signUpRequest.password.trim())
        userService.createUser(
            CreateUserDto(
                signUpRequest.email,
                signUpRequest.firstName,
                signUpRequest.lastName,
                password
            )
        )
        return ResponseEntity.ok<Any>(MessageResponse("User registered successfully!"))
    }
}

data class LoginRequest(
    val email: String,
    val password: String
)

data class SignupRequest(
    val email: String,
    val password: String,
    val firstName: String,
    val lastName: String
)

data class JwtResponse(
    val token: String,
    val type: String = "Bearer",
    val id: Int,
    val username: String,
    val email: String,
    val roles: List<String>,
    val refreshToken: String
)

data class MessageResponse(
    val message: String
)

data class TokenRefreshResponse(
    var accessToken: String,
    var refreshToken: String)