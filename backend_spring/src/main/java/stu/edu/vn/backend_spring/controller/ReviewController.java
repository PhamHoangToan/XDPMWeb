package stu.edu.vn.backend_spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import stu.edu.vn.backend_spring.entity.ReviewEntity;
import stu.edu.vn.backend_spring.service.ReviewService;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/product/{id}")
    public List<ReviewEntity> getAllReviewProduct(@PathVariable("id") int productId) {
        return reviewService.getReviewsByProductId(productId);
    }
    

}
