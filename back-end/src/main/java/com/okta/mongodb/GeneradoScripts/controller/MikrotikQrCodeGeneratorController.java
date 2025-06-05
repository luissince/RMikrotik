package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikQrCodeGenerator.MikrotikQrCodeGeneratorBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikQrCodeGeneratorService;


@RestController
@RequestMapping("/mikrotik-qr-code-generator")
public class MikrotikQrCodeGeneratorController {
    @Autowired
    private MikrotikQrCodeGeneratorService mikrotikQrCodeGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikQrCodeGeneratorBody body) {
        return ResponseEntity.ok(mikrotikQrCodeGeneratorService.create(body));
    }
}
