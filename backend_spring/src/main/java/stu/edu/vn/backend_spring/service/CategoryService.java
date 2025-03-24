package stu.edu.vn.backend_spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import stu.edu.vn.backend_spring.entity.CategoriesEntity;
import stu.edu.vn.backend_spring.repository.CategoryRepo;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;

    public List<CategoriesEntity> getAllCate() {
        return categoryRepo.findAll();
    }

    public CategoriesEntity addCate(CategoriesEntity categoriesEntity) {
       
        if (categoryRepo.existsByName(categoriesEntity.getName())) {
            throw new RuntimeException("Category is exists!");
        }
       
        return categoryRepo.save(categoriesEntity);
    }

    public CategoriesEntity updateCate(CategoriesEntity categoriesEntity) {
        if (!categoryRepo.existsById(categoriesEntity.getCategory_id())) {
            throw new EntityNotFoundException("Category not found with ID: " + categoriesEntity.getCategory_id());
        }

        return categoryRepo.save(categoriesEntity);
    }

}
