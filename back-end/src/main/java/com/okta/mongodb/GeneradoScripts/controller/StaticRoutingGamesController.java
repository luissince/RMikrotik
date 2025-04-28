package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.staticRoutingGames.StaticRoutingGamesBody;
import com.okta.mongodb.GeneradoScripts.service.StaticRoutingGamesService;

@RestController
@RequestMapping("/static-routing-games")
public class StaticRoutingGamesController {

    @Autowired
    private StaticRoutingGamesService staticRoutingGamesService;

    @GetMapping()
    public ResponseEntity<Map<String, Object>> getCategories() {
        return ResponseEntity.ok(staticRoutingGamesService.getCategoriesWithGames());
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody StaticRoutingGamesBody staticRoutingGamesBody) {
        return ResponseEntity.ok(staticRoutingGamesService.create(staticRoutingGamesBody));
    }

}
