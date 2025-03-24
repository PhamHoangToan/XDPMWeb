package stu.edu.vn.backend_spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import stu.edu.vn.backend_spring.entity.ProductEntity;
import stu.edu.vn.backend_spring.entity.ReviewEntity;
import stu.edu.vn.backend_spring.repository.ProductRepo;
import stu.edu.vn.backend_spring.repository.ReviewRepo;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private ProductRepo productRepo;

    public List<ReviewEntity> getReviewsByProductId(int productId) {
    ProductEntity product = productRepo.findById(productId)
        .orElseThrow(() -> new RuntimeException("Product not found"));
    return reviewRepo.findByProduct(product);
}
}
