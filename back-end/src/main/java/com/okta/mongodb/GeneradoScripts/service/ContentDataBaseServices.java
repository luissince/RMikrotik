package com.okta.mongodb.GeneradoScripts.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.okta.mongodb.GeneradoScripts.model.ContentDataBase;
import com.okta.mongodb.GeneradoScripts.repository.ContentDataBaseRepository;

@Service
public class ContentDataBaseServices {

    @Autowired
    private ContentDataBaseRepository contentDataBaseRepository;

    public List<ContentDataBase> initial() {
        return contentDataBaseRepository.findAll();
    }

}
