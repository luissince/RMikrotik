package com.okta.mongodb.GeneradoScripts.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.User;
import com.okta.mongodb.GeneradoScripts.service.UsuarioServices;

@RestController
public class UsuarioController {

    @Autowired
    private UsuarioServices userService;

    @GetMapping("/")
    public List<User> initital() {
        return userService.initial();
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> id(@PathVariable Long id) {
        User user = userService.id(id);
        if (user == null) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        }

        return ResponseEntity.ok(user);
    }

    @GetMapping("/create")
    public String create() {
        return userService.create();
    }

    @GetMapping("/update")
    public String update(@PathVariable Long id) {
        return userService.create();
    }
}
