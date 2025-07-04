package com.okta.mongodb.GeneradoScripts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.subscription.ActiveBody;
import com.okta.mongodb.GeneradoScripts.model.subscription.PaymentBody;
import com.okta.mongodb.GeneradoScripts.service.SubcriptionService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/payment")
public class SubcriptionController {

    @Autowired
    private SubcriptionService subcriptionService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PaymentBody body, HttpServletRequest request) {
        String providerId = (String) request.getAttribute("providerId");
        body.setProviderId(providerId);
        return subcriptionService.create(body);
    }

    @GetMapping("/{token}")
    public ResponseEntity<?> captureOrden(@PathVariable String token) {
        return subcriptionService.captureOrden(token);
    }

    @GetMapping
    public ResponseEntity<?> getSubscription(HttpServletRequest request) {
        String providerId = (String) request.getAttribute("providerId");
        return subcriptionService.getSubscription(providerId);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllSubscriptions() {
        return subcriptionService.getAllSubscriptions();
    }

    @PostMapping("/active")
    public ResponseEntity<?> active(@RequestBody ActiveBody body, HttpServletRequest request) {
        String providerId = (String) request.getAttribute("providerId");
        body.setProviderId(providerId);
        return subcriptionService.active(body);
    }

}
