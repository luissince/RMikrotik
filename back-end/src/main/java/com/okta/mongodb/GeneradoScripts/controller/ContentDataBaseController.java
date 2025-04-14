package com.okta.mongodb.GeneradoScripts.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.okta.mongodb.GeneradoScripts.model.ContentDataBase;
import com.okta.mongodb.GeneradoScripts.service.ContentDataBaseServices;

@RestController
@RequestMapping("/content-data-base")
public class ContentDataBaseController {

    @Autowired
    private ContentDataBaseServices contentDataBaseServices;

    @GetMapping
    public List<ContentDataBase> initital() {
        return contentDataBaseServices.initial();
    }

}
