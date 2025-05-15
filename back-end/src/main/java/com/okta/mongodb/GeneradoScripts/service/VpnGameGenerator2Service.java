package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.games.GamesDetail;
import com.okta.mongodb.GeneradoScripts.model.games.GamesGame;
import com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator2.VpnGameGenerator2Body;
import com.okta.mongodb.GeneradoScripts.repository.GamesDetailRepository;

@Service
public class VpnGameGenerator2Service {

        private static final Logger logger = LoggerFactory.getLogger(VpnGameGenerator2Service.class);

        @Autowired
        private GamesDetailRepository staticRoutingGamesDetailRepository;

        public Map<String, String> create(VpnGameGenerator2Body body) {
                logger.info("Body recibido: {}", body);

                // Generar ambas versiones del script
                String htmlScript = generateHtmlScript(body);
                String plainTextScript = generatePlainTextScript(body);

                // Crear respuesta con ambos formatos
                Map<String, String> response = new HashMap<>();
                response.put("html", htmlScript);
                response.put("text", plainTextScript);

                return response;
        }

        private String generateHtmlScript(VpnGameGenerator2Body body) {
                StringBuilder html = new StringBuilder();

                // html.append("<span></span> <br>");

                html.append("<div>");

                html.append("<span> /ip firewall raw</span> <br>");
                for (GamesGame game : body.getGames()) {
                        List<GamesDetail> details = staticRoutingGamesDetailRepository
                                        .findByGameId(game.getId());
                        html.append("<span style='color:orange;'>" + game.getName() + "</span> <br>");
                        for (GamesDetail detail : details) {
                                html.append("<span>" + detail.getValue() + "</span> <br>");
                        }
                }

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(VpnGameGenerator2Body body) {
                StringBuilder text = new StringBuilder();

                // text.append("\n");

                text.append("/ip firewall raw \n");
                for (GamesGame game : body.getGames()) {
                        List<GamesDetail> details = staticRoutingGamesDetailRepository
                                        .findByGameId(game.getId());
                        text.append(game.getName() + "\n");
                        for (GamesDetail detail : details) {
                                text.append(detail.getValue() + " \n");
                        }
                }

                return text.toString();
        }

}
