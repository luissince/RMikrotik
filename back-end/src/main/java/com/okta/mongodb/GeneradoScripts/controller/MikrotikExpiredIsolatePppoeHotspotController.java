package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikExpiredIsolatePppoeHotspot.MikrotikExpiredIsolatePppoeHotspotBody;

import com.okta.mongodb.GeneradoScripts.service.MikrotikExpiredIsolatePppoeHotspotService;


@RestController
@RequestMapping("/mikrotik-expired-isolate-pppoe-hotspot")
public class MikrotikExpiredIsolatePppoeHotspotController {
   @Autowired
    private MikrotikExpiredIsolatePppoeHotspotService mikrotikExpiredIsolatePppoeHotspotService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikExpiredIsolatePppoeHotspotBody body) {
        return ResponseEntity.ok(mikrotikExpiredIsolatePppoeHotspotService.create(body));
    }  
}
