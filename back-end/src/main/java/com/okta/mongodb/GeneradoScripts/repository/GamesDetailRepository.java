package com.okta.mongodb.GeneradoScripts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.okta.mongodb.GeneradoScripts.model.games.GamesDetail;

@RepositoryRestResource(exported = false)
public interface GamesDetailRepository extends JpaRepository<GamesDetail, Long> {

    List<GamesDetail> findByGameId(String gameId);    
    
}
