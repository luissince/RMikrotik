package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.constants.StaticRoutingGames;
import com.okta.mongodb.GeneradoScripts.model.games.GamesDetail;
import com.okta.mongodb.GeneradoScripts.model.games.GamesGame;
import com.okta.mongodb.GeneradoScripts.model.staticRoutingGames.StaticRoutingGamesBody;
import com.okta.mongodb.GeneradoScripts.repository.GamesDetailRepository;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class StaticRoutingGamesService {

        private static final Logger logger = LoggerFactory.getLogger(StaticRoutingGamesService.class);

        @Autowired
        private GamesDetailRepository staticRoutingGamesDetailRepository;

        public Map<String, String> create(StaticRoutingGamesBody body) {
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

        private String generateHtmlScript(StaticRoutingGamesBody body) {
                StringBuilder html = new StringBuilder();

                html.append("<div>");
                html.append("<span>#########################################################/span> <br>");
                html.append("<span style='color:blue;'># Static Routing Games Using Filter Raw Generator - Buananet.com</span> <br>");
                html.append("<span style='color:green;'># Date/Time:</span> <span style='color:red;'>"
                                + DateUtils.currentDate() + "</span> <br>");
                html.append("<span style='color:green;'># Created By:</span> <span style='color:red;'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span>#########################################################</span> <br>");

                html.append("<span>/ip firewall address-list</span> <br>");
                html.append("<span>add list=LOCAL-IP address=10.0.0.0/8 comment=\"Routing Games by buananet.com\"</span> <br>");
                html.append("<span>add list=LOCAL-IP address=172.16.0.0/12 comment=\"Routing Games by buananet.com\"</span> <br>");
                html.append("<span>add list=LOCAL-IP address=192.168.0.0/16 comment=\"Routing Games by buananet.com\"</span> <br>");

                if (body.getIdRouterOsVersion().equalsIgnoreCase(StaticRoutingGames.ROS7)) {
                        html.append("<span>/routing table</span> <br>");
                        html.append("<span> add name=routing-game fib comment=\"Routing Games by buananet.com\"</span> <br>");
                }

                html.append("<span>/ip route</span> <br>");
                html.append("<span>add gateway=192.168.1.2 routing-mark=routing-game comment=\"Routing Games by buananet.com\"</span> <br>");

                html.append("<span>/ip firewall mangle</span> <br>");
                html.append("<span>add action=mark-routing chain=prerouting connection-mark=conn-game new-routing-mark=routing-game passthrough=no src-address-list=LOCAL-IP comment=\"Routing Games by buananet.com\" place-before=*0</span> <br>");
                html.append("<span>add action=mark-connection chain=prerouting dst-address-list=List-IP-Games new-connection-mark=conn-game passthrough=yes comment=\"Routing Games by buananet.com\" place-before=*0</span> <br>");

                html.append("<span style='color:green;'>##############################################################</span> <br>");
                html.append("<span style='color:green;'># If you want to add a game script only, you can ignore the script above</span> <br>");
                html.append("<span style='color:green;'>##############################################################</span> <br>");

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

        private String generatePlainTextScript(StaticRoutingGamesBody body) {
                StringBuilder text = new StringBuilder();

                text.append("######################################################### \n");
                text.append("# Static Routing Games Using Filter Raw Generator - Buananet.com \n");
                text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
                text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
                text.append("######################################################### \n");

                text.append("/ip firewall address-list \n");
                text.append("add list=LOCAL-IP address=10.0.0.0/8 comment=\"Routing Games by buananet.com\" \n");
                text.append("add list=LOCAL-IP address=172.16.0.0/12 comment=\"Routing Games by buananet.com\" \n");
                text.append("add list=LOCAL-IP address=192.168.0.0/16 comment=\"Routing Games by buananet.com\" \n");

                if (body.getIdRouterOsVersion().equalsIgnoreCase(StaticRoutingGames.ROS7)) {
                        text.append("/routing table \n");
                        text.append("add name=routing-game fib comment=\"Routing Games by buananet.com\" \n");
                }

                text.append("/ip route \n");
                text.append("add gateway=192.168.1.2 routing-mark=routing-game comment=\"Routing Games by buananet.com\" \n");

                text.append("/ip firewall mangle \n");
                text.append("add action=mark-routing chain=prerouting connection-mark=conn-game new-routing-mark=routing-game passthrough=no src-address-list=LOCAL-IP comment=\"Routing Games by buananet.com\" place-before=*0 \n");
                text.append("add action=mark-connection chain=prerouting dst-address-list=List-IP-Games new-connection-mark=conn-game passthrough=yes comment=\"Routing Games by buananet.com\" place-before=*0 \n");

                text.append("############################################################## \n");
                text.append("# If you want to add a game script only, you can ignore the script above \n");
                text.append("############################################################## \n");

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