package com.okta.mongodb.GeneradoScripts.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.okta.mongodb.GeneradoScripts.model.User;
import com.okta.mongodb.GeneradoScripts.repository.UserRepository;

@Service
public class UsuarioServices {

    @Autowired
    private UserRepository userRepository;

    public List<User> initial() {
        return userRepository.findAll();
        // return new ArrayList<User>();
    }

    public User id(long id) {
        Optional<User> response = userRepository.findById(id);
        return response.isEmpty() ? null : response.get();
    }

    public String create() {
        return "ruta para crear!";
    }

}
