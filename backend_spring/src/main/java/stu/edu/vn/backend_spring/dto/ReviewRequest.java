package stu.edu.vn.backend_spring.dto;

import lombok.Data;

@Data
public class ReviewRequest {
    private int userId;
    private int productId;
    private String description;
}
