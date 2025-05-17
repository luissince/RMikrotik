package com.okta.mongodb.GeneradoScripts.model.games;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class GamesDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private String value;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private GamesGame game;
}
