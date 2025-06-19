package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.nth.NthBody;
import com.okta.mongodb.GeneradoScripts.model.nth.NthInterfaces;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;


@Service
public class NthService {
 private static final Logger logger = LoggerFactory.getLogger(NthService.class);

        public Map<String, String> create(NthBody body) {
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

        private String generateHtmlScript(NthBody NthBody) {
                StringBuilder html = new StringBuilder();
                html.append("<div>");
         
              html.append("<span class='text-orange-400'>###################################################################</span> <br>");
              html.append("<span class='text-orange-400'># Static Routing NTH  Generator RMikrotik.com</span> <br>");
              html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
              html.append("<span class='text-orange-400'># Created By: RMikrotik.com </span> <br>");
              html.append("<span class='text-orange-400'>###################################################################</span> <br>");
    

                html.append("/ip firewall address-list <br>");
                html.append(
                                "add address=<span style='color:red;'>192.168.0.0/16</span> list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add address=<span style='color:red;'>172.16.0.0/12</span> list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add address=<span style='color:red;'>10.0.0.0/8</span> list=LOCAL-IP comment=\"RMikrotik.com\" <br>");

                html.append("/ip firewall nat <br>");
                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        html.append("add chain=srcnat out-interface=<span style='color:red;'>")
                                        .append(NthInterfaces.getWanIsp())
                                        .append("</span> action=masquerade comment=\"RMikrotik.com\" <br>");
                }

                if (NthBody.getIdRouterVersion().equalsIgnoreCase("ros7")) {
                        html.append("/routing table <br>");
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                html.append("add name=\"to-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" fib comment=\"RMikrotik.com\" <br>");
                        }
                }

