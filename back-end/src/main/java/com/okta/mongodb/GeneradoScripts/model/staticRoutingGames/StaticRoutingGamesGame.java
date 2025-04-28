package com.okta.mongodb.GeneradoScripts.model.staticRoutingGames;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class StaticRoutingGamesGame {

    @Id
    private String id; // Viene del JSON como "id"
    
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private StaticRoutingGamesCategory category;
    
}
