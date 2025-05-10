package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.constants.RemoteIpPublicStatic;
import com.okta.mongodb.GeneradoScripts.model.remoteIpPublicStatic.RemoteIpPublicStaticBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class RemoteIpPublicStaticService {

    private static final Logger logger = LoggerFactory.getLogger(RemoteIpPublicStaticService.class);

    public Map<String, String> create(RemoteIpPublicStaticBody body) {
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

    private String generateHtmlScript(RemoteIpPublicStaticBody body) {
        StringBuilder html = new StringBuilder();

        html.append("<div>");

        html.append(
                "<span class='text-orange-400'>########################################################</span> <br>");
        html.append(
                "<span class='text-orange-400'># Open Remote Access ISP \"Public IP Static\" for MikroTik</span> <br>");
        html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
        html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
        html.append(
                "<span class='text-orange-400'>########################################################</span> <br>");

        if (body.getIdRosVersion().equalsIgnoreCase(RemoteIpPublicStatic.ROS7)) {
            // /routing table
            html.append("<span class='font-black'>/routing table</span> <br>");
            html.append("<span>add name=public-ip fib comment=\"Remote Public IP by buananet.com\"</span> <br>");
        }

        // /ip route
        html.append("<span class='font-black'>/ip route</span> <br>");
        html.append(
                "<span>add check-gateway=ping gateway=\"192.168.10.1\" routing-table=public-ip comment=\"Remote Public IP by buananet.com\"</span> <br>");

        // /ip firewall mangle
        html.append("<span class='font-black'>/ip firewall mangle</span> <br>");
        html.append(
                "<span>add action=mark-connection chain=input in-interface=\"ether1-ISP\" new-connection-mark=public-ip passthrough=yes comment=\"Remote Public IP by buananet.com\"</span> <br>");
        html.append(
                "<span>add action=mark-routing chain=output connection-mark=public-ip new-routing-mark=public-ip passthrough=no</span> <br>");

        html.append("</div>");
        return html.toString();
    }

    private String generatePlainTextScript(RemoteIpPublicStaticBody body) {
        StringBuilder text = new StringBuilder();

        text.append("######################################################## \n");
        text.append("# Open Remote Access ISP \"Public IP Static\" for MikroTik \n");
        text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
        text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
        text.append("######################################################## \n");

        if (body.getIdRosVersion().equalsIgnoreCase(RemoteIpPublicStatic.ROS7)) {
            // /routing table
            text.append("/routing table \n");
            text.append("add name=public-ip fib comment=\"Remote Public IP by buananet.com\" \n");
        }

        // /ip route
        text.append("/ip route \n");
        text.append(
                "add check-gateway=ping gateway=\""+body.getIpGatewayIsp()+"\" routing-table=public-ip comment=\"Remote Public IP by buananet.com\" \n");

        // /ip firewall mangle
        text.append("/ip firewall mangle \n");
        text.append(
                "add action=mark-connection chain=input in-interface=\""+body.getInterfaceIsp()+"\" new-connection-mark=public-ip passthrough=yes comment=\"Remote Public IP by buananet.com\" \n");
        text.append(
                "add action=mark-routing chain=output connection-mark=public-ip new-routing-mark=public-ip passthrough=no \n");

        return text.toString();
    }

}
