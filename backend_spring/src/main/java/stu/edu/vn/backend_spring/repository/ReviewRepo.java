package stu.edu.vn.backend_spring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import stu.edu.vn.backend_spring.entity.ProductEntity;
import stu.edu.vn.backend_spring.entity.ReviewEntity;

@Repository
public interface ReviewRepo extends JpaRepository<ReviewEntity,Integer>{
    List<ReviewEntity> findByProduct(ProductEntity product);

}
