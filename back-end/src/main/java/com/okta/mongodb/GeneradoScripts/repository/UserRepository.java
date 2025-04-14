package com.okta.mongodb.GeneradoScripts.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.okta.mongodb.GeneradoScripts.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}