package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.okta.mongodb.GeneradoScripts.model.mikrotikBlockSharingHotspot.MikrotikBlockSharingHotspotBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikBlockSharingHotspotService;


@RestController
@RequestMapping("/mikrotik-block-sharing-hotspot")
public class MikrotikBlockSharingHotspotController {
    

  @Autowired
    private MikrotikBlockSharingHotspotService mikrotikBlockSharingHotspotService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikBlockSharingHotspotBody body) {
        return ResponseEntity.ok(mikrotikBlockSharingHotspotService.create(body));
    }

}
