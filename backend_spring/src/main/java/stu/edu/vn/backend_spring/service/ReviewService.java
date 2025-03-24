package stu.edu.vn.backend_spring.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
    private OrderRepo orderRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private UserRepo userRepo;

    public List<ReviewEntity> getReviewsByProductId(int productId) {
        ProductEntity product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return reviewRepo.findByProduct(product);
    }

    public ReviewEntity addReview(int userId, int orderId, int productId, String description) {
        // ✅ Kiểm tra người dùng đã mua sản phẩm này chưa (dựa vào OrderItemEntity)
        boolean hasPurchased = orderItemRepo.existsByUserIdAndProductId(userId, productId);
        if (!hasPurchased) {
            throw new IllegalStateException("Bạn chưa mua sản phẩm này, không thể đánh giá.");
        }

        // ✅ Kiểm tra đã đánh giá chưa
        boolean alreadyReviewed = reviewRepo.existsReview(userId, productId);
        if (alreadyReviewed) {
            throw new IllegalStateException("Bạn đã đánh giá sản phẩm này rồi.");
        }

        // ✅ Kiểm tra đơn hàng có tồn tại không
        OrderEntity order = orderRepo.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Không tìm thấy đơn hàng"));

        // ✅ Kiểm tra đơn hàng có đúng là của người dùng không
        if (order.getUser().getUser_id() != userId) {
            throw new RuntimeException("Bạn không có quyền đánh giá đơn hàng này");
        }

        // ✅ Kiểm tra sản phẩm có nằm trong đơn hàng không
        boolean hasProductInOrder = orderItemRepo.existsByOrderIdAndProductId(orderId, productId);
        if (!hasProductInOrder) {
            throw new RuntimeException("Sản phẩm không tồn tại trong đơn hàng của bạn");
        }

        UserEntity user = userRepo.findById(userId).orElseThrow();
        ProductEntity product = productRepo.findById(productId).orElseThrow();

        ReviewEntity review = new ReviewEntity();
        review.setUser(user);
        review.setProduct(product);
        review.setOrder(order); 
        review.setDescription(description);
        review.setCreated_at(LocalDateTime.now());

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
