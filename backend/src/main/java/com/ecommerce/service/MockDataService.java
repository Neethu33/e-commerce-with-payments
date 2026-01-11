package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MockDataService {
    
    // Mock products - NO DATABASE, hardcoded data
    private final List<Product> products = Arrays.asList(
        new Product(1L, "Laptop", "High-performance laptop with 16GB RAM", 800.0, 
                   "https://via.placeholder.com/300x200?text=Laptop", 50),
        new Product(2L, "Phone", "Latest smartphone with 128GB storage", 400.0,
                   "https://via.placeholder.com/300x200?text=Phone", 100),
        new Product(3L, "Tablet", "10-inch tablet with stylus support", 300.0,
                   "https://via.placeholder.com/300x200?text=Tablet", 75),
        new Product(4L, "Headphones", "Wireless noise-cancelling headphones", 150.0,
                   "https://via.placeholder.com/300x200?text=Headphones", 200),
        new Product(5L, "Keyboard", "Mechanical gaming keyboard", 120.0,
                   "https://via.placeholder.com/300x200?text=Keyboard", 150),
        new Product(6L, "Mouse", "Wireless ergonomic mouse", 50.0,
                   "https://via.placeholder.com/300x200?text=Mouse", 300)
    );
    
    // Mock users - NO DATABASE, hardcoded credentials
    private final Map<String, User> users = new HashMap<>();
    
    public MockDataService() {
        // Initialize mock users
        users.put("customer", new User("customer", "password", "CUSTOMER"));
        users.put("admin", new User("admin", "admin123", "ADMIN"));
        users.put("user1", new User("user1", "pass123", "CUSTOMER"));
    }
    
    public List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }
    
    public Optional<Product> getProductById(Long id) {
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }
    
    public Optional<User> getUserByUsername(String username) {
        return Optional.ofNullable(users.get(username));
    }
    
    public boolean validateUser(String username, String password) {
        User user = users.get(username);
        return user != null && user.getPassword().equals(password);
    }
}
