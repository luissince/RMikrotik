package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.staticRoutingGamesManglePort.StaticRoutingGamesManglePortBody;
import com.okta.mongodb.GeneradoScripts.service.StaticRoutingGamesManglePortService;

@RestController
@RequestMapping("/static-routing-games-mangle-port")
public class StaticRoutingGamesManglePortController {
    
    @Autowired
    private StaticRoutingGamesManglePortService staticRoutingGamesManglePortService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody StaticRoutingGamesManglePortBody staticRoutingGamesBody) {
        return ResponseEntity.ok(staticRoutingGamesManglePortService.create(staticRoutingGamesBody));
    }
    
}
