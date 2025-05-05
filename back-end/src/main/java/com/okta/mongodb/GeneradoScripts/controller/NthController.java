package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.nth.NthBody;
import com.okta.mongodb.GeneradoScripts.service.NthService;

@RestController
@RequestMapping("/nth")
public class NthController {

    @Autowired
    private NthService nthService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody NthBody nthBody) {
        return ResponseEntity.ok(nthService.create(nthBody));
    }
    
}
