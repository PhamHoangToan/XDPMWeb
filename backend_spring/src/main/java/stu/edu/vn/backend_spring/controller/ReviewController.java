package stu.edu.vn.backend_spring.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import stu.edu.vn.backend_spring.dto.ReviewRequest;
import stu.edu.vn.backend_spring.dto.ReviewResponse;
import stu.edu.vn.backend_spring.entity.ReviewEntity;
import stu.edu.vn.backend_spring.service.JwtService;
import stu.edu.vn.backend_spring.service.ReviewService;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = "http://localhost:5173")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private JwtService jwtService;

    @GetMapping("/product/{id}")
    public ResponseEntity<List<ReviewResponse>> getAllReviewProduct(@PathVariable("id") int productId) {
        return ResponseEntity.ok(reviewService.getReviewsByProductId(productId));
    }

    @PostMapping(produces = "application/json; charset=UTF-8")
    public ResponseEntity<?> addReview(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ReviewRequest request) {
        String token = authHeader.replace("Bearer ", "");
        Integer userId = jwtService.getUserIdFromToken(token);

        ReviewEntity review = reviewService.addReview(userId, request.getProductId(),
                request.getDescription());
        return ResponseEntity.ok(review);
    }

    @GetMapping("/admin")
    public List<ReviewEntity> getAllReview() {
        return reviewService.getAllReview();
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<?> deleteReviewById(@PathVariable Integer id) {
        System.out.println("👉 Delete request received for ID: " + id);
        boolean deleted = reviewService.deleteReviewById(id);
        if (deleted) {
            return ResponseEntity.ok("Review đã được xóa thành công.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy review có ID: " + id);
        }
    }

}
