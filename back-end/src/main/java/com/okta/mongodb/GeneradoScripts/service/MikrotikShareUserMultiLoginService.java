package com.okta.mongodb.GeneradoScripts.service;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.okta.mongodb.GeneradoScripts.model.mikrotikShareUserMultiLoginGenerator.MikrotikShareUserMultiLoginBody;

import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikShareUserMultiLoginService {
          private static final Logger logger = LoggerFactory.getLogger(MikrotikUsernamePasswordPppGeneratorService.class);

       public Map<String, String> create(MikrotikShareUserMultiLoginBody body) {
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

 private String generateHtmlScript(MikrotikShareUserMultiLoginBody body) {
              StringBuilder html = new StringBuilder();
 html.append("<span class='text-orange-400'>###################################################################</span> <br>");
              html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
              html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
              html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
              html.append("<span class='text-orange-400'>###################################################################</span> <br>");
             
 html.append("<span class='font-black'>/queue simple</span> <br>");


  html.append("add max-limit=\""+body.getRateLimit()+"\" name=\""+body.getParentNameQueue()+"\" target=\""+body.getTargetIPAddress()+"\" packet-mark=\""+body.getParentNameQueue()+"\" comment=\"Bandwidth Share  RMikrotik.com\"<br>");
 html.append("<span class='font-black'>/ip hotspot user profile</span> <br>");
html.append("add address-list=\""+body.getProfileName()+"\" name=\""+body.getProfileName()+"\" shared-users=\""+body.getSharedUser()+"\" rate-limit=\""+body.getRateLimit()+"\" parent-queue=\""+body.getParentNameQueue()+"\" insert-queue-before=\"bottom\"<br>");
 html.append("<span class='font-black'>/ip hotspot user</span> <br>");

 html.append("add name=\""+body.getUserName()+"\" password=\""+body.getPassword()+"\" profile=\""+body.getProfileName()+"\" comment=\""+body.getUserName()+" Home - Bandwidth Share RMikrotik.com\" <br>");
 html.append("<span class='font-black'>/ip firewall mangle</span> <br>");
 html.append("add action=mark-packet chain=forward src-address-list=\""+body.getProfileName()+"\" new-packet-mark=\""+body.getProfileName()+"\" passthrough=no comment=\""+body.getUserName()+" Home Up - Bandwidth Share RMikrotik.com\" <br>");
 html.append("add action=mark-packet chain=forward dst-address-list=\""+body.getProfileName()+"\" new-packet-mark=\""+body.getProfileName()+"\" passthrough=no comment=\""+body.getUserName()+" Home Down\"<br>");
 
       return html.toString();
       }
 private String generatePlainTextScript(MikrotikShareUserMultiLoginBody body) {
              StringBuilder text = new StringBuilder();
 text.append("<span class='text-orange-400'>###################################################################</span> <br>");
              text.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
              text.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
              text.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
              text.append("<span class='text-orange-400'>###################################################################</span> <br>");
              text.append("<span class='font-black'>/ppp profile add name=\"default\"</span> <br>");

 return text.toString();
       }
}
