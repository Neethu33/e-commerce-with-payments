package com.ecommerce.config;

import com.ecommerce.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            
            try {
                // First validate the token
                if (jwtService.validateToken(token)) {
                    String username = jwtService.extractUsername(token);
                    String role = jwtService.extractRole(token);
                    
                    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        // Default to CUSTOMER role if role is null
                        if (role == null || role.isEmpty()) {
                            role = "CUSTOMER";
                        }
                        
                        // Create authentication token
                        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + role);
                        UsernamePasswordAuthenticationToken authToken = 
                            new UsernamePasswordAuthenticationToken(
                                username, 
                                null, 
                                Collections.singletonList(authority)
                            );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        
                        logger.debug("JWT authentication successful for user: " + username);
                    }
                } else {
                    logger.debug("JWT token validation failed for request: " + request.getRequestURI());
                }
            } catch (Exception e) {
                // Token is invalid, log for debugging
                logger.warn("JWT token validation failed for request " + request.getRequestURI() + ": " + e.getMessage());
                // Clear any existing authentication context
                SecurityContextHolder.clearContext();
            }
        } else {
            // No Authorization header, clear context
            SecurityContextHolder.clearContext();
        }
        
        filterChain.doFilter(request, response);
    }
}
