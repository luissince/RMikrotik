package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikUsernamePasswordHotspotGenerator.MikrotikUsernamePasswordHotspotGeneratorBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikUsernamePasswordHotspotGeneratorService;

@RestController
@RequestMapping("/mikrotik-username-password-hotspot-generator")
public class MikrotikUsernamePasswordHotspotGeneratorController {

    @Autowired
    private MikrotikUsernamePasswordHotspotGeneratorService mikrotikUsernamePasswordHotspotGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikUsernamePasswordHotspotGeneratorBody body) {
        return ResponseEntity.ok(mikrotikUsernamePasswordHotspotGeneratorService.create(body));
    }
}
