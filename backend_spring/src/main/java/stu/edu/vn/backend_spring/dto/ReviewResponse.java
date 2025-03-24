package stu.edu.vn.backend_spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReviewResponse {
    private Integer reviewId;
    private String username;
    private String description;
}
