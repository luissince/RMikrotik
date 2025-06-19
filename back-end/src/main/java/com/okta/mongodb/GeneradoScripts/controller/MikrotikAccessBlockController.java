package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikAccessBlock.MikrotikAccessBlockBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikAccessBlockService;



@RestController
@RequestMapping("/mikrotik-access-block")
public class MikrotikAccessBlockController {
        @Autowired
    private MikrotikAccessBlockService mikrotikAccessBlockService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikAccessBlockBody body) {
        return ResponseEntity.ok(mikrotikAccessBlockService.create(body));
    }
}
