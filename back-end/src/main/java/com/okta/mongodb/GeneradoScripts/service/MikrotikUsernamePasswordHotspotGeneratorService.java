package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikUsernamePasswordHotspotGenerator.MikrotikUsernamePasswordHotspotGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikUsernamePasswordHotspotGeneratorService {
    private static final Logger logger = LoggerFactory.getLogger(MikrotikUsernamePasswordHotspotGeneratorService.class);

    public Map<String, String> create(MikrotikUsernamePasswordHotspotGeneratorBody body) {
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

    private String generateHtmlScript(MikrotikUsernamePasswordHotspotGeneratorBody body) {
        StringBuilder html = new StringBuilder();

        html.append("<div>");

        // html.append("<span></span> <br>");
        html.append("/ip hotspot user profile add name=\"" + body.getProfileHotspot() + "\"<br>");
        html.append("/ip hotspot user profile {set [find name=\"" + body.getProfileHotspot() + "\"] rate-limit=\""
                + body.getRateLimit() + "\" insert-queue-before=\"bottom\"}<br>");
        html.append("/ip hotspot user <br>");
        // html.append("add name=\"" + body.getTypeUsername() + "\" password=\"" + body.getTypeUsername() + "\" profile=\""
        //         + body.getProfileHotspot() + "\" limit-uptime=\"" + body.getLimitUptime() + "\" limit-bytes-total=\""
        //         + body.getLimitQuota() + "\"<br>");

        switch (body.getTypePassword().toLowerCase()) {

            case "01":
                for (int i = 0; i < body.getQtyUserHotspot(); i++) {
                    // Condición de ejemplo: si el índice es par, muestra un texto diferente

                    html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                            + body.getTypeUsername() + "" + (i + 1) + "\" profile=\"" + body.getProfileHotspot()
                            + "\" limit-uptime=\"" + body.getLimitUptime() + "\" limit-bytes-total=\""
                            + body.getLimitQuota() + "\"<br>");
                }
                break;
            case "02":
                for (int i = 0; i < body.getQtyUserHotspot(); i++) {
                    // Condición de ejemplo: si el índice es par, muestra un texto diferente

                    html.append("add name=\"" + GeneratePassword.run(5, null) + "" + (i + 1) + "\" password=\""
                            + GeneratePassword.run(5, null) + "\" profile=\"" + body.getProfileHotspot()
                            + "\" limit-uptime=\"" + body.getLimitUptime()
                            + "\" limit-bytes-total=\""
                            + body.getLimitQuota() + "\"<br>");
                }
                break;
            case "03":
                for (int i = 0; i < body.getQtyUserHotspot(); i++) {
                    // Condición de ejemplo: si el índice es par, muestra un texto diferente

                    html.append("add name=\"" + body.getTypeUsername() + "" + GeneratePassword.run(5, null)
                            + "\" password=\""
                            + body.getTypeUsername() + "" + GeneratePassword.run(5, null) + "\" profile=\""
                            + body.getProfileHotspot()
                            + "\" limit-uptime=\"" + body.getLimitUptime()
                            + "\" limit-bytes-total=\""
                            + body.getLimitQuota() + "\"<br>");

                }
                break;
            case "04":
                for (int i = 0; i < body.getQtyUserHotspot(); i++) {
                    // Condición de ejemplo: si el índice es par, muestra un texto diferente

                    html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                            + GeneratePassword.run(3, null) + "\" profile=\"" + body.getProfileHotspot()
                            + "\" limit-uptime=\"" + body.getLimitUptime()
                            + "\" limit-bytes-total=\""
                            + body.getLimitQuota() + "\"<br>");

                }
                break;

            case "05":
                for (int i = 0; i < body.getQtyUserHotspot(); i++) {
                    // Condición de ejemplo: si el índice es par, muestra un texto diferente

                    html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                            + GeneratePassword.run(4, null) + "\" profile=\"" + body.getProfileHotspot()
                            + "\" limit-uptime=\"" + body.getLimitUptime()
                            + "\" limit-bytes-total=\""
                            + body.getLimitQuota() + "\"<br>");

                }
                  break;
            case "06":
                for (int i = 0; i < body.getQtyUserHotspot(); i++) {
                    // Condición de ejemplo: si el índice es par, muestra un texto diferente

                    html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                            + GeneratePassword.run(5, null) + "\" profile=\"" + body.getProfileHotspot()
                            + "\" limit-uptime=\"" + body.getLimitUptime()
                            + "\" limit-bytes-total=\""
                            + body.getLimitQuota() + "\"<br>");

                }
                break;

        }

        html.append("</div>");
        // html.append("<span>gay"+(i+1)+"</span>
        // "+GeneratePassword.run(5,null)+"<br/>");
        return html.toString();
    }

    private String generatePlainTextScript(MikrotikUsernamePasswordHotspotGeneratorBody body) {
        StringBuilder text = new StringBuilder();

        text.append("");

        return text.toString();
    }

}
