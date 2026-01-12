package com.ecommerce.controller;

import com.ecommerce.model.CartItem;
import com.ecommerce.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    
    @Autowired
    private JwtService jwtService;
    
    // In-memory cart storage - NO DATABASE
    // In production, this would be stored per user session or in database
    private final Map<String, List<CartItem>> userCarts = new HashMap<>();
    
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody CartItem item) {
        
        String username = extractUsername(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized", "message", "Please login to add items to cart"));
        }
        
        // Validate item
        if (item == null || item.getProductId() == null || item.getProductName() == null || item.getPrice() == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid cart item", "message", "Missing required fields"));
        }
        
        if (item.getQuantity() == null || item.getQuantity() <= 0) {
            item.setQuantity(1);
        }
        
        userCarts.putIfAbsent(username, new ArrayList<>());
        List<CartItem> cart = userCarts.get(username);
        
        // Check if item already exists, update quantity
        Optional<CartItem> existing = cart.stream()
                .filter(i -> i.getProductId().equals(item.getProductId()))
                .findFirst();
        
        if (existing.isPresent()) {
            existing.get().setQuantity(existing.get().getQuantity() + item.getQuantity());
        } else {
            cart.add(item);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Item added to cart");
        response.put("cart", cart);
        response.put("success", true);
        
        return ResponseEntity.ok(response);
    }
    
    @GetMapping
    public ResponseEntity<?> getCart(
            @RequestHeader(value = "Authorization", required = false) String authHeader) {
        
        String username = extractUsername(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        List<CartItem> cart = userCarts.getOrDefault(username, new ArrayList<>());
        return ResponseEntity.ok(cart);
    }
    
    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromCart(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @PathVariable Long productId) {
        
        String username = extractUsername(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        List<CartItem> cart = userCarts.get(username);
        if (cart != null) {
            cart.removeIf(item -> item.getProductId().equals(productId));
        }
        
        return ResponseEntity.ok(Map.of("message", "Item removed from cart", "cart", 
                                       userCarts.getOrDefault(username, new ArrayList<>())));
    }
    
    private String extractUsername(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtService.extractUsername(token);
        }
        return null;
    }
}
