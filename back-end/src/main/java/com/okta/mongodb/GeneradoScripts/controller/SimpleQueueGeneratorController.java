package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.simpleQueueGenerator.SimpleQueueGeneratorBody;
import com.okta.mongodb.GeneradoScripts.service.SimpleQueueGeneratorService;

@RestController
@RequestMapping("/simple-queue-generator")
public class SimpleQueueGeneratorController {

    @Autowired
    private SimpleQueueGeneratorService simpleQueueGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody SimpleQueueGeneratorBody body) {
        return ResponseEntity.ok(simpleQueueGeneratorService.create(body));
    }

}
