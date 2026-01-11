package com.ecommerce.controller;

import com.ecommerce.model.Product;
import com.ecommerce.service.MockDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {
    
    @Autowired
    private MockDataService mockDataService;
    
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        // Mock data - NO DATABASE
        return ResponseEntity.ok(mockDataService.getAllProducts());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = mockDataService.getProductById(id);
        return product.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
}
