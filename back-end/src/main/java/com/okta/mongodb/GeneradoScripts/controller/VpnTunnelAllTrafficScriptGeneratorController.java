package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.vpnTunnelAllTrafficScriptGeneratorController.VpnTunnelAllTrafficScriptGeneratorBody;
import com.okta.mongodb.GeneradoScripts.service.VpnTunnelAllTrafficScriptGeneratorService;

@RestController
@RequestMapping("/vpn-tunnel-all-traffic-script-generator")
public class VpnTunnelAllTrafficScriptGeneratorController {

     @Autowired
    private VpnTunnelAllTrafficScriptGeneratorService vpnTunnelAllTrafficScriptGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody VpnTunnelAllTrafficScriptGeneratorBody vpnTunnelAllTrafficScriptGeneratorBody) {
        return ResponseEntity.ok(vpnTunnelAllTrafficScriptGeneratorService.create(vpnTunnelAllTrafficScriptGeneratorBody));
    }

}
