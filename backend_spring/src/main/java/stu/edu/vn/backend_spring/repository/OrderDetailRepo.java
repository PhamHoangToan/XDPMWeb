package stu.edu.vn.backend_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import stu.edu.vn.backend_spring.entity.OrderItemEntity;

@Repository
public interface OrderDetailRepo extends JpaRepository<OrderItemEntity, Integer> {
    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN true ELSE false END FROM OrderItemEntity o WHERE o.order.id = :orderId AND o.product.id = :productId")
    boolean existsByOrderIdAndProductId(@Param("orderId") int orderId, @Param("productId") int productId);

    @Query("SELECT CASE WHEN COUNT(oi) > 0 THEN true ELSE false END " +
            "FROM OrderItemEntity oi " +
            "WHERE oi.order.user.user_id = :userId AND oi.product.product_id = :productId")
    boolean existsByUserIdAndProductId(@Param("userId") int userId, @Param("productId") int productId);

    @Query("SELECT COUNT(oi) > 0 FROM OrderItemEntity oi " +
            "JOIN oi.order o " +
            "WHERE o.user.id = :userId AND oi.product.id = :productId")
    boolean hasUserPurchasedProduct(@Param("userId") Integer userId,
            @Param("productId") Integer productId);
}

