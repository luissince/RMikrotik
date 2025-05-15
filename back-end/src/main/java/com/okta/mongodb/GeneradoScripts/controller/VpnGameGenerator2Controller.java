package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator2.VpnGameGenerator2Body;
import com.okta.mongodb.GeneradoScripts.service.VpnGameGenerator2Service;

@RestController
@RequestMapping("/vpn-game-generator-2")
public class VpnGameGenerator2Controller {

    @Autowired
    private VpnGameGenerator2Service vpnGameGenerator2Service;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody VpnGameGenerator2Body staticRoutingGamesBody) {
        return ResponseEntity.ok(vpnGameGenerator2Service.create(staticRoutingGamesBody));
    }

}
