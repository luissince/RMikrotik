package com.okta.mongodb.GeneradoScripts.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.user.User;
import com.okta.mongodb.GeneradoScripts.model.user.UserBody;
import com.okta.mongodb.GeneradoScripts.model.user.UserRol;
import com.okta.mongodb.GeneradoScripts.repository.UserRepository;
import com.okta.mongodb.GeneradoScripts.utils.JwtUtil;

@Service
public class UserService {

        private static final Logger logger = LoggerFactory.getLogger(UserService.class);

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private JwtUtil jwtUtil;

        public Map<String, Object> create(UserBody body) {
                User user = userRepository
                                .findByProviderId(body.getProviderId())
                                .orElseGet(() -> {
                                        User newUser = new User();
                                        newUser.setProviderId(body.getProviderId());
                                        newUser.setName(body.getName());
                                        newUser.setEmail(body.getEmail());
                                        newUser.setImage(body.getImage());
                                        newUser.setRol(UserRol.CLIENT);
                                        return userRepository.save(newUser);
                                });

                // Obtener la última suscripción
                Map<String, Object> response = new java.util.HashMap<>();

                String token = jwtUtil.generateToken(user);
                response.put("token", token);
                response.put("type", "Bearer");

                return response;
        }

        public ResponseEntity<?> getUser(String providerId) {
                User user = userRepository.findByProviderId(providerId).orElse(null);
                if (user == null) {
                        return ResponseEntity.badRequest().body(Map.of("message", "Usuario no encontrado"));
                }

                return ResponseEntity.ok().body(Map.of("user", user));
        }

        public List<User> getAllUsers() {
                return userRepository.findAll();
        }

}
