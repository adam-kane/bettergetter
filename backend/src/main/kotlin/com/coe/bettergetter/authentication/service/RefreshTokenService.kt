package com.coe.bettergetter.authentication.service

import com.coe.bettergetter.authentication.dto.RefreshToken
import com.coe.bettergetter.authentication.repo.RefreshTokenRepository
import com.coe.bettergetter.user.repo.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.bind.annotation.ResponseStatus
import java.time.Instant
import java.util.*

@Service
class RefreshTokenService {
    @Value("\${jwtExpirationMs}")
    private val refreshTokenDurationMs: Long? = null

    @Autowired
    private val refreshTokenRepository: RefreshTokenRepository? = null

    @Autowired
    private val userRepository: UserRepository? = null
    fun findByToken(token: String?): Optional<RefreshToken?>? {
        return refreshTokenRepository!!.findByToken(token)
    }

    fun createRefreshToken(userId: Int): RefreshToken {
        var refreshToken = RefreshToken()
        refreshToken.user = (userRepository!!.findById(userId).get())
        refreshToken.expiryDate = (Instant.now().plusMillis(refreshTokenDurationMs!!))
        refreshToken.token = (UUID.randomUUID().toString())
        refreshToken = refreshTokenRepository!!.save(refreshToken)
        return refreshToken
    }

    fun verifyExpiration(token: RefreshToken): RefreshToken {
        if (token.expiryDate == null) {
            throw TokenRefreshException(token.token, "Refresh token was expired. Please make a new signin request")
        }
        if (token.expiryDate!! < Instant.now()) {
            refreshTokenRepository!!.delete(token)
            throw TokenRefreshException(token.token, "Refresh token was expired. Please make a new signin request")
        }
        return token
    }

    @Transactional
    fun deleteByUserId(userId: Long): Int {
        return refreshTokenRepository!!.deleteByUser(userRepository!!.findById(userId.toInt()).get())
    }
}

@ResponseStatus(HttpStatus.FORBIDDEN)
class TokenRefreshException(token: String?, message: String?) :
    RuntimeException(String.format("Failed for [%s]: %s", token, message)) {
    companion object {
        private const val serialVersionUID = 1L
    }
}