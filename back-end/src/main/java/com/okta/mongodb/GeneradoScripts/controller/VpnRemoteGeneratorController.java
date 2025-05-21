package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.vpnRemoteGenerator.VpnRemoteGeneratorBody;
import com.okta.mongodb.GeneradoScripts.service.VpnRemoteGeneratorService;

@RestController
@RequestMapping("/vpn-remote-generator")
public class VpnRemoteGeneratorController {

    @Autowired
    private VpnRemoteGeneratorService vpnRemoteGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody VpnRemoteGeneratorBody body) {
        return ResponseEntity.ok(vpnRemoteGeneratorService.create(body));
    }
    
}
