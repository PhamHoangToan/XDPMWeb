package stu.edu.vn.backend_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import stu.edu.vn.backend_spring.entity.CategoriesEntity;


@Repository
public interface CategoryRepo extends JpaRepository<CategoriesEntity,Integer>{
    boolean existsByName(String name);
    
}