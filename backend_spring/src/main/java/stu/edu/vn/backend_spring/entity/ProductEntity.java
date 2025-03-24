package stu.edu.vn.backend_spring.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
@Entity
@Table(name = "products")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;

    @Column(nullable = false, length = 255)
    private String product_name;

    @Column(nullable = false, length = 100)
    private String image;

    @Column(columnDefinition = "MEDIUMTEXT", nullable = false)
    private String description;

    @Column(nullable = false, precision = 10, scale = 3)
    private BigDecimal price;

    @Column(nullable = false, length = 15)
    private String size;

    @ManyToOne
    @JoinColumn(name = "cate_id", referencedColumnName = "category_id", nullable = false)
    private CategoriesEntity category;
}