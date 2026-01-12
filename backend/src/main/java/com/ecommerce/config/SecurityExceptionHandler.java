package com.ecommerce.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class SecurityExceptionHandler implements AuthenticationEntryPoint, AccessDeniedHandler {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        // Handle 401 Unauthorized (authentication failed)
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        Map<String, Object> body = new HashMap<>();
        body.put("error", "Unauthorized");
        body.put("message", "Authentication required. Please login.");
        body.put("path", request.getRequestURI());
        
        response.getWriter().write(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(body));
    }

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException accessDeniedException) throws IOException, ServletException {
        // Handle 403 Forbidden (authorization failed)
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        Map<String, Object> body = new HashMap<>();
        body.put("error", "Forbidden");
        body.put("message", "Access denied. Invalid or expired token.");
        body.put("path", request.getRequestURI());
        
        response.getWriter().write(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsString(body));
    }
}
