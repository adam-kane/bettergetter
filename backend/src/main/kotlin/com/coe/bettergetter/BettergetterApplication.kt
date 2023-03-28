package com.coe.bettergetter

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.data.jpa.repository.config.EnableJpaRepositories
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder

@SpringBootApplication
@EnableJpaRepositories
class BettergetterApplication

@Bean
fun bCryptPasswordEncoder(): BCryptPasswordEncoder {
	return BCryptPasswordEncoder()
}
fun main(args: Array<String>) {
	runApplication<BettergetterApplication>(*args)
}