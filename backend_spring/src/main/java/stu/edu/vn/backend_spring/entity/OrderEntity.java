package stu.edu.vn.backend_spring.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false)
    private UserEntity user;

    @Column(name = "date", nullable = true)
    private LocalDateTime date;

    @Column(name = "number", nullable = false)
    private Integer number;

    @Column(name = "total_price", nullable = false, precision = 10, scale = 3)
    private BigDecimal total_price;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "payment", nullable = false)
    private String payment;

    @OneToMany(mappedBy = "order")
    private List<OrderItemEntity> orderItems;

}