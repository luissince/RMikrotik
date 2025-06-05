package com.okta.mongodb.GeneradoScripts.service;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.okta.mongodb.GeneradoScripts.model.mikrotikDnsDverHttpsDoh.MikrotikDnsDverHttpsDohBody;

import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikDnsDverHttpsDohService {
        private static final Logger logger = LoggerFactory.getLogger(MikrotikDnsDverHttpsDohBody.class);

    public Map<String, String> create(MikrotikDnsDverHttpsDohBody body) {
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

    private String generateHtmlScript(MikrotikDnsDverHttpsDohBody body) {
        StringBuilder html = new StringBuilder();
         
             html.append(" <br>");


        return html.toString();
    }

    private String generatePlainTextScript(MikrotikDnsDverHttpsDohBody body) {
        StringBuilder text = new StringBuilder();
             text.append("<span class='text-orange-400'>###################################################################</span> <br>");
                text.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                text.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                text.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                text.append("<span class='text-orange-400'>###################################################################</span> <br>");
        text.append("</div>");
        return text.toString();
    }

}
