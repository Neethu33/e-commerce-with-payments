package com.ecommerce.controller;

import com.ecommerce.model.PaymentRequest;
import com.ecommerce.model.PaymentResponse;
import com.ecommerce.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentController {
    
    @Autowired
    private JwtService jwtService;
    
    @PostMapping("/initiate")
    public ResponseEntity<?> initiatePayment(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody PaymentRequest request) {
        
        String username = extractUsername(authHeader);
        if (username == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        
        // MOCK PAYMENT GATEWAY - Always succeeds for demo
        // In production, this would integrate with real payment gateway (Stripe, PayPal, etc.)
        // PCI-DSS compliance would be required for handling real payment data
        
        String paymentRef = "MOCK_" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        
        PaymentResponse response = new PaymentResponse(
            "PAID",
            paymentRef,
            request.getOrderId(),
            "Payment processed successfully (MOCK MODE)"
        );
        
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/webhook")
    public ResponseEntity<?> webhook(@RequestBody Map<String, Object> payload) {
        // MOCK WEBHOOK ENDPOINT - Just logs the payload
        // In production, this would verify webhook signature and process payment status updates
        System.out.println("=== MOCK PAYMENT WEBHOOK ===");
        System.out.println("Payload: " + payload);
        System.out.println("============================");
        
        return ResponseEntity.ok(Map.of("status", "received", "message", "Webhook processed (MOCK MODE)"));
    }
    
    private String extractUsername(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtService.extractUsername(token);
        }
        return null;
    }
}
