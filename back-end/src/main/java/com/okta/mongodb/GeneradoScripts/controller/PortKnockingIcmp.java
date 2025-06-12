package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.portKnockingIcmp.PortKnockingIcmpBody;

import com.okta.mongodb.GeneradoScripts.service.PortKnockingIcmpService;


@RestController
@RequestMapping("/port-knocking-icmp")
public class PortKnockingIcmp {
        @Autowired
    private PortKnockingIcmpService portKnockingIcmpService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody PortKnockingIcmpBody body) {
        return ResponseEntity.ok(portKnockingIcmpService.create(body));
    }
}
