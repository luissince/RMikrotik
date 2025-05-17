package com.okta.mongodb.GeneradoScripts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.okta.mongodb.GeneradoScripts.model.games.GamesGame;

@RepositoryRestResource(exported = false)
public interface GamesGameRepository extends JpaRepository<GamesGame, String> {
    
    
}
