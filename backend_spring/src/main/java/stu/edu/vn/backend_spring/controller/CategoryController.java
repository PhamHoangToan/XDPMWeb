package stu.edu.vn.backend_spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import stu.edu.vn.backend_spring.service.CategoryService;
import stu.edu.vn.backend_spring.entity.CategoriesEntity;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping
    List<CategoriesEntity> getAllCate() {
        return categoryService.getAllCate();
    }

    @PostMapping
    public ResponseEntity<?> addCategory(@RequestBody CategoriesEntity categoriesEntity) {
        try {
            CategoriesEntity savedCategory = categoryService.addCate(categoriesEntity);
            return ResponseEntity.ok(savedCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriesEntity> updateCategory(
            @PathVariable Integer id,
            @RequestBody CategoriesEntity category) {

        category.setCategory_id(id);
        CategoriesEntity updatedCategory = categoryService.updateCate(category);

        return ResponseEntity.ok(updatedCategory);
    }

}
