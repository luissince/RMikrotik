package com.okta.mongodb.GeneradoScripts.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.okta.mongodb.GeneradoScripts.model.user.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByProviderId(String providerId);
}
