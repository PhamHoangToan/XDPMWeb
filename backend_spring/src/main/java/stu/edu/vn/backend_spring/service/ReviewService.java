package stu.edu.vn.backend_spring.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import stu.edu.vn.backend_spring.dto.ReviewResponse;
import stu.edu.vn.backend_spring.entity.OrderEntity;
import stu.edu.vn.backend_spring.entity.ProductEntity;
import stu.edu.vn.backend_spring.entity.ReviewEntity;
import stu.edu.vn.backend_spring.entity.UserEntity;
import stu.edu.vn.backend_spring.repository.OrderDetailRepo;
import stu.edu.vn.backend_spring.repository.OrderRepo;
import stu.edu.vn.backend_spring.repository.ProductRepo;
import stu.edu.vn.backend_spring.repository.ReviewRepo;
import stu.edu.vn.backend_spring.repository.UserRepo;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;

    @Autowired
    private OrderDetailRepo orderItemRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private UserRepo userRepo;

    public List<ReviewResponse> getReviewsByProductId(int productId) {
        ProductEntity product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        List<ReviewEntity> reviews = reviewRepo.findByProduct(product);

        return reviews.stream()
                .map(r -> new ReviewResponse(
                        r.getReview_id(),
                        r.getUser().getUsername(), // ánh xạ username từ entity user
                        r.getDescription()))
                .collect(Collectors.toList());
    }

    public ReviewEntity addReview(Integer userId, Integer productId, String description) {
        // Kiểm tra người dùng đã mua sản phẩm chưa
        boolean hasPurchased = orderItemRepo.hasUserPurchasedProduct(userId, productId);
        if (!hasPurchased) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Bạn chưa mua sản phẩm này nên không thể đánh giá.");
        }

        // Kiểm tra người dùng đã đánh giá sản phẩm này chưa
        boolean hasReviewed = reviewRepo.hasUserReviewedProduct(userId, productId);
        if (hasReviewed) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bạn đã đánh giá sản phẩm này rồi.");
        }

        boolean hasPurchaseddele = orderRepo.hasUserPurchasedAndDelivered(userId, productId);
        if (!hasPurchaseddele) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Bạn chỉ có thể đánh giá sản phẩm sau khi đã nhận hàng.");
        }

        // Lấy thông tin user và product
        UserEntity user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Người dùng không tồn tại."));
        ProductEntity product = productRepo.findById(productId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sản phẩm không tồn tại."));

        // Tạo mới đánh giá
        ReviewEntity review = new ReviewEntity();
        review.setUser(user);
        review.setProduct(product);
        review.setDescription(description);
        return reviewRepo.save(review);
    }

    public List<ReviewEntity> getAllReview() {
        return reviewRepo.findAll();
    }

    public boolean deleteReviewById(Integer id) {
        Optional<ReviewEntity> reviewOptional = reviewRepo.findById(id);
        if (reviewOptional.isPresent()) {
            reviewRepo.deleteById(id);
            return true;
        }
        return false;
    }

}
