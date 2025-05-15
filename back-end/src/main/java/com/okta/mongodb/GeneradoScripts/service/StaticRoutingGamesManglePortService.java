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
import com.okta.mongodb.GeneradoScripts.model.staticRoutingGamesManglePort.StaticRoutingGamesManglePortBody;
import com.okta.mongodb.GeneradoScripts.repository.GamesDetailRepository;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class StaticRoutingGamesManglePortService {

        private static final Logger logger = LoggerFactory.getLogger(StaticRoutingGamesManglePortService.class);

        @Autowired
        private GamesDetailRepository staticRoutingGamesDetailRepository;

        public Map<String, String> create(StaticRoutingGamesManglePortBody body) {
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

        private String generateHtmlScript(StaticRoutingGamesManglePortBody body) {
                StringBuilder html = new StringBuilder();
                html.append("<div>");
                // html.append("<span></span> <br>");

                html.append("<span class='text-orange-400'>###################################################################</span> <br>");
                html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'>###################################################################</span> <br>");

                // /ip firewall address-list
                html.append("<span class='font-black'>/ip firewall address-list</span> <br>");
                html.append("<span>add list=LOCAL-IP address=10.0.0.0/8 comment=\"Routing Games by buananet.com\"</span> <br>");
                html.append("<span>add list=LOCAL-IP address=172.16.0.0/12 comment=\"Routing Games by buananet.com\"</span> <br>");
                html.append("<span>add list=LOCAL-IP address=192.168.0.0/16 comment=\"Routing Games by buananet.com\"</span> <br>");

                // /ip route
                html.append("<span class='font-black'>/ip route</span> <br>");
                html.append("<span>add gateway=x.x.x.x routing-mark=routing-game comment=\"Routing Games by buananet.com\"</span> <br>");
                html.append("<span class='text-green-500'>##############################################################</span> <br>");
                html.append("<span class='text-green-500'># If you want to add a game script only, you can ignore the script above</span> <br>");
                html.append("<span class='text-green-500'>##############################################################</span> <br>");

                // /ip firewall mangle
                html.append("<span class='font-black'>/ip firewall mangle</span> <br>");
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

        private String generatePlainTextScript(StaticRoutingGamesManglePortBody body) {
                StringBuilder text = new StringBuilder();

                // text.append(" \n");
                text.append("################################################################### \n");
                text.append("# Static Routing Games Using Mangle port Generator By buananet.com \n");
                text.append("# Date/Time: " + DateUtils.currentDate() + "\n");
                text.append(" # Created By: buananet.com - fb.me/buananet.pbun \n");
                text.append("################################################################### \n");

                // /ip firewall address-list
                text.append("/ip firewall address-list \n");
                text.append("add list=LOCAL-IP address=10.0.0.0/8 comment=\"Routing Games by buananet.com\" \n");
                text.append("add list=LOCAL-IP address=172.16.0.0/12 comment=\"Routing Games by buananet.com\" \n");
                text.append("add list=LOCAL-IP address=192.168.0.0/16 comment=\"Routing Games by buananet.com\" \n");

                // /ip route
                text.append("/ip route \n");
                text.append("add gateway=x.x.x.x routing-mark=routing-game comment=\"Routing Games by buananet.com\" \n");
                text.append("############################################################## \n");
                text.append("# If you want to add a game script only, you can ignore the script above \n");
                text.append("############################################################## \n");

                // /ip firewall mangle
                text.append(" /ip firewall mangle \n");
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