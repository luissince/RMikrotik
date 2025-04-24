package com.okta.mongodb.GeneradoScripts.controller;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.okta.mongodb.GeneradoScripts.model.body.pcc.PccBody;
import com.okta.mongodb.GeneradoScripts.service.PccService;

@RestController
@RequestMapping("/pcc")
public class PccController {

    @Autowired
    private PccService userService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody PccBody pccBody) {
        return ResponseEntity.ok(userService.create(pccBody));
    }
}
