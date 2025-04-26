package com.okta.mongodb.GeneradoScripts.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikHideMyRouterFromIsp.MikrotikHideMyRouterFromIspBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikHideMyRouterFromIspService;


@RestController
@RequestMapping("/mikrotik-hide-my-router-from-isp")
public class MikrotikHideMyRouterFromIspController {

    @Autowired
    private MikrotikHideMyRouterFromIspService mikrotikHideMyRouterFromIspService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikHideMyRouterFromIspBody body) {
        return ResponseEntity.ok(mikrotikHideMyRouterFromIspService.create(body));
    }

}
