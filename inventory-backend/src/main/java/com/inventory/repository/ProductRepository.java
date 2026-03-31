package com.inventory.repository;

import com.inventory.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// JpaRepository<Product, Long>:
//   Product = which table/entity to work with
//   Long    = the type of the primary key (id)
//
// By extending JpaRepository, you get these methods FOR FREE:
//   findAll()         → get all products
//   findById(id)      → get one product
//   save(product)     → insert or update
//   deleteById(id)    → delete
//   count()           → count total rows
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Spring automatically writes the SQL for these based on the method name!
    // findByQuantityLessThanEqual(5) → SELECT * FROM products WHERE quantity <= 5
    List<Product> findByQuantityLessThanEqual(int threshold);
}
