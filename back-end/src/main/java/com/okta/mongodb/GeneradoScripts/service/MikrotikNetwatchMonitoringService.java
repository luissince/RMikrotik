package com.okta.mongodb.GeneradoScripts.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.model.mikrotikNetwatchMonitoring.mikrotikNetwatchMonitoringBody;

@Service
public class MikrotikNetwatchMonitoringService {
       private static final Logger logger = LoggerFactory.getLogger(MikrotikNetwatchMonitoringService.class);

       public Map<String, String> create(mikrotikNetwatchMonitoringBody body) {
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

       private String generateHtmlScript(mikrotikNetwatchMonitoringBody body) {
              StringBuilder html = new StringBuilder();
              html.append("<span>Sending Options: "+body.getSendingOption()+"</span>");
              html.append("<span>BOT Telegram: "+body.getBotTelegram()+"</span>");
              html.append("<span>Chat ID Telegram: "+body.getChatIdTelegram()+"</span>");
              html.append("<span>Hosts: "+body.getHosts()+"</span>");
              return html.toString();
       }

       private String generatePlainTextScript(mikrotikNetwatchMonitoringBody body) {
              StringBuilder text = new StringBuilder();
              text.append("Sending Options: "+body.getSendingOption());
              text.append("BOT Telegram: "+body.getBotTelegram());
              text.append("Chat ID Telegram: "+body.getChatIdTelegram());
              text.append("Hosts: "+body.getHosts());
              return text.toString();
       }

}
