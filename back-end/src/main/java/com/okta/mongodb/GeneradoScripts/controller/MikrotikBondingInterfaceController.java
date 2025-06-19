package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikBondingInterface.MikrotikBondingInterfaceBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikBondingInterfaceService;


@RestController
@RequestMapping("/mikrotik-bonding-interface")
public class MikrotikBondingInterfaceController {
        @Autowired
    private MikrotikBondingInterfaceService mikrotikBondingInterfaceService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikBondingInterfaceBody body) {
        return ResponseEntity.ok(mikrotikBondingInterfaceService.create(body));
    }
}
