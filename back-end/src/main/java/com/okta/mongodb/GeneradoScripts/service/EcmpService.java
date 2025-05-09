package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.ecmp.EcmpBody;
import com.okta.mongodb.GeneradoScripts.model.ecmp.EcmpInterfaces;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class EcmpService {

        private static final Logger logger = LoggerFactory.getLogger(EcmpService.class);

        public Map<String, String> create(EcmpBody body) {
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

        private String generateHtmlScript(EcmpBody pccBody) {
                StringBuilder html = new StringBuilder();
                html.append("<div>");

                html.append("<span class='text-orange-400'>###############################################################</span> <br>");
                html.append("<span class='text-orange-400'># Load Balancing ECMP (Equal Cost Multi Path) / LB ECMP Script Generator</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created by: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'># Load Balancing Method: ECMP (Equal Cost Multi Path)</span> <br>");
                html.append("<span class='text-orange-400'>###############################################################</span> <br>");

                // /ip firewall address-list
                html.append("<span class='font-black'>/ip firewall address-list</span> <br>");
                html.append("<span>add address=192.168.0.0/16 list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");
                html.append("<span>add address=172.16.0.0/12 list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");
                html.append("<span>add address=10.0.0.0/8 list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");

                // /ip firewall nat
                html.append("<span class='font-black'>/ip firewall nat</span> <br>");
                for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                        html.append("<span>add chain=srcnat out-interface=\"" + ecmpInterfaces.getWanIsp()
                                        + "\" action=masquerade comment=\"LB ECMP by buananet.com\"</span> <br>");
                }

                if (pccBody.getIdRouterOsVersion().equalsIgnoreCase("ros6")) {

                        // /ip route
                        html.append("<span class='font-black'>/ip route</span> <br>");
                        html.append("<span>add check-gateway=ping distance=1 ");
                        String gateways = "";
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                gateways += ecmpInterfaces.getGatewayIsp() + ",";
                        }
                        html.append("gateway=\"" + gateways + "\" comment=\"LB ECMP by buananet.com\"</span> <br>");

                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                html.append("<span>add check-gateway=ping distance=1 gateway=\""
                                                + ecmpInterfaces.getGatewayIsp() + "\" routing-mark=\"to-"
                                                + ecmpInterfaces.getWanIsp()
                                                + "\" comment=\"LB ECMP by buananet.com\"</span> <br>");
                        }

                }

                if (pccBody.getIdRouterOsVersion().equalsIgnoreCase("ros7")) {
                        // /routing table
                        html.append("<span class='font-black'>/routing table</span> <br>");
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                html.append("<span>add name=\"to-" + ecmpInterfaces.getWanIsp()
                                                + "\" fib comment=\"LB ECMP by buananet.com\"</span> <br>");
                        }

                        // /ip route
                        html.append("<span class='font-black'>/ip route</span> <br>");
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                html.append("<span>add check-gateway=ping distance=1 gateway=\""
                                                + ecmpInterfaces.getGatewayIsp()
                                                + "\" routing-table=\"main\" comment=\"LB ECMP by buananet.com\"</span> <br>");
                        }
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                html.append("<span>add check-gateway=ping distance=1 gateway=\""
                                                + ecmpInterfaces.getGatewayIsp() + "\" routing-table=\"to-"
                                                + ecmpInterfaces.getWanIsp()
                                                + "\" comment=\"LB ECMP by buananet.com\"</span> <br>");
                        }
                }

                // /ip firewall mangle
                html.append("<span class='font-black'>/ip firewall mangle</span> <br>");
                html.append("<span>add action=accept chain=prerouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");
                html.append("<span>add action=accept chain=postrouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");
                html.append("<span>add action=accept chain=forward dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");
                html.append("<span>add action=accept chain=input dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");
                html.append("<span>add action=accept chain=output dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\"</span> <br>");
                for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                        html.append("<span>add action=mark-connection chain=input in-interface=\""
                                        + ecmpInterfaces.getWanIsp() + "\" new-connection-mark=\"cm-"
                                        + ecmpInterfaces.getWanIsp()
                                        + "\" passthrough=yes comment=\"LB ECMP by buananet.com\"</span> <br>");
                }

                for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                        html.append("<span>add action=mark-routing chain=output connection-mark=\"cm-"
                                        + ecmpInterfaces.getWanIsp() + "\" new-routing-mark=\"to-"
                                        + ecmpInterfaces.getWanIsp()
                                        + "\" passthrough=yes comment=\"LB ECMP by buananet.com\"</span> <br>");
                }

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(EcmpBody pccBody) {
                StringBuilder text = new StringBuilder();

                text.append("############################################################### \n");
                text.append("# Load Balancing ECMP (Equal Cost Multi Path) / LB ECMP Script Generator \n");
                text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
                text.append("# Created by: buananet.com - fb.me/buananet.pbun \n");
                text.append("# Load Balancing Method: ECMP (Equal Cost Multi Path) \n");
                text.append("############################################################### \n");

                // /ip firewall address-list
                text.append("/ip firewall address-list \n");
                text.append("add address=192.168.0.0/16 list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");
                text.append("add address=172.16.0.0/12 list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");
                text.append("add address=10.0.0.0/8 list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");

                // /ip firewall nat
                text.append("/ip firewall nat \n");
                for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                        text.append("add chain=srcnat out-interface=\"" + ecmpInterfaces.getWanIsp()
                                        + "\" action=masquerade comment=\"LB ECMP by buananet.com\" \n");
                }

                if (pccBody.getIdRouterOsVersion().equalsIgnoreCase("ros6")) {

                        // /ip route
                        text.append("/ip route \n");
                        text.append("add check-gateway=ping distance=1 ");
                        String gateways = "";
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                gateways += ecmpInterfaces.getGatewayIsp() + ",";
                        }
                        text.append("gateway=\"" + gateways + "\" comment=\"LB ECMP by buananet.com\" \n");

                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                text.append("add check-gateway=ping distance=1 gateway=\""
                                                + ecmpInterfaces.getGatewayIsp()
                                                + "\" routing-mark=\"to-" + ecmpInterfaces.getWanIsp()
                                                + "\" comment=\"LB ECMP by buananet.com\" \n");
                        }

                }

                if (pccBody.getIdRouterOsVersion().equalsIgnoreCase("ros7")) {
                        // /routing table
                        text.append("/routing table \n");
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                text.append("add name=\"to-" + ecmpInterfaces.getWanIsp()
                                                + "\" fib comment=\"LB ECMP by buananet.com\" \n");
                        }

                        // /ip route
                        text.append("/ip route \n");
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                text.append("add check-gateway=ping distance=1 gateway=\""
                                                + ecmpInterfaces.getGatewayIsp()
                                                + "\" routing-table=\"main\" comment=\"LB ECMP by buananet.com\" \n");
                        }
                        for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                                text.append("add check-gateway=ping distance=1 gateway=\""
                                                + ecmpInterfaces.getGatewayIsp() + "\" routing-table=\"to-"
                                                + ecmpInterfaces.getWanIsp()
                                                + "\" comment=\"LB ECMP by buananet.com\" \n");
                        }
                }

                // /ip firewall mangle
                text.append("/ip firewall mangle \n");
                text.append("add action=accept chain=prerouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");
                text.append("add action=accept chain=postrouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");
                text.append("add action=accept chain=forward dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");
                text.append("add action=accept chain=input dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");
                text.append("add action=accept chain=output dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB ECMP by buananet.com\" \n");
                for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                        text.append("add action=mark-connection chain=input in-interface=\""
                                        + ecmpInterfaces.getWanIsp() + "\" new-connection-mark=\"cm-"
                                        + ecmpInterfaces.getWanIsp()
                                        + "\" passthrough=yes comment=\"LB ECMP by buananet.com\" \n");
                }

                for (EcmpInterfaces ecmpInterfaces : pccBody.getInterfaces()) {
                        text.append("add action=mark-routing chain=output connection-mark=\"cm-"
                                        + ecmpInterfaces.getWanIsp() + "\" new-routing-mark=\"to-"
                                        + ecmpInterfaces.getWanIsp()
                                        + "\" passthrough=yes comment=\"LB ECMP by buananet.com\" \n");
                }

                return text.toString();
        }

}
