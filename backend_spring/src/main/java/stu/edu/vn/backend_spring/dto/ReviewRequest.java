package stu.edu.vn.backend_spring.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class ReviewRequest {
    private int orderId;
    private int productId;
    private String description;
    private LocalDateTime created_at;
}
