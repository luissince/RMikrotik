package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.model.mikrotikBondingInterface.MikrotikBondingInterfaceBody;
import com.okta.mongodb.GeneradoScripts.model.mikrotikchangemacaddress.MikrotikChangeMacAddressBody;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikBondingInterfaceService {
    private static final Logger logger = LoggerFactory.getLogger(MikrotikChangeMacAddresscService.class);

    public Map<String, String> create(MikrotikBondingInterfaceBody body) {
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

    private String generateHtmlScript(MikrotikBondingInterfaceBody body) {
        StringBuilder html = new StringBuilder();

        html.append("/interface bonding <br>");
 html.append("add name=\""+body.getBondingName_a()+"\" mode=balance-rr slaves=\"ether1,ether2\" comment=\"Bonding Interface Generator by buananet.com\"<br>");




        // switch (body.getMacOption().toLowerCase()) {
        // case "01":
        // html.append("/interface ethernet set \"" + body.getInterfaceName() + "\"
        // mac-address=\""
        // + body.getMacAddress()
        // + "\"<br>");
        //
        // break;
        // case "02":
        //
        // html.append("/system scheduler add comment=\"Random MAC Address
        // RMikrotik.com\" name=\"Random MAC Address\" on-event=\"delay 5\\r\\ \\n" + //
        // ":local RandomMAC \\\"\\$[:rndstr length=1
        // from=\\\"0123456789ABCDEF\\\"]\\$[:rndstr length=1
        // from=\\\"26ae\\\"]\\\"\\r\\ \\n" + //
        // "for x from=0 to=4 do={:set RandomMAC \\\"\\$RandomMAC:\\$[:rndstr length=2
        // from=\\\"0123456789ABCDEF\\\"]\\\"}\\r\\ \\n" + //
        // "/interface ethernet set \\\""+body.getInterfaceName()+"\\\"
        // mac-address=(\\$RandomMAC)\" start-time=startup");
        // break;
        // }

        return html.toString();
    }

    private String generatePlainTextScript(MikrotikBondingInterfaceBody body) {
        StringBuilder text = new StringBuilder();
        text.append(" aaaa");
        return text.toString();
    }

}
