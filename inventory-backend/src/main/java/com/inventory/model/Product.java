package com.inventory.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

// @Entity = this class maps to a database table called "products"
@Entity
@Table(name = "products")
@Data   // Lombok: auto-generates getters, setters, toString, equals, hashCode
public class Product {

    // @Id = this is the primary key
    // @GeneratedValue = auto-increment (1, 2, 3, 4...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // nullable = false means this field CANNOT be empty in the DB
    @Column(nullable = false)
    private String name;

    private String category;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double price;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    // @PrePersist = runs this method automatically BEFORE saving to DB
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
