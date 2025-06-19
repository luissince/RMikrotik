package com.okta.mongodb.GeneradoScripts.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.okta.mongodb.GeneradoScripts.model.mikrotikQrCodeGenerator.MikrotikQrCodeGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class MikrotikQrCodeGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(SimpleQueueGeneratorService.class);

    public Map<String, String> create(MikrotikQrCodeGeneratorBody body) {
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

    private String generateHtmlScript(MikrotikQrCodeGeneratorBody body) {
        StringBuilder html = new StringBuilder();

        html.append("<div>");
        // html.append("<span></span> <br>");

        html.append("</div>");
        return html.toString();
    }

    private String generatePlainTextScript(MikrotikQrCodeGeneratorBody body) {
        StringBuilder text = new StringBuilder();

        text.append("<div>");

        return text.toString();
    }

}
