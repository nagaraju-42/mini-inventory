package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

// @Service = tells Spring: "this class contains business logic"
// The Service layer sits between Controller (API) and Repository (DB)
// Flow: Controller → Service → Repository → Database
@Service
public class ProductService {

    // @Autowired = Spring automatically creates and injects this object for us
    @Autowired
    private ProductRepository productRepository;

    // Get all products from DB
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get one product by ID — returns Optional because it might not exist
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Add a new product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Update an existing product
    public Product updateProduct(Long id, Product updatedProduct) {
        // First check if product exists
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        // Update the fields
        existing.setName(updatedProduct.getName());
        existing.setCategory(updatedProduct.getCategory());
        existing.setQuantity(updatedProduct.getQuantity());
        existing.setPrice(updatedProduct.getPrice());

        // Save and return the updated product
        return productRepository.save(existing);
    }

    // Delete a product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    // Get products with quantity <= 5 (low stock)
    public List<Product> getLowStockProducts() {
        return productRepository.findByQuantityLessThanEqual(5);
    }

    // Get dashboard summary data
    public Map<String, Object> getDashboardData() {
        List<Product> lowStock = getLowStockProducts();

        Map<String, Object> dashboard = new HashMap<>();
        dashboard.put("totalProducts", productRepository.count());
        dashboard.put("lowStockCount", lowStock.size());
        dashboard.put("lowStockProducts", lowStock);
        return dashboard;
    }
}
