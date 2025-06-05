package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.simpleQueueGeneratorShared.SimpleQueueGeneratorSharedBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service

public class SimpleQueueGeneratorSharedService {

    private static final Logger logger = LoggerFactory.getLogger(SimpleQueueGeneratorSharedBody.class);

    public Map<String, String> create(SimpleQueueGeneratorSharedBody body) {
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

    private String generateHtmlScript(SimpleQueueGeneratorSharedBody body) {
        StringBuilder html = new StringBuilder();
           html.append("<span class='text-orange-400'>###################################################################</span> <br>");
                html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'>###################################################################</span> <br>");
          
             html.append("<span class='font-black'>/queue simple</span> <br>");

        html.append("add max-limit=\"" + body.getUpTotal() + "/" + body.getDownTotal() + "\" limit-at=\""
                + body.getUpTotal() + "/" + body.getDownTotal() + "\" target=\"" + body.getTargetLocalIP()
                + "\" name=\"" + body.getParentNameQueue() + "\" comment=\"Simple Queue Generator RMikrotk.com\"<br>");

        html.append("add max-limit=\"" + body.getUpClient() + "/" + body.getDownClient() + "\" limit-at=\""
                + body.getUpLimitAt() + "/" + body.getDownLimitAt() + "\" target=\"" + body.getStartIPClient()
                + "\" name=\"" + body.getClientNameQueue() + "-" + body.getClientIdentity() + "\" parent=\""
                + body.getParentNameQueue() + "\"<br>");



        return html.toString();
    }

    private String generatePlainTextScript(SimpleQueueGeneratorSharedBody body) {
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
