package com.ecommerce.controller;

import com.ecommerce.model.Product;
import com.ecommerce.service.JwtService;
import com.ecommerce.service.MockDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private MockDataService mockDataService;
    
    @Autowired
    private JwtService jwtService;
    
    @GetMapping("/products")
    public ResponseEntity<?> getAllProducts(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String role = extractRole(authHeader);
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        
        List<Product> products = mockDataService.getAllProducts();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/inventory")
    public ResponseEntity<?> getInventory(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String role = extractRole(authHeader);
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        
        List<Product> products = mockDataService.getAllProducts();
        Map<String, Object> inventory = new HashMap<>();
        inventory.put("totalProducts", products.size());
        inventory.put("totalStock", products.stream().mapToInt(Product::getStock).sum());
        inventory.put("products", products);
        
        return ResponseEntity.ok(inventory);
    }
    
    @GetMapping("/stats")
    public ResponseEntity<?> getStats(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String role = extractRole(authHeader);
        if (!"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        
        // Mock statistics
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalOrders", 42);
        stats.put("totalRevenue", 12500.50);
        stats.put("totalCustomers", 15);
        stats.put("totalProducts", mockDataService.getAllProducts().size());
        
        return ResponseEntity.ok(stats);
    }
    
    private String extractRole(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtService.extractRole(token);
        }
        return null;
    }
}
