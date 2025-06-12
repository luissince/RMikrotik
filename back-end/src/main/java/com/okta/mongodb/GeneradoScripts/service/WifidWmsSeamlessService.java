package com.okta.mongodb.GeneradoScripts.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.okta.mongodb.GeneradoScripts.model.wifidWmsSeamless.WifidWmsSeamlessBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
@Service
public class WifidWmsSeamlessService {
    
 private static final Logger logger = LoggerFactory.getLogger(WifidWmsSeamlessService.class);

       public Map<String, String> create(WifidWmsSeamlessBody body) {
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
          private String generateHtmlScript(WifidWmsSeamlessBody body) {
              StringBuilder html = new StringBuilder();
              html.append("<span class='text-orange-400'>###################################################################</span> <br>");
              html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator RMikrotik.com</span> <br>");
              html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
              html.append("<span class='text-orange-400'># Created By: RMikrotik</span> <br>");
              html.append("<span class='text-orange-400'>###################################################################</span> <br>");
              html.append("<span class='font-black'>/ip firewall filter\"</span> <br>");


         //      html.append("add action=add-src-to-address-list address-list=\"port-knocking-first\" address-list-timeout=\""+body.getOnLoginTimeDuration()+"\" chain=input packet-size=\""+body.getFirstIcmpPacketSize()+"\" protocol=icmp comment=\"Port Knocking Generator RMikrotik.com\"\r\n" + //
           //                                 "add action=add-src-to-address-list address-list=\"port-knocking-second\" address-list-timeout=\""+body.getOnLoginTimeDuration()+"\" chain=input packet-size=\""+body.getSecondIcmpPacketSize()+"\" protocol=icmp src-address-list=\"port-knocking-first\"\r\n" + //
        //                                    "add action=accept chain=input dst-port=\""+body.getPortServiceToProtected()+"\" protocol=tcp src-address-list=\"port-knocking-second\"\r\n" + //
          //                                  "add action=drop chain=input dst-port=\""+body.getPortServiceToProtected()+"\" protocol=tcp src-address-list=\"!port-knocking-second\" <br>");
    //          html.append("/ppp profile {set [find name=\"" + body.getPppProfileName() + "\"] rate-limit=\""
    //                        + body.getRateLimit() + "\" local-address=\"" + body.getLocalServerIPAddress()
     //                       + "\" } <br>");
     //         html.append("<span class='font-black'>/ppp secret</span> <br>");

 
              return html.toString();
       }
    private String generatePlainTextScript(WifidWmsSeamlessBody body) {
              StringBuilder text = new StringBuilder();
              text.append("<span class='text-orange-400'>###################################################################</span> <br>");
              text.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator RMikrotik.com</span> <br>");
              text.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
              text.append("<span class='text-orange-400'># Created RMikrotik.com</span> <br>");
              text.append("<span class='text-orange-400'>###################################################################</span> <br>");
              text.append("<span class='font-black'>/ppp profile add name=\"default\"</span> <br>");

      //        text.append("/ppp profile {set [find name=\"" + body.getPppProfileName() + "\"] rate-limit=\""
        //                    + body.getRateLimit() + "\" local-address=\"" + body.getLocalServerIPAddress()
      //                      + "\" } <br>");
        //      text.append("<span class='font-black'>/ppp secret</span> <br>");

     

              return text.toString();
       }
}
