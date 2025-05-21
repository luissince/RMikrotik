package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikLocalIpPbr.MikrotikLocalIpPbrBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikLocalIpPbrService;

@RestController
@RequestMapping("/mikrotik-local-ip-pbr")
public class MikrotikLocalIpPbrController {

    @Autowired
    private MikrotikLocalIpPbrService mikrotikLocalIpPbrService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikLocalIpPbrBody body) {
        return ResponseEntity.ok(mikrotikLocalIpPbrService.create(body));
    }

}
