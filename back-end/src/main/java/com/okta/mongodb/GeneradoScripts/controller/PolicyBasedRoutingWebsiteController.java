package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.policyBasedRoutingWebsite.PolicyBasedRoutingWebsiteBody;
import com.okta.mongodb.GeneradoScripts.service.PolicyBasedRoutingWebsiteService;

@RestController
@RequestMapping("/policy-based-routing-website")
public class PolicyBasedRoutingWebsiteController {

    @Autowired
    private PolicyBasedRoutingWebsiteService policyBasedRoutingWebsiteService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody PolicyBasedRoutingWebsiteBody body) {
        return ResponseEntity.ok(policyBasedRoutingWebsiteService.create(body));
    }

}
