package stu.edu.vn.backend_spring.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import stu.edu.vn.backend_spring.entity.ProductEntity;
import stu.edu.vn.backend_spring.entity.ReviewEntity;

@Repository
public interface ReviewRepo extends JpaRepository<ReviewEntity, Integer> {
    List<ReviewEntity> findByProduct(ProductEntity product);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM ReviewEntity r WHERE r.user.id = :userId AND r.product.id = :productId")
    boolean existsReview(@Param("userId") int userId, @Param("productId") int productId);

    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
           "FROM ReviewEntity r " +
           "WHERE r.user.id = :userId AND r.product.id = :productId")
    boolean hasUserReviewedProduct(@Param("userId") int userId, @Param("productId") int productId);

}
