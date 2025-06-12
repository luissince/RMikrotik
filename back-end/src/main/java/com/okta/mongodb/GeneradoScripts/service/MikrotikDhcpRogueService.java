package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.model.mikrotikDhcpRogue.MikrotikDhcpRogueBody;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikDhcpRogueService {
        private static final Logger logger = LoggerFactory.getLogger(MikrotikDhcpRogueService.class);

    public Map<String, String> create(MikrotikDhcpRogueBody body) {
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

    private String generateHtmlScript(MikrotikDhcpRogueBody body) {
        StringBuilder html = new StringBuilder();
      

        switch (body.getSendingOption().toLowerCase()) {
            case "01":
                html.append("/ip dhcp-server alert add alert-timeout=\""+body.getAlertTimeout()+"\" valid-server=\""+body.getValidMacInterface()+"\" interface=\""+body.getDhcpInterface()+"\" on-alert=\":local DeviceName [/system identity get name];\\r\\ \\n" + //
            "/tool fetch url=\\\"https://api.telegram.org/bot"+body.getBotTelegram()+"/sendMessage\\\\\\?chat_id="+body.getChatIdTelegram()+"&text=\\E2\\9D\\8C UNKNOWN DHCP SERVER FOUND !! %0AROUTER: \\$DeviceName %0AINTERFACE: \\$interface %0AMAC ROGUE: \\$\\\"mac-address\\\" %0AIP LOCATION: \\$address\\\" keep-result=no\" comment=\"DHCP Alert RMikrotik.com\" disabled=no");

              break;
           case "02":


                break;
       }

        return html.toString();
    }

    private String generatePlainTextScript(MikrotikDhcpRogueBody body) {
        StringBuilder text = new StringBuilder();

         text.append("/ip dhcp-server alert add alert-timeout=\""+body.getAlertTimeout()+"\" valid-server=\""+body.getValidMacInterface()+"\" interface=\""+body.getDhcpInterface()+"\" on-alert=\":local DeviceName [/system identity get name];\\r\\ \\n" + //
            "/tool fetch url=\\\"https://api.telegram.org/botBOT Telegram/sendMessage\\\\\\?chat_id="+body.getChatIdTelegram()+"&text=\\E2\\9D\\8C UNKNOWN DHCP SERVER FOUND !! %0AROUTER: \\$DeviceName %0AINTERFACE: \\$interface %0AMAC ROGUE: \\$\\\"mac-address\\\" %0AIP LOCATION: \\$address\\\" keep-result=no\" comment=\"DHCP Alert RMikrotik.com\" disabled=no");


        text.append(" aaaa");
        return text.toString();
    }
}