                html.append("/ip route <br>");
                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        html.append("add check-gateway=ping distance=1 gateway=<span style='color:red;'>")
                                        .append(NthInterfaces.getGatewayIsp())
                                        .append("</span> routing-mark=<span style='color:red;'>")
                                        .append(NthInterfaces.getWanIsp())
                                        .append("</span> comment=\"RMikrotik.com\" <br>");
                }

                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        html.append("add check-gateway=ping distance=<span style='color:red;'>")
                                        .append(NthInterfaces.getId())
                                        .append("</span> gateway=<span style='color:red;'>")
                                        .append(NthInterfaces.getGatewayIsp())
                                        .append("</span> comment=\"RMikrotik.com\" <br>");
                }

                html.append("/ip firewall mangle<br>");
                html.append(
                                "add action=accept chain=prerouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add action=accept chain=postrouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add action=accept chain=forward dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add action=accept chain=input dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add action=accept chain=output dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" <br>");

                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        html.append(
                                        "add action=mark-connection chain=prerouting in-interface=\"<span style='color:red;'>")
                                        .append(NthInterfaces.getWanIsp())
                                        .append("</span>\" new-connection-mark=\"cm-<span style='color:red;'>")
                                        .append(NthInterfaces.getWanIsp())
                                        .append("</span>\" passthrough=yes comment=\"RMikrotik.com\" <br>");
                }

                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        html.append(
                                        "add action=mark-routing chain=output connection-mark=\"cm-<span style='color:red;'>")
                                        .append(NthInterfaces.getWanIsp())
                                        .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                                        .append(NthInterfaces.getWanIsp())
                                        .append("</span>\" passthrough=yes comment=\"RMikrotik.com\" <br>");
                }
             

                int totalInterfaces = NthBody.getInterfaces().length;

                if (NthBody.getIdLocalTarget().equalsIgnoreCase("local-list1")) {
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                html.append(
                                                "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                                                .append(totalInterfaces).append("/").append(NthInterfaces.getId() - 1)
                                                .append(" dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                        }

                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                html.append(
                                                "add action=mark-routing chain=prerouting connection-mark=\"cm-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" passthrough=yes dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                        }
                }

                if (NthBody.getIdLocalTarget().equalsIgnoreCase("local-list2")) {
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                html.append(
                                                "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                                                .append(totalInterfaces).append("/").append(NthInterfaces.getId() - 1)
                                                .append(" in-interface=<span style='color:red;'>")
                                                .append(NthBody.getInterfaceTarget())
                                                .append("</span> comment=\"RMikrotik.com\" <br>");
                        }

                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                html.append(
                                                "add action=mark-routing chain=prerouting connection-mark=\"cm-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" passthrough=yes in-interface=<span style='color:red;'>")
                                                .append(NthBody.getInterfaceTarget())
                                                .append("</span> comment=\"RMikrotik.com\" <br>");
                        }
                }

                if (NthBody.getIdLocalTarget().equalsIgnoreCase("local-list3")) {
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                html.append(
                                                "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                                                .append(totalInterfaces).append("/").append(NthInterfaces.getId() - 1)
                                                .append(" in-interface-list=<span style='color:red;'>")
                                                .append(NthBody.getInterfaceTarget())
                                                .append("</span> comment=\"RMikrotik.com\" <br>");
                        }

                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                html.append(
                                                "add action=mark-routing chain=prerouting connection-mark=\"cm-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("</span>\" passthrough=yes in-interface-list=<span style='color:red;'>")
                                                .append(NthBody.getInterfaceTarget())
                                                .append("</span> comment=\"RMikrotik.com\" <br>");
                        }
                }

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(NthBody NthBody) {
                StringBuilder text = new StringBuilder();
                text.append("############################################################### \n");
                text.append("# Load Balancing Per Connection Classifier (LB Nth) Script Generator \n");
                text.append("# Date/Time: "+DateUtils.currentDate()+" \n");
                text.append("# Created by: buananet.com - fb.me/buananet.pbun \n");
                text.append("# Load Balancing Method -> Nth (PER CONNECTION CLASSIFIER) \n");
                text.append("############################################################### \n");

                text.append("/ip firewall address-list\n");
                text.append("add address=192.168.0.0/16 list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append("add address=172.16.0.0/12 list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append("add address=10.0.0.0/8 list=LOCAL-IP comment=\"RMikrotik.com\" \n");

                text.append("/ip firewall nat \n");
                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        text.append("add chain=srcnat out-interface=").append(NthInterfaces.getWanIsp())
                                        .append(" action=masquerade comment=\"RMikrotik.com\" \n");
                }

                if (NthBody.getIdRouterVersion().equalsIgnoreCase("ros7")) {
                        text.append("/routing table \n");
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                text.append("add name=\"to-").append(NthInterfaces.getWanIsp())
                                                .append("\" fib comment=\"RMikrotik.com\" \n");
                        }
                }

                text.append("/ip route \n");
                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        text.append("add check-gateway=ping distance=1 gateway=")
                                        .append(NthInterfaces.getGatewayIsp())
                                        .append(" routing-mark=").append(NthInterfaces.getWanIsp())
                                        .append(" comment=\"RMikrotik.com\" \n");
                }

                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        text.append("add check-gateway=ping distance=").append(NthInterfaces.getId())
                                        .append(" gateway=").append(NthInterfaces.getGatewayIsp())
                                        .append(" comment=\"RMikrotik.com\" \n");
                }

                text.append("/ip firewall mangle \n");
                text.append(
                                "add action=accept chain=prerouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append(
                                "add action=accept chain=postrouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append(
                                "add action=accept chain=forward dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append(
                                "add action=accept chain=input dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append(
                                "add action=accept chain=output dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" \n");

                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        text.append("add action=mark-connection chain=input in-interface=")
                                        .append(NthInterfaces.getWanIsp())
                                        .append(" new-connection-mark=\"cm-").append(NthInterfaces.getWanIsp())
                                        .append("\" passthrough=yes comment=\"RMikrotik.com\" \n");
                }

                for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                        text.append("add action=mark-routing chain=output connection-mark=\"cm-")
                                        .append(NthInterfaces.getWanIsp())
                                        .append("\" new-routing-mark=\"to-").append(NthInterfaces.getWanIsp())
                                        .append("\" passthrough=yes comment=\"RMikrotik.com\" \n");
                }

                int totalInterfaces = NthBody.getInterfaces().length;

                if (NthBody.getIdLocalTarget().equalsIgnoreCase("local-list1")) {
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                text.append(
                                                "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                                                .append(totalInterfaces).append("/").append(NthInterfaces.getId() - 1)
                                                .append(" dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                        }

                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                text.append("add action=mark-routing chain=prerouting connection-mark=\"cm-")
                                                .append(NthInterfaces.getWanIsp()).append("\" new-routing-mark=\"to-")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("\" passthrough=yes dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                        }
                }

                if (NthBody.getIdLocalTarget().equalsIgnoreCase("local-list2")) {
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                text.append(
                                                "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                                                .append(totalInterfaces).append("/").append(NthInterfaces.getId() - 1)
                                                .append(" in-interface=").append(NthBody.getInterfaceTarget())
                                                .append(" comment=\"RMikrotik.com\" \n");
                        }

                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                text.append("add action=mark-routing chain=prerouting connection-mark=\"cm-")
                                                .append(NthInterfaces.getWanIsp()).append("\" new-routing-mark=\"to-")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("\" passthrough=yes in-interface=")
                                                .append(NthBody.getInterfaceTarget())
                                                .append(" comment=\"RMikrotik.com\" \n");
                        }
                }

                if (NthBody.getIdLocalTarget().equalsIgnoreCase("local-list3")) {
                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                text.append(
                                                "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                                                .append(totalInterfaces).append("/").append(NthInterfaces.getId() - 1)
                                                .append(" in-interface-list=").append(NthBody.getInterfaceTarget())
                                                .append(" comment=\"RMikrotik.com\" \n");
                        }

                        for (NthInterfaces NthInterfaces : NthBody.getInterfaces()) {
                                text.append("add action=mark-routing chain=prerouting connection-mark=\"cm-")
                                                .append(NthInterfaces.getWanIsp()).append("\" new-routing-mark=\"to-")
                                                .append(NthInterfaces.getWanIsp())
                                                .append("\" passthrough=yes in-interface-list=")
                                                .append(NthBody.getInterfaceTarget())
                                                .append(" comment=\"RMikrotik.com\" \n");
                        }
                }

                return text.toString();
        }

}
