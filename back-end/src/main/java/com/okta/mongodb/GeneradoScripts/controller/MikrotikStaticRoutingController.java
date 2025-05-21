package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikStaticRouting.MikrotikStaticRoutingBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikStaticRoutingService;

@RestController
@RequestMapping("/mikrotik-static-routing")
public class MikrotikStaticRoutingController {

    @Autowired
    private MikrotikStaticRoutingService mikrotikStaticRoutingService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikStaticRoutingBody body) {
        return ResponseEntity.ok(mikrotikStaticRoutingService.create(body));
    }

}
