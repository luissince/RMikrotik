package com.okta.mongodb.GeneradoScripts.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.okta.mongodb.GeneradoScripts.model.staticRoutingGames.StaticRoutingGamesDetail;

@RepositoryRestResource(exported = false)
public interface StaticRoutingGamesDetailRepository extends JpaRepository<StaticRoutingGamesDetail, Long> {

    List<StaticRoutingGamesDetail> findByGameId(String gameId);    
    
}
