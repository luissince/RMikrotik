package com.okta.mongodb.GeneradoScripts.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.mikrotikBackupToMail.MikrotikBackupToMailBody;
import com.okta.mongodb.GeneradoScripts.service.MikrotikBackupToMailService;


@RestController
@RequestMapping("/mikrotik-backup-to-mail")
public class MikrotikBackupToMailController {

     @Autowired
    private MikrotikBackupToMailService mikrotikBackupToMailService;

    @PostMapping
    public ResponseEntity<Map<String, String>> create(@RequestBody MikrotikBackupToMailBody mikrotikBackupToMailBody) {
        return ResponseEntity.ok(mikrotikBackupToMailService.create(mikrotikBackupToMailBody));
    }

}
