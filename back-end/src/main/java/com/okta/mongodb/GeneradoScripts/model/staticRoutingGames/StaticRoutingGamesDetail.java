package com.okta.mongodb.GeneradoScripts.model.staticRoutingGames;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StaticRoutingGamesDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String value;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private StaticRoutingGamesGame game;
}
