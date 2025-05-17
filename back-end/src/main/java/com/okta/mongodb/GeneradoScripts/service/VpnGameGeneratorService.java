package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.constants.VpnGameGenerator;
import com.okta.mongodb.GeneradoScripts.model.games.GamesDetail;
import com.okta.mongodb.GeneradoScripts.model.games.GamesGame;
import com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator.VpnGameGeneratorBody;
import com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator.VpnGameGeneratorVpn;
import com.okta.mongodb.GeneradoScripts.repository.GamesDetailRepository;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class VpnGameGeneratorService {

        private static final Logger logger = LoggerFactory.getLogger(StaticRoutingGamesService.class);

        @Autowired
        private GamesDetailRepository staticRoutingGamesDetailRepository;

        public Map<String, String> create(VpnGameGeneratorBody body) {
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

        private String generateHtmlScript(VpnGameGeneratorBody body) {
                StringBuilder html = new StringBuilder();

                // html.append("<span></span> <br>");

                html.append("<div>");

                html.append("<span class='text-orange-400'>######################################################</span> <br>");
                html.append("<span class='text-orange-400'># Vpn Game Script Generator By buananet.com</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: "+ DateUtils.currentDate()+"</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'># VPN Protocol -> PPTP</span> <br>");
                html.append("<span class='text-orange-400'>######################################################</span> <br>");

                // /interface pptp-client o /interface sstp-client o /interface l2tp-client o
                // /interface ovpn-client
                for (VpnGameGeneratorVpn vpn : VpnGameGenerator.VPNS) {
                        if (vpn.getId().equals(body.getIdVpnConnection())) {
                                html.append("<span class='font-black'>/interface " + vpn.getName() + "-client</span> <br>");
                                html.append("<span>add connect-to=\"" + body.getVpnIpAddress()
                                                + "\" disabled=no name=\"" + body.getVpnNameOnInterface() + "\" user=\""
                                                + body.getVpnUsername() + "\" password=\"" + body.getVpnPassword()
                                                + "\" comment=\"" + body.getVpnNameOnInterface() + "\"</span> <br>");
                                break;
                        }
                }

                // /ip firewall nat
                html.append("<span class='font-black'>/ip firewall nat</span> <br>");
                html.append("<span>add chain=srcnat out-interface=\"" + body.getVpnNameOnInterface()
                                + "\" action=masquerade comment=\"" + body.getVpnNameOnInterface() + "\"</span> <br>");

                // /ip route
                html.append("<span class='font-black'>/ip route</span> <br>");
                html.append("<span>add gateway=\"" + body.getVpnNameOnInterface()
                                + "\" routing-mark=vpn-routing-game comment=\"" + body.getVpnNameOnInterface()
                                + "\"</span> <br>");

                // /ip route
                if (body.isIpGatewayIspGame()) {
                        html.append("<span class='font-black'>/ip route</span> <br>");
                        html.append("<span>add dst-address=\""+body.getVpnIpAddress()+"\" gateway=\""+body.getIpGatewayIspGameValue()+"\" comment=\""
                                        + body.getVpnNameOnInterface() + "\"</span> <br>");
                }

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

        private String generatePlainTextScript(VpnGameGeneratorBody body) {
                StringBuilder text = new StringBuilder();

                // text.append("\n");

                text.append("###################################################### \n");
                text.append("# Vpn Game Script Generator By buananet.com \n");
                text.append("# Date/Time: "+ DateUtils.currentDate()+" \n");
                text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
                text.append("# VPN Protocol -> PPTP \n");
                text.append("###################################################### \n");

                // /interface pptp-client o /interface sstp-client o /interface l2tp-client o
                // /interface ovpn-client
                for (VpnGameGeneratorVpn vpn : VpnGameGenerator.VPNS) {
                        if (vpn.getId().equals(body.getIdVpnConnection())) {
                                text.append("/interface " + vpn.getName() + "-client \n");
                                text.append("add connect-to=\"" + body.getVpnIpAddress()
                                                + "\" disabled=no name=\"" + body.getVpnNameOnInterface() + "\" user=\""
                                                + body.getVpnUsername() + "\" password=\"" + body.getVpnPassword()
                                                + "\" comment=\"" + body.getVpnNameOnInterface() + "\" \n");
                                break;
                        }
                }

                // /ip firewall nat
                text.append("/ip firewall nat \n");
                text.append("add chain=srcnat out-interface=\"" + body.getVpnNameOnInterface()
                                + "\" action=masquerade comment=\"" + body.getVpnNameOnInterface() + "\" \n");

                // /ip route
                text.append("/ip route \n");
                text.append("add gateway=\"" + body.getVpnNameOnInterface()
                                + "\" routing-mark=vpn-routing-game comment=\"" + body.getVpnNameOnInterface()
                                + "\" \n");

                // /ip route
                if (body.isIpGatewayIspGame()) {
                        text.append("/ip route \n");
                        text.append("add dst-address=\""+body.getVpnIpAddress()+"\" gateway=\""+body.getIpGatewayIspGameValue()+"\" comment=\""
                                        + body.getVpnNameOnInterface() + "\" \n");
                }

                text.append("/ip firewall mangle \n");
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
