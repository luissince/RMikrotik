package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikBurstLimitCalculator.MikrotikBurstLimitCalculatorBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikBurstLimitCalculatorService;


@RestController
@RequestMapping("/mikrotik-burst-limit-calculator")
public class MikrotikBurstLimitCalculatorController {

    @Autowired
    private MikrotikBurstLimitCalculatorService mikrotikBurstLimitCalculatorService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody MikrotikBurstLimitCalculatorBody mikrotikBackupToMailBody) {
        return ResponseEntity.ok(mikrotikBurstLimitCalculatorService.create(mikrotikBackupToMailBody));
    }

}
