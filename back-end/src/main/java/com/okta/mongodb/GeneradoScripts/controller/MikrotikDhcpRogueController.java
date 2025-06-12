package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikDhcpRogue.MikrotikDhcpRogueBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikDhcpRogueService;


@RestController
@RequestMapping("/mikrotik-dhcp-rogue")
public class MikrotikDhcpRogueController {
    @Autowired
    private MikrotikDhcpRogueService mikrotikDhcpRogueService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikDhcpRogueBody body) {
        return ResponseEntity.ok(mikrotikDhcpRogueService.create(body));
    }
 
}
