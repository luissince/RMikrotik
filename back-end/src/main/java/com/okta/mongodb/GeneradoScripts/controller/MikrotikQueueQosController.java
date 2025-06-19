package com.okta.mongodb.GeneradoScripts.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikQueueQos.QueueQosServiceBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikQueueQosService;

@RestController
@RequestMapping("/mikrotik-queue-qos")
public class MikrotikQueueQosController {

  @Autowired
    private MikrotikQueueQosService mikrotikQueueQosService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody QueueQosServiceBody body) {
        return ResponseEntity.ok(mikrotikQueueQosService.create(body));
    }


    
}
