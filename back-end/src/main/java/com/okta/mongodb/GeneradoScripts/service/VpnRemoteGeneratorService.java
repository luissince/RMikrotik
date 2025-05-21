package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.vpnRemoteGenerator.VpnRemoteGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class VpnRemoteGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(VpnRemoteGeneratorService.class);

    public Map<String, String> create(VpnRemoteGeneratorBody body) {
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

    private String generateHtmlScript(VpnRemoteGeneratorBody body) {
        StringBuilder html = new StringBuilder();
        html.append("<div>");
        html.append(
                "<span class='text-orange-400'>########################################################</span> <br>");
        html.append(
                "<span class='text-orange-400'># VPN Remote SSTP - L2TP - PPTP - OVPN Mikrotik Generator</span> <br>");
        html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
        html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
        html.append(
                "<span class='text-orange-400'>########################################################</span> <br>");
        html.append("</div>");
        return html.toString();
    }

    private String generatePlainTextScript(VpnRemoteGeneratorBody body) {
        StringBuilder text = new StringBuilder();
        text.append("######################################################## \n");
        text.append("# VPN Remote SSTP - L2TP - PPTP - OVPN Mikrotik Generator \n");
        text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
        text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
        text.append("######################################################## \n");
        return text.toString();
    }

}
