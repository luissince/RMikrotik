package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikPortForwardGenerator.MikrotikPortForwardGeneratorBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikPortForwardGeneratorService;

@RestController
@RequestMapping("/mikrotik-port-forward-generator")
public class MikrotikPortForwardGeneratorController {

    @Autowired
    private MikrotikPortForwardGeneratorService mikrotikPortForwardGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikPortForwardGeneratorBody body) {
        return ResponseEntity.ok(mikrotikPortForwardGeneratorService.create(body));
    }

}
