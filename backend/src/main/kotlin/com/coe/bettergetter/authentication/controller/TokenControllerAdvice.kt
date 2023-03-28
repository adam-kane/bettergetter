package com.coe.bettergetter.authentication.controller

import com.coe.bettergetter.authentication.service.TokenRefreshException
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest


@RestControllerAdvice
class TokenControllerAdvice {
    @ExceptionHandler(value = [TokenRefreshException::class])
    @ResponseStatus(HttpStatus.FORBIDDEN)
    fun handleTokenRefreshException(ex: TokenRefreshException, request: WebRequest): String {
        return "Failed to refresh ${HttpStatus.FORBIDDEN.value()}"

    }
}