package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikShareUserMultiLoginGenerator.MikrotikShareUserMultiLoginBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikShareUserMultiLoginService;

@RestController
@RequestMapping("/mikrotik-share-user-multi-login")
public class MikrotikShareUserMultiLogin {
     @Autowired
    private MikrotikShareUserMultiLoginService mikrotikShareUserMultiLoginService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikShareUserMultiLoginBody body) {
        return ResponseEntity.ok(mikrotikShareUserMultiLoginService.create(body));
    }
}
