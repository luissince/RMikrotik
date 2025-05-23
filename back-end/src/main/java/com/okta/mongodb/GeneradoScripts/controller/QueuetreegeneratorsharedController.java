package com.okta.mongodb.GeneradoScripts.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.ecmp.EcmpBody;
import com.okta.mongodb.GeneradoScripts.service.EcmpService;

@RestController
@RequestMapping("/queue-tree-generator-shared")
public class QueueTreeGeneratorSharedController {

    @Autowired
    private EcmpService ecmpService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody EcmpBody ecmpBody) {
        return ResponseEntity.ok(ecmpService.create(ecmpBody));
    }
}
