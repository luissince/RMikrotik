package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.okta.mongodb.GeneradoScripts.model.body.pcc.PccBody;
import com.okta.mongodb.GeneradoScripts.model.body.pcc.PccInterfaces;

@Service
public class PccService {

    private static final Logger logger = LoggerFactory.getLogger(PccService.class);

    public Map<String, String> create(PccBody pccBody) {
        logger.info("Body recibido: {}", pccBody);

        // Generar ambas versiones del script
        String htmlScript = generateHtmlScript(pccBody);
        String plainTextScript = generatePlainTextScript(pccBody);

        // Crear respuesta con ambos formatos
        Map<String, String> response = new HashMap<>();
        response.put("html", htmlScript);
        response.put("text", plainTextScript);

        return response;
    }

    private String generateHtmlScript(PccBody pccBody) {
        StringBuilder structure = new StringBuilder();
        structure.append("<div>");
        structure.append("###############################################################<br>");
        structure.append(
                "# <span style='color:blue;'>Load Balancing Per Connection Classifier (LB PCC) Script Generator</span><br>");
        structure.append(
                "# <span style='color:green;'>Date/Time:</span> <span style='color:red;'>23/4/2025, 11:36:47 a.m.</span><br>");
        structure.append(
                "# <span style='color:green;'>Created by:</span> <span style='color:red;'>buananet.com - fb.me/buananet.pbun</span><br>");
        structure.append(
                "# <span style='color:green;'>Load Balancing Method -> PCC (PER CONNECTION CLASSIFIER)</span><br>");
        structure.append("###############################################################<br><br>");

        structure.append("/ip firewall address-list<br>");
        structure.append(
                "add address=<span style='color:red;'>192.168.0.0/16</span> list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
        structure.append(
                "add address=<span style='color:red;'>172.16.0.0/12</span> list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
        structure.append(
                "add address=<span style='color:red;'>10.0.0.0/8</span> list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br><br>");

        structure.append("/ip firewall nat<br>");
        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add chain=srcnat out-interface=<span style='color:red;'>")
                    .append(pccInterfaces.getWanIsp())
                    .append("</span> action=masquerade comment=\"LB PCC by buananet.com\"<br>");
        }

        if (pccBody.getIdRouterVersion().equalsIgnoreCase("ros7")) {
            structure.append("/routing table<br>");
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append("add name=\"to-<span style='color:red;'>").append(pccInterfaces.getWanIsp())
                        .append("</span>\" fib comment=\"LB PCC by buananet.com\"<br>");
            }
        }

        structure.append("/ip route<br>");
        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add check-gateway=ping distance=1 gateway=<span style='color:red;'>")
                    .append(pccInterfaces.getGatewayIsp())
                    .append("</span> routing-mark=<span style='color:red;'>").append(pccInterfaces.getWanIsp())
                    .append("</span> comment=\"LB PCC by buananet.com\"<br>");
        }

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add check-gateway=ping distance=<span style='color:red;'>").append(pccInterfaces.getId())
                    .append("</span> gateway=<span style='color:red;'>").append(pccInterfaces.getGatewayIsp())
                    .append("</span> comment=\"LB PCC by buananet.com\"<br>");
        }

        structure.append("/ip firewall mangle<br>");
        structure.append(
                "add action=accept chain=prerouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
        structure.append(
                "add action=accept chain=postrouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
        structure.append(
                "add action=accept chain=forward dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
        structure.append(
                "add action=accept chain=input dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
        structure.append(
                "add action=accept chain=output dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add action=mark-connection chain=input in-interface=<span style='color:red;'>")
                    .append(pccInterfaces.getWanIsp())
                    .append("</span> new-connection-mark=\"cm-<span style='color:red;'>")
                    .append(pccInterfaces.getWanIsp())
                    .append("</span>\" passthrough=yes comment=\"LB PCC by buananet.com\"<br>");
        }

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add action=mark-routing chain=output connection-mark=\"cm-<span style='color:red;'>")
                    .append(pccInterfaces.getWanIsp())
                    .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                    .append(pccInterfaces.getWanIsp())
                    .append("</span>\" passthrough=yes comment=\"LB PCC by buananet.com\"<br>");
        }

        int totalInterfaces = pccBody.getInterfaces().length;

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list1")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                        .append(totalInterfaces).append("/").append(pccInterfaces.getId() - 1)
                        .append(" dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-routing chain=prerouting connection-mark=\"cm-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" passthrough=yes dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"<br>");
            }
        }

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list2")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                        .append(totalInterfaces).append("/").append(pccInterfaces.getId() - 1)
                        .append(" in-interface=<span style='color:red;'>").append(pccBody.getInterfaceTarget())
                        .append("</span> comment=\"LB PCC by buananet.com\"<br>");
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-routing chain=prerouting connection-mark=\"cm-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" passthrough=yes in-interface=<span style='color:red;'>")
                        .append(pccBody.getInterfaceTarget()).append("</span> comment=\"LB PCC by buananet.com\"<br>");
            }
        }

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list3")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                        .append(totalInterfaces).append("/").append(pccInterfaces.getId() - 1)
                        .append(" in-interface-list=<span style='color:red;'>").append(pccBody.getInterfaceTarget())
                        .append("</span> comment=\"LB PCC by buananet.com\"<br>");
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-routing chain=prerouting connection-mark=\"cm-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" new-routing-mark=\"to-<span style='color:red;'>")
                        .append(pccInterfaces.getWanIsp())
                        .append("</span>\" passthrough=yes in-interface-list=<span style='color:red;'>")
                        .append(pccBody.getInterfaceTarget()).append("</span> comment=\"LB PCC by buananet.com\"<br>");
            }
        }

        structure.append("</div>");
        return structure.toString();
    }

    private String generatePlainTextScript(PccBody pccBody) {
        StringBuilder structure = new StringBuilder();
        structure.append("###############################################################\n");
        structure.append("# Load Balancing Per Connection Classifier (LB PCC) Script Generator\n");
        structure.append("# Date/Time: 23/4/2025, 11:36:47 a.m.\n");
        structure.append("# Created by: buananet.com - fb.me/buananet.pbun\n");
        structure.append("# Load Balancing Method -> PCC (PER CONNECTION CLASSIFIER)\n");
        structure.append("###############################################################\n\n");

        structure.append("/ip firewall address-list\n");
        structure.append("add address=192.168.0.0/16 list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
        structure.append("add address=172.16.0.0/12 list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
        structure.append("add address=10.0.0.0/8 list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n\n");

        structure.append("/ip firewall nat\n");
        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add chain=srcnat out-interface=").append(pccInterfaces.getWanIsp())
                    .append(" action=masquerade comment=\"LB PCC by buananet.com\"\n");
        }

        if (pccBody.getIdRouterVersion().equalsIgnoreCase("ros7")) {
            structure.append("/routing table\n");
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append("add name=\"to-").append(pccInterfaces.getWanIsp())
                        .append("\" fib comment=\"LB PCC by buananet.com\"\n");
            }
        }

        structure.append("/ip route\n");
        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add check-gateway=ping distance=1 gateway=").append(pccInterfaces.getGatewayIsp())
                    .append(" routing-mark=").append(pccInterfaces.getWanIsp())
                    .append(" comment=\"LB PCC by buananet.com\"\n");
        }

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add check-gateway=ping distance=").append(pccInterfaces.getId())
                    .append(" gateway=").append(pccInterfaces.getGatewayIsp())
                    .append(" comment=\"LB PCC by buananet.com\"\n");
        }

        structure.append("/ip firewall mangle\n");
        structure.append(
                "add action=accept chain=prerouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
        structure.append(
                "add action=accept chain=postrouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
        structure.append(
                "add action=accept chain=forward dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
        structure.append(
                "add action=accept chain=input dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
        structure.append(
                "add action=accept chain=output dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add action=mark-connection chain=input in-interface=").append(pccInterfaces.getWanIsp())
                    .append(" new-connection-mark=\"cm-").append(pccInterfaces.getWanIsp())
                    .append("\" passthrough=yes comment=\"LB PCC by buananet.com\"\n");
        }

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure.append("add action=mark-routing chain=output connection-mark=\"cm-")
                    .append(pccInterfaces.getWanIsp())
                    .append("\" new-routing-mark=\"to-").append(pccInterfaces.getWanIsp())
                    .append("\" passthrough=yes comment=\"LB PCC by buananet.com\"\n");
        }

        int totalInterfaces = pccBody.getInterfaces().length;

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list1")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-")
                        .append(pccInterfaces.getWanIsp())
                        .append("\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                        .append(totalInterfaces).append("/").append(pccInterfaces.getId() - 1)
                        .append(" dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append("add action=mark-routing chain=prerouting connection-mark=\"cm-")
                        .append(pccInterfaces.getWanIsp()).append("\" new-routing-mark=\"to-")
                        .append(pccInterfaces.getWanIsp())
                        .append("\" passthrough=yes dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n");
            }
        }

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list2")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-")
                        .append(pccInterfaces.getWanIsp())
                        .append("\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                        .append(totalInterfaces).append("/").append(pccInterfaces.getId() - 1)
                        .append(" in-interface=").append(pccBody.getInterfaceTarget())
                        .append(" comment=\"LB PCC by buananet.com\"\n");
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append("add action=mark-routing chain=prerouting connection-mark=\"cm-")
                        .append(pccInterfaces.getWanIsp()).append("\" new-routing-mark=\"to-")
                        .append(pccInterfaces.getWanIsp()).append("\" passthrough=yes in-interface=")
                        .append(pccBody.getInterfaceTarget()).append(" comment=\"LB PCC by buananet.com\"\n");
            }
        }

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list3")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append(
                        "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-")
                        .append(pccInterfaces.getWanIsp())
                        .append("\" passthrough=yes per-connection-classifier=both-addresses-and-ports:")
                        .append(totalInterfaces).append("/").append(pccInterfaces.getId() - 1)
                        .append(" in-interface-list=").append(pccBody.getInterfaceTarget())
                        .append(" comment=\"LB PCC by buananet.com\"\n");
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure.append("add action=mark-routing chain=prerouting connection-mark=\"cm-")
                        .append(pccInterfaces.getWanIsp()).append("\" new-routing-mark=\"to-")
                        .append(pccInterfaces.getWanIsp()).append("\" passthrough=yes in-interface-list=")
                        .append(pccBody.getInterfaceTarget()).append(" comment=\"LB PCC by buananet.com\"\n");
            }
        }

        return structure.toString();
    }

}
