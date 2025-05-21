package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikStaticRouting.MikrotikStaticRoutingBody;

@Service
public class MikrotikStaticRoutingService {

    private static final Logger logger = LoggerFactory.getLogger(MikrotikStaticRoutingService.class);

    public Map<String, String> create(MikrotikStaticRoutingBody body) {
        logger.info("Body recibido: {}", body);

        // Generar ambas versiones del script
        String htmlScript1 = generateHtmlScript1(body);
        String htmlScript2 = generateHtmlScript2(body);

        String plainTextScript1 = generatePlainTextScript1(body);
        String plainTextScript2 = generatePlainTextScript2(body);

        // Crear respuesta con ambos formatos
        Map<String, String> response = new HashMap<>();
        response.put("html1", htmlScript1);
        response.put("html2", htmlScript2);
        response.put("text1", plainTextScript1);
        response.put("text2", plainTextScript2);

        return response;
    }

    private String generateHtmlScript1(MikrotikStaticRoutingBody body) {
        StringBuilder html = new StringBuilder();
        html.append("<div>");
        html.append(
                "<span class='text-green-500'>## STEP 1 - Copy Paste to Terminal</span> <br>");
        html.append("</div>");
        return html.toString();
    }

    private String generateHtmlScript2(MikrotikStaticRoutingBody body) {
        StringBuilder html = new StringBuilder();
        html.append("<div>");
        html.append(
                "<span class='text-green-500'>## STEP 2 - Copy Paste to Terminal</span> <br>");
        html.append("</div>");
        return html.toString();
    }

    private String generatePlainTextScript1(MikrotikStaticRoutingBody body) {
        StringBuilder text = new StringBuilder();
        text.append("## STEP 1 - Copy Paste to Terminal\n");
        return text.toString();
    }

    private String generatePlainTextScript2(MikrotikStaticRoutingBody body) {
        StringBuilder text = new StringBuilder();
        text.append("## STEP 2 - Copy Paste to Terminal \n");
        ;
        return text.toString();
    }

}
