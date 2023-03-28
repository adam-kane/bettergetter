package com.coe.bettergetter.authentication.dto

import com.coe.bettergetter.user.entity.User
import org.hibernate.Hibernate
import java.time.Instant
import javax.persistence.*

@Entity(name = "refreshtoken")
data class RefreshToken (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = 0,

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    var user: User? = null,

    @Column(nullable = false, unique = true)
    var token: String? = null,

    @Column(nullable = false)
    var expiryDate: Instant? = null //getters and setters
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as RefreshToken

        return id != null && id == other.id
    }

    override fun hashCode(): Int = javaClass.hashCode()

    @Override
    override fun toString(): String {
        return this::class.simpleName + "(id = $id , user = $user , token = $token , expiryDate = $expiryDate )"
    }
}