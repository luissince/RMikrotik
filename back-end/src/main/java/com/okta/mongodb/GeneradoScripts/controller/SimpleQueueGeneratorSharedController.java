package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.okta.mongodb.GeneradoScripts.model.simpleQueueGeneratorShared.SimpleQueueGeneratorSharedBody;
import com.okta.mongodb.GeneradoScripts.service.SimpleQueueGeneratorSharedService;

@RestController
@RequestMapping("/simple-queue-generator-shared")
public class SimpleQueueGeneratorSharedController {

     @Autowired
    private SimpleQueueGeneratorSharedService simpleQueueGeneratorService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody SimpleQueueGeneratorSharedBody body) {
        return ResponseEntity.ok(simpleQueueGeneratorService.create(body));
    }

    
}
