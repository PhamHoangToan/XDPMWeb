package stu.edu.vn.backend_spring.repository;

import java.math.BigDecimal;
import java.util.List;

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

       @Query("SELECT SUM(o.total_price) FROM OrderEntity o " +
                     "WHERE YEAR(o.date) = :year " +
                     "AND (:month IS NULL OR MONTH(o.date) = :month) " +
                     "AND (:day IS NULL OR DAY(o.date) = :day)")
       BigDecimal getTotalRevenue(@Param("year") int year,
                     @Param("month") Integer month,
                     @Param("day") Integer day);

       @Query("SELECT o FROM OrderEntity o " +
                     "WHERE YEAR(o.date) = :year " +
                     "AND (:month IS NULL OR MONTH(o.date) = :month) " +
                     "AND (:day IS NULL OR DAY(o.date) = :day)")
       List<OrderEntity> getOrdersByDate(@Param("year") int year,
                     @Param("month") Integer month,
                     @Param("day") Integer day);

       @Query("SELECT o FROM OrderEntity o WHERE YEAR(o.date) = :year")
       List<OrderEntity> getOrdersByYear(@Param("year") int year);

       @Query("SELECT o FROM OrderEntity o WHERE YEAR(o.date) = :year AND MONTH(o.date) = :month")
       List<OrderEntity> getOrdersByMonth(@Param("year") int year, @Param("month") int month);

       @Query("SELECT o FROM OrderEntity o WHERE YEAR(o.date) = :year AND MONTH(o.date) = :month AND DAY(o.date) = :day")
       List<OrderEntity> getOrdersByDay(@Param("year") int year, @Param("month") int month, @Param("day") int day);

}
