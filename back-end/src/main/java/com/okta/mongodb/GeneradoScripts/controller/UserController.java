package com.okta.mongodb.GeneradoScripts.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.user.User;
import com.okta.mongodb.GeneradoScripts.model.user.UserBody;
import com.okta.mongodb.GeneradoScripts.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/auth")
    public Map<String, Object> create(@RequestBody UserBody body) {
        return userService.create(body);
    }

    @GetMapping("/id")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        String providerId = (String) request.getAttribute("providerId");
        return userService.getUser(providerId);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
