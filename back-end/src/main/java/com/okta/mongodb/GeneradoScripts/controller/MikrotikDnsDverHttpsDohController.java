package com.okta.mongodb.GeneradoScripts.controller;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.okta.mongodb.GeneradoScripts.model.mikrotikDnsDverHttpsDoh.MikrotikDnsDverHttpsDohBody;
import com.okta.mongodb.GeneradoScripts.model.mikrotikDnsDverHttpsDoh.MikrotikDnsDverHttpsDohDnsOption;
import com.okta.mongodb.GeneradoScripts.service.MikrotikDnsDverHttpsDohService;
@RestController
@RequestMapping("/mikrotik-dns-over-https-doh")
public class MikrotikDnsDverHttpsDohController {
    
    @Autowired
    private MikrotikDnsDverHttpsDohService mikrotikDnsDverHttpsDohService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody MikrotikDnsDverHttpsDohBody body) {
        return ResponseEntity.ok(mikrotikDnsDverHttpsDohService.create(body));
    }  

    @GetMapping
    public List<MikrotikDnsDverHttpsDohDnsOption> list() {
        return mikrotikDnsDverHttpsDohService.list();
    } 
}
