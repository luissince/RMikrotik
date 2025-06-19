package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikUsernamePasswordPppGenerator.MikrotikUsernamePasswordPppGeneratorBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikUsernamePasswordPppGeneratorService;

@RestController
@RequestMapping("/mikrotik-username-password-ppp-generator")
public class MikrotikUsernamePasswordPppGeneratorController {
    @Autowired
    private MikrotikUsernamePasswordPppGeneratorService mikrotikUsernamePasswordPppGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikUsernamePasswordPppGeneratorBody body) {
        return ResponseEntity.ok(mikrotikUsernamePasswordPppGeneratorService.create(body));
    }
}
