package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikPortStaticRouting.MikrotikPortStaticRoutingBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikPortStaticRoutingService;

@RestController
@RequestMapping("/mikrotik-port-static-routing")
public class MikrotikPortStaticRoutingController {

    @Autowired
    private MikrotikPortStaticRoutingService mikrotikPortStaticRoutingService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikPortStaticRoutingBody body) {
        return ResponseEntity.ok(mikrotikPortStaticRoutingService.create(body));
    }

}
