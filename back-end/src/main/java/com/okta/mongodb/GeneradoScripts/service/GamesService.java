package com.okta.mongodb.GeneradoScripts.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.games.GamesCategory;
import com.okta.mongodb.GeneradoScripts.model.games.GamesGame;
import com.okta.mongodb.GeneradoScripts.repository.GamesCategoryRepository;
import com.okta.mongodb.GeneradoScripts.repository.GamesGameRepository;

@Service
public class GamesService {

        @Autowired
        private GamesCategoryRepository staticRoutingGamesCategoryRepository;

        @Autowired
        private GamesGameRepository staticRoutingGamesGameRepository;

        public Map<String, Object> getCategoriesWithGames() {
                List<GamesCategory> categories = staticRoutingGamesCategoryRepository.findAll();
                List<GamesGame> games = staticRoutingGamesGameRepository.findAll();
                // List<StaticRoutingGamesDetail> details =
                // staticRoutingGamesDetailRepository.findAll();

                List<Map<String, Object>> categoryList = new ArrayList<>();

                for (GamesCategory category : categories) {
                        Map<String, Object> categoryMap = new HashMap<>();
                        categoryMap.put("name", category.getName());

                        // Filtrar los juegos que pertenecen a esta categoría
                        List<Map<String, Object>> gameList = new ArrayList<>();
                        for (GamesGame game : games) {
                                if (game.getCategory().getId().equals(category.getId())) {
                                        Map<String, Object> gameMap = new HashMap<>();
                                        gameMap.put("id", game.getId());
                                        gameMap.put("name", game.getName());
                                        gameList.add(gameMap);

                                        // // Filtrar los detalles de este juego
                                        // List<Map<String, Object>> detailList = new ArrayList<>();
                                        // for (StaticRoutingGamesDetail detail : details) {
                                        // if (detail.getGame().getId().equals(game.getId())) {
                                        // Map<String, Object> detailMap = new HashMap<>();
                                        // detailMap.put("value", detail.getValue());
                                        // detailList.add(detailMap);
                                        // }
                                        // }
                                        // gameMap.put("details", detailList);
                                }
                        }

                        categoryMap.put("games", gameList);
                        categoryList.add(categoryMap);
                }

                Map<String, Object> response = new HashMap<>();
                response.put("categories", categoryList);

                return response;
        }

}