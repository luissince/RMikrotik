package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikNetwatchMonitoring.mikrotikNetwatchMonitoringBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikNetwatchMonitoringService;

@RestController
@RequestMapping("/mikrotik-netwatch-monitoring")
public class MikrotikNetwatchMonitoringController {
    
    @Autowired
    private MikrotikNetwatchMonitoringService mikrotikNetwatchMonitoringService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody mikrotikNetwatchMonitoringBody body) {
        return ResponseEntity.ok(mikrotikNetwatchMonitoringService.create(body));
    }
}
