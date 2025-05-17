package com.okta.mongodb.GeneradoScripts.model.games;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class GamesCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String name; 

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<GamesGame> games;
    
}
