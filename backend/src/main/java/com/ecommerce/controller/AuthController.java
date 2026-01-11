package com.ecommerce.controller;

import com.ecommerce.model.AuthRequest;
import com.ecommerce.model.AuthResponse;
import com.ecommerce.model.User;
import com.ecommerce.service.JwtService;
import com.ecommerce.service.MockDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private MockDataService mockDataService;
    
    @Autowired
    private JwtService jwtService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        // Mock authentication - NO REAL DATABASE
        if (mockDataService.validateUser(request.getUsername(), request.getPassword())) {
            User user = mockDataService.getUserByUsername(request.getUsername()).orElse(null);
            if (user != null) {
                String token = jwtService.generateToken(user.getUsername(), user.getRole());
                return ResponseEntity.ok(new AuthResponse(token, user.getRole(), user.getUsername()));
            }
        }
        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}
