package com.ecommerce.controller;

import com.ecommerce.model.CartItem;
import com.ecommerce.model.Order;
import com.ecommerce.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {
    
    @Autowired
    private JwtService jwtService;
    
    // Mock order storage - NO DATABASE
    private final Map<String, List<Order>> userOrders = new HashMap<>();
    private final AtomicLong orderIdCounter = new AtomicLong(1000);
    
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody List<CartItem> cartItems) {
        
        String username = extractUsername(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        if (cartItems == null || cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Cart is empty"));
        }
        
        // Calculate total
        double total = cartItems.stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        
        // Create mock order
        Long orderId = orderIdCounter.getAndIncrement();
        Order order = new Order(
            orderId,
            username,
            new ArrayList<>(cartItems),
            total,
            "PENDING",
            LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
        
        // Store order
        userOrders.putIfAbsent(username, new ArrayList<>());
        userOrders.get(username).add(order);
        
        return ResponseEntity.ok(Map.of(
            "status", "SUCCESS",
            "orderId", orderId,
            "totalAmount", total,
            "message", "Order placed successfully"
        ));
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getMyOrders(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String username = extractUsername(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        List<Order> orders = userOrders.getOrDefault(username, new ArrayList<>());
        return ResponseEntity.ok(orders);
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllOrders(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String username = extractUsername(authHeader);
        String role = extractRole(authHeader);
        
        if (username == null || !"ADMIN".equals(role)) {
            return ResponseEntity.status(403).body(Map.of("error", "Admin access required"));
        }
        
        // Return all orders from all users
        List<Order> allOrders = new ArrayList<>();
        userOrders.values().forEach(allOrders::addAll);
        
        return ResponseEntity.ok(allOrders);
    }
    
    private String extractUsername(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtService.extractUsername(token);
        }
        return null;
    }
    
    private String extractRole(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtService.extractRole(token);
        }
        return null;
    }
}
