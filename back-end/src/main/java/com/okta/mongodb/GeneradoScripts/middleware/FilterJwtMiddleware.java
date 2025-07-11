package com.okta.mongodb.GeneradoScripts.middleware;

import jakarta.servlet.*;
import jakarta.servlet.http.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.okta.mongodb.GeneradoScripts.utils.JwtUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import java.util.stream.Stream;

@Component
public class FilterJwtMiddleware extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(FilterJwtMiddleware.class);

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        logger.info(path);
        return Stream
                .of("/swagger-ui/index.html",
                        "/swagger-ui/swagger-ui-standalone-preset.js",
                        "/swagger-ui/swagger-ui.css",
                        "/swagger-ui/index.css",
                        "/swagger-ui/swagger-initializer.js",
                        "/swagger-ui/swagger-ui-bundle.js",
                        "/v3/api-docs/swagger-config",
                        "/v3/api-docs",
                        "/plan",
                        "/user/auth")
                .anyMatch(path::startsWith);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        logger.info("header: {}", header);

        if (header == null || !header.startsWith("Bearer ")) {
            sendJsonError(response, HttpServletResponse.SC_UNAUTHORIZED, "Falta el token o formato incorrecto.");
            return;
        }

        String token = header.substring(7);
        String valid = jwtUtil.validateToken(token);
        if (!valid.equalsIgnoreCase(String.valueOf(HttpServletResponse.SC_CONTINUE))) {
            sendJsonError(response, HttpServletResponse.SC_UNAUTHORIZED, valid);
            return;
        }

        String providerId = jwtUtil.getProviderId(token);
        request.setAttribute("providerId", providerId);
        filterChain.doFilter(request, response);
    }

    private void sendJsonError(HttpServletResponse response, int status, String message) throws IOException {
        response.setStatus(status);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Map<String, Object> error = new HashMap<>();
        error.put("message", message);

        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(error);

        response.getWriter().write(json);
    }
}