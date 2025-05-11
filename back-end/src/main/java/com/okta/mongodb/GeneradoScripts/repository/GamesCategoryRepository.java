package com.okta.mongodb.GeneradoScripts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.okta.mongodb.GeneradoScripts.model.games.GamesCategory;

@RepositoryRestResource(exported = false)
public interface GamesCategoryRepository extends JpaRepository<GamesCategory, Long>{
    
    
}
