package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikPcqGenerator.MikrotikPcqGeneratorBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikPcqGeneratorService;

@RestController
@RequestMapping("/mikrotik-pcq-generator")
public class MikrotikPcqGeneratorController {

    @Autowired
    private MikrotikPcqGeneratorService mikrotikPcqGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikPcqGeneratorBody body) {
        return ResponseEntity.ok(mikrotikPcqGeneratorService.create(body));
    }
    
}
