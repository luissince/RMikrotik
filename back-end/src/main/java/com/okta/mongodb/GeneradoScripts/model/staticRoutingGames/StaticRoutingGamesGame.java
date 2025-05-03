package com.okta.mongodb.GeneradoScripts.model.staticRoutingGames;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class StaticRoutingGamesGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private StaticRoutingGamesCategory category;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<StaticRoutingGamesDetail> details;
    
}
