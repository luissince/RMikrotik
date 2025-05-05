package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.nth.NthBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class NthService {

        private static final Logger logger = LoggerFactory.getLogger(MikrotikBackupToMailService.class);

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

        private String generateHtmlScript(NthBody body) {
                StringBuilder html = new StringBuilder();

                // html.append("<span></span> <br/>");

                html.append("<div>");
                html.append("<span>###############################################################</span> <br>");
                html.append("<span># Load Balancing NTH (\"Every\" and \"Packet\") / LB NTH Script Generator</span> <br>");
                html.append("<span># Date/Time: 3/5/2025, 22:00:5</span> <br>");
                html.append("<span># Created by: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span># Load Balancing Method -> NTH (\"Every\" and \"Packet\")</span> <br>");
                html.append("<span>###############################################################</span> <br>");

                html.append("<span>/ip firewall address-list</span> <br/>");
                html.append("<span>add address=192.168.0.0/16 list=LOCAL-IP comment=\"LB NTH by buananet.com\"</span> <br/>");
                html.append("<span>add address=172.16.0.0/12 list=LOCAL-IP comment=\"LB NTH by buananet.com\"</span> <br/>");
                html.append("<span>add address=10.0.0.0/8 list=LOCAL-IP comment=\"LB NTH by buananet.com\"</span> <br/>");



               
                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(NthBody body) {
                StringBuilder text = new StringBuilder();

                // text.append(" \n");

                text.append("############################################################### \n");
                text.append("# Load Balancing NTH (\"Every\" and \"Packet\") / LB NTH Script Generator \n");
                text.append("# Date/Time: 3/5/2025, 22:00:5 \n");
                text.append("# Created by: buananet.com - fb.me/buananet.pbun \n");
                text.append("# Load Balancing Method -> NTH (\"Every\" and \"Packet\") \n");
                text.append("############################################################### \n");

                text.append("/ip firewall address-list \n");
                text.append("add address=192.168.0.0/16 list=LOCAL-IP comment=\"LB NTH by buananet.com\" \n");
                text.append("add address=172.16.0.0/12 list=LOCAL-IP comment=\"LB NTH by buananet.com\" \n");
                text.append("add address=10.0.0.0/8 list=LOCAL-IP comment=\"LB NTH by buananet.com\" \n");

                

                return text.toString();
        }
}