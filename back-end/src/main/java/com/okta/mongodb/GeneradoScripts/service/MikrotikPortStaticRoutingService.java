package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.constants.MikrotikPortStaticRouting;
import com.okta.mongodb.GeneradoScripts.model.mikrotikPortStaticRouting.MikrotikPortStaticRoutingBody;
import com.okta.mongodb.GeneradoScripts.model.mikrotikPortStaticRouting.MikrotikPortStaticRoutingFirewall;

public class MikrotikPortStaticRoutingService {

        private static final Logger logger = LoggerFactory.getLogger(MikrotikPortStaticRoutingService.class);

        public Map<String, String> create(MikrotikPortStaticRoutingBody body) {
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

        private String generateHtmlScript(MikrotikPortStaticRoutingBody body) {
                StringBuilder html = new StringBuilder();

                // html.append("<span></span> <br>");

                html.append("<span>/ip firewall address-list add address=192.168.0.0/16 list=LOCAL-IP</span> <br>");
                html.append("<span>/ip firewall address-list add address=172.16.0.0/12 list=LOCAL-IP</span> <br>");
                html.append("<span>/ip firewall address-list add address=10.0.0.0/8 list=LOCAL-IP</span> <br>");

                if (body.getIdRouterOsVersion() == MikrotikPortStaticRouting.OS_VERSIONS.get(1).getId()) {
                        html.append("<span>/routing table add name=\"" + body.getRoutingMarkTable()
                                        + "\" fib comment=\"" + body.getRoutingMarkTable()
                                        + " - Port Static Routing by buananet.com\"</span> <br>");
                }

                html.append("<span>/ip route add check-gateway=ping distance=1 gateway=\"" + body.getIpGatewayIspVpn()
                                + "\" routing-mark=\"" + body.getRoutingMarkTable()
                                + "\" comment=\" - Port Static Routing by buananet.com\"</span> <br>");

                if (body.getIdRoutingOption() == MikrotikPortStaticRouting.OPTIONS.get(1).getId()
                                && body.getIdRouterOsVersion() == MikrotikPortStaticRouting.OPTIONS.get(2).getId()) {
                        html.append("<span>/ip firewall mangle add action=mark-routing chain=prerouting dst-address-list=\""
                                        + body.getRoutingMarkTable() + "-list\" new-routing-mark=\""
                                        + body.getRoutingMarkTable()
                                        + "\" passthrough=no src-address-list=LOCAL-IP comment=\""
                                        + body.getRoutingMarkTable()
                                        + " - Port Static Routing by buananet.com\"</span> <br>");
                }

                for (MikrotikPortStaticRoutingFirewall firewall : body.getFirewalls()) {
                        if (body.getIdRoutingOption() == MikrotikPortStaticRouting.OPTIONS.get(1).getId()) {
                                html.append("<span>/ip firewall raw add action=add-dst-to-address-list address-list=\""
                                                + body.getRoutingMarkTable()
                                                + "-list\" chain=prerouting src-address-list=LOCAL-IP dst-address-list=!LOCAL-IP protocol="
                                                + firewall.getIdProtocol() + " dst-port=\"" + firewall.getTargetPort()
                                                + "\" comment=\"" + firewall.getDescription()
                                                + " - Port Static Routing by buananet.com\"</span> <br>");

                        }

                        if (body.getIdRouterOsVersion() == MikrotikPortStaticRouting.OPTIONS.get(2).getId()) {
                                html.append("<span>/ip firewall filter add action=add-dst-to-address-list address-list=\""
                                                + body.getRoutingMarkTable()
                                                + "-list\" chain=forward src-address-list=LOCAL-IP dst-address-list=!LOCAL-IP protocol="
                                                + firewall.getIdProtocol() + " dst-port=\"" + firewall.getTargetPort()
                                                + "\" comment=\"" + firewall.getDescription()
                                                + " - Port Static Routing by buananet.com\"</span> <br>");
                        }
                }

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(MikrotikPortStaticRoutingBody body) {
                StringBuilder text = new StringBuilder();

                // text.append(" \n");

                text.append("/ip firewall address-list add address=192.168.0.0/16 list=LOCAL-IP \n");
                text.append("/ip firewall address-list add address=172.16.0.0/12 list=LOCAL-IP \n");
                text.append("/ip firewall address-list add address=10.0.0.0/8 list=LOCAL-IP \n");

                if (body.getIdRouterOsVersion() == MikrotikPortStaticRouting.OS_VERSIONS.get(1).getId()) {
                        text.append("/routing table add name=\"" + body.getRoutingMarkTable() + "\" fib comment=\""
                                        + body.getRoutingMarkTable() + " - Port Static Routing by buananet.com\" \n");
                }

                text.append("/ip route add check-gateway=ping distance=1 gateway=\"" + body.getIpGatewayIspVpn()
                                + "\" routing-mark=\"" + body.getRoutingMarkTable()
                                + "\" comment=\" - Port Static Routing by buananet.com\" \n");

                if (body.getIdRoutingOption() == MikrotikPortStaticRouting.OPTIONS.get(1).getId()
                                && body.getIdRouterOsVersion() == MikrotikPortStaticRouting.OPTIONS.get(2).getId()) {
                        text.append("/ip firewall mangle add action=mark-routing chain=prerouting dst-address-list=\""
                                        + body.getRoutingMarkTable() + "-list\" new-routing-mark=\""
                                        + body.getRoutingMarkTable()
                                        + "\" passthrough=no src-address-list=LOCAL-IP comment=\""
                                        + body.getRoutingMarkTable() + " - Port Static Routing by buananet.com\" \n");
                }

                for (MikrotikPortStaticRoutingFirewall firewall : body.getFirewalls()) {
                        if (body.getIdRoutingOption() == MikrotikPortStaticRouting.OPTIONS.get(1).getId()) {
                                text.append("/ip firewall raw add action=add-dst-to-address-list address-list=\""
                                                + body.getRoutingMarkTable()
                                                + "-list\" chain=prerouting src-address-list=LOCAL-IP dst-address-list=!LOCAL-IP protocol="
                                                + firewall.getIdProtocol() + " dst-port=\"" + firewall.getTargetPort()
                                                + "\" comment=\"" + firewall.getDescription()
                                                + " - Port Static Routing by buananet.com\" \n");

                        }

                        if (body.getIdRouterOsVersion() == MikrotikPortStaticRouting.OPTIONS.get(2).getId()) {
                                text.append("/ip firewall filter add action=add-dst-to-address-list address-list=\""
                                                + body.getRoutingMarkTable()
                                                + "-list\" chain=forward src-address-list=LOCAL-IP dst-address-list=!LOCAL-IP protocol="
                                                + firewall.getIdProtocol() + " dst-port=\"" + firewall.getTargetPort()
                                                + "\" comment=\"" + firewall.getDescription()
                                                + " - Port Static Routing by buananet.com\" \n");
                        }
                }

                return text.toString();
        }

}
