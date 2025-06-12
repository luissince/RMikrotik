package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.wifidWmsSeamless.WifidWmsSeamlessBody;

import com.okta.mongodb.GeneradoScripts.service.WifidWmsSeamlessService;


@RestController
@RequestMapping("/wifid-wms-seamless")
public class WifidWmsSeamlessController {
            @Autowired
    private WifidWmsSeamlessService wifidWmsSeamlessService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody WifidWmsSeamlessBody body) {
        return ResponseEntity.ok(wifidWmsSeamlessService.create(body));
    }
}
