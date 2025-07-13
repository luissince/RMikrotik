package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikchangemacaddress.MikrotikChangeMacAddressBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikChangeMacAddresscService;

@RestController
@RequestMapping("/mikrotik-change-mac-address")
public class MikrotikChangeMacAddresscController {
    
    @Autowired
    private MikrotikChangeMacAddresscService mikrotikChangeMacAddresscService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikChangeMacAddressBody body) {
        return ResponseEntity.ok(mikrotikChangeMacAddresscService.create(body));
    }
}
