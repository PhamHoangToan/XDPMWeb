package stu.edu.vn.backend_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import stu.edu.vn.backend_spring.entity.OrderEntity;

@Repository
public interface OrderRepo extends JpaRepository<OrderEntity,Integer> {
    
}
