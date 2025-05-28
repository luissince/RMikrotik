package com.okta.mongodb.GeneradoScripts.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.subscription.PaymentBody;
import com.okta.mongodb.GeneradoScripts.service.SubcriptionService;

@RestController
@RequestMapping("/payment")
public class SubcriptionController {

    @Autowired
    private SubcriptionService subcriptionService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PaymentBody body) {
        return subcriptionService.create(body);
    }

    @GetMapping
    public ResponseEntity<?> getActiveSubscription(@RequestParam String providerId) {
        return subcriptionService.getActiveSubscription(providerId);
    }
}
