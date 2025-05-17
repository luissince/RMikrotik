package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator.VpnGameGeneratorBody;
import com.okta.mongodb.GeneradoScripts.service.VpnGameGeneratorService;

@RestController
@RequestMapping("/vpn-game-generator")
public class VpnGameGeneratorController {

    @Autowired
    private VpnGameGeneratorService vpnGameGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody VpnGameGeneratorBody staticRoutingGamesBody) {
        return ResponseEntity.ok(vpnGameGeneratorService.create(staticRoutingGamesBody));
    }
    
}
