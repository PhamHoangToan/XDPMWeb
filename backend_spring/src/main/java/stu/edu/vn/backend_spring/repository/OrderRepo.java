package stu.edu.vn.backend_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import stu.edu.vn.backend_spring.entity.OrderEntity;

@Repository
public interface OrderRepo extends JpaRepository<OrderEntity, Integer> {
    @Query("SELECT CASE WHEN COUNT(o) > 0 THEN true ELSE false END " +
           "FROM OrderEntity o " +
           "JOIN o.orderItems oi " +
           "WHERE o.user.id = :userId " +
           "AND oi.product.id = :productId " +
           "AND o.status = 'Đã giao'")
    boolean hasUserPurchasedAndDelivered(@Param("userId") int userId,
                                         @Param("productId") int productId);
}

