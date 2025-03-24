package stu.edu.vn.backend_spring.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    @Column(nullable = false, length = 100)
    private String username;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(nullable = false, length = 60)
    private String password;

    @Column(nullable = false, length = 10)
    private String phone;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(length = 6)
    private String reset_code;

    private LocalDateTime reset_expire;

    @Column(nullable = false)
    private LocalDateTime created_at;
}