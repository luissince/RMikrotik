package com.okta.mongodb.GeneradoScripts.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikUsernamePasswordHotspotGenerator.MikrotikUsernamePasswordHotspotGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.GeneradorPasswordNumeros;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikUsernamePasswordHotspotGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(MikrotikUsernamePasswordHotspotGeneratorService.class);

    public Map<String, String> create(MikrotikUsernamePasswordHotspotGeneratorBody body) {
        logger.info("Body recibido: {}", body);

        // Generar datos una sola vez
        List<Map<String, String>> userData = generateUserData(body);

        // Generar scripts
        String htmlScript = generateHtmlScript(body, userData);
        String pdfScript = generatePdfScript(body, userData);
        String plainTextScript = generatePlainTextScript(body, userData);

        // Crear respuesta con ambos formatos
        Map<String, String> response = new HashMap<>();
        response.put("html", htmlScript);
        response.put("pdf", pdfScript);
        response.put("text", plainTextScript);

        return response;
    }

    private List<Map<String, String>> generateUserData(MikrotikUsernamePasswordHotspotGeneratorBody body) {
        List<Map<String, String>> userData = new ArrayList<>();
        for (int i = 0; i < body.getQtyUserHotspot(); i++) {
            Map<String, String> user = new HashMap<>();
            String username;
            String password;

            switch (body.getTypePassword().toLowerCase()) {
                case "01":
                    username = body.getTypeUsername() + (i + 1);
                    password = body.getTypeUsername() + (i + 1);
                    break;
                case "02":
                    username = GeneratePassword.run(5, null) + (i + 1);
                    password = GeneratePassword.run(5, null);
                    break;
                case "03":
                    username = body.getTypeUsername() + GeneratePassword.run(5, null);
                    password = body.getTypeUsername() + GeneratePassword.run(5, null);
                    break;
                case "04":
                    username = body.getTypeUsername() + (i + 1);
                    password = GeneratePassword.run(3, null);
                    break;
                case "05":
                    username = body.getTypeUsername() + (i + 1);
                    password = GeneratePassword.run(4, null);
                    break;
                case "06":
                    username = body.getTypeUsername() + (i + 1);
                    password = GeneratePassword.run(5, null);
                    break;
                case "07":
                    username = body.getTypeUsername() + (i + 1);
                    password = GeneradorPasswordNumeros.run(5, null, false);
                    break;
                default:
                    username = body.getTypeUsername() + (i + 1);
                    password = body.getTypeUsername() + (i + 1);
            }

            user.put("username", username);
            user.put("password", password);
            userData.add(user);
        }
        return userData;
    }

    private String generateHtmlScript(MikrotikUsernamePasswordHotspotGeneratorBody body, List<Map<String, String>> userData) {
        StringBuilder html = new StringBuilder();
        html.append("<div>");
        html.append("/ip hotspot user profile add name=\"").append(body.getProfileHotspot()).append("\" <br>");
        html.append("/ip hotspot user profile {set [find name=\"").append(body.getProfileHotspot()).append("\"] rate-limit=\"")
            .append(body.getRateLimit()).append("\" insert-queue-before=\"bottom\"} <br>");
        html.append("/ip hotspot user <br>");

        for (Map<String, String> user : userData) {
            html.append("add name=\"").append(user.get("username")).append("\" password=\"")
                .append(user.get("password")).append("\" profile=\"").append(body.getProfileHotspot())
                .append("\" limit-uptime=\"").append(body.getLimitUptime())
                .append("\" limit-bytes-total=\"").append(body.getLimitQuota()).append("\"<br>");
        }

        html.append("</div>");
        return html.toString();
    }

private String generatePdfScript(MikrotikUsernamePasswordHotspotGeneratorBody body, List<Map<String, String>> userData) {
    StringBuilder pdfHtml = new StringBuilder();
    pdfHtml.append("<!DOCTYPE html>");
    pdfHtml.append("<html>");
    pdfHtml.append("<head>");
    pdfHtml.append("<style>");
    pdfHtml.append("body { font-family: Arial, sans-serif; }");
    pdfHtml.append(".grid-container { display: flex; flex-wrap: wrap; }");
    pdfHtml.append(".grid-item { width: calc(25% - 20px); margin: 10px; border: 1px solid #ddd; padding: 10px; box-sizing: border-box; text-align: center; }");
    pdfHtml.append(".grid-item h3 { margin-top: 0; }");
    pdfHtml.append(".grid-item p { margin: 5px 0; }");
    pdfHtml.append("</style>");
    pdfHtml.append("</head>");
    pdfHtml.append("<body>");
    pdfHtml.append("<h1 style='text-align: center;'>Hotspot User Credentials</h1>");
    pdfHtml.append("<div class='grid-container'>");

    for (int i = 0; i < userData.size(); i++) {
        Map<String, String> user = userData.get(i);
        pdfHtml.append("<div class='grid-item'>");
        pdfHtml.append("<h3>").append(body.getProfileHotspot()).append(" ").append(i + 1).append("</h3>");
        pdfHtml.append("<p><strong>Username:</strong> ").append(user.get("username")).append("</p>");
        pdfHtml.append("<p><strong>Password:</strong> ").append(user.get("password")).append("</p>");
        pdfHtml.append("</div>");
    }

    pdfHtml.append("</div>");
    pdfHtml.append("</body>");
    pdfHtml.append("</html>");

    return pdfHtml.toString();
}

    private String generatePlainTextScript(MikrotikUsernamePasswordHotspotGeneratorBody body, List<Map<String, String>> userData) {
        StringBuilder text = new StringBuilder();
        text.append("FICHAS HOTSPOT MIKROTIK \n");
        text.append("/ip hotspot user profile {set [find name=\"").append(body.getProfileHotspot())
            .append("\"] rate-limit=\"").append(body.getRateLimit())
            .append("\" insert-queue-before=\"bottom\"} \n");
        text.append("/ip hotspot user \n");

        for (Map<String, String> user : userData) {
            text.append("add name=\"").append(user.get("username")).append("\" password=\"")
                .append(user.get("password")).append("\" profile=\"").append(body.getProfileHotspot())
                .append("\" limit-uptime=\"").append(body.getLimitUptime())
                .append("\" limit-bytes-total=\"").append(body.getLimitQuota()).append("\"\n");
        }

        return text.toString();
    }
}
