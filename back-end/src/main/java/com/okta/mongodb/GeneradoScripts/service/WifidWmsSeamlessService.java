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




      switch (body.getTargetInterface().toLowerCase()) {

                        case "wlan1":
                                html.append("/interface wireless set [ find default-name="+body.getWlan()+"] name="+body.getWlan()+" comment=\"WiFi.id Generator RMikrotik.com\"\r\n <br>" + //
                              "/interface wireless set [ find default-name=wlan2] name=wlan2 comment=\"WiFi.id Generator RMikrotik.com\"\r\n <br>" + //
                              "/ip firewall nat <br>   add chain=srcnat out-interface=\""+body.getWlan()+"\" action=masquerade comment=\"WiFi.id Generator RMikrotik.com\"\r\n <br>" + //
                              "/ip dhcp-client\r\n <br>" + //
                              "add default-route-distance=1 comment=\"WiFi.id Generator by buananet.com\" disabled=no interface=\""+body.getWlan()+"\"\r\n <br>" + //
                              "/interface wireless security-profiles\r\n <br>" + //
                              "add comment=\"WiFi.id Generator by buananet.com\" authentication-types=wpa-eap,wpa2-eap eap-methods=peap mode=dynamic-keys \\ mschapv2-password=\""+body.getPassword()+"\" mschapv2-username=\""+body.getUsername()+"\" radius-mac-accounting=yes radius-mac-authentication=yes \\ supplicant-identity=\""+body.getUsername()+"\" name=\"Seamless.wifi.id\" tls-mode=dont-verify-certificate\r\n <br>" + //
                              "/interface wireless\r\n <br>" + //
                              "set [ find default-name=\""+body.getTargetInterface()+"\" ] disabled=no installation=outdoor name=\""+body.getWlan()+"\" security-profile=\"Seamless.wifi.id\" wireless-protocol=802.11 <br>");
                                break;

                        case "wlan2":
                                 html.append("/interface wireless set [ find default-name=wlan1] name=wlan1 comment=\"WiFi.id Generator RMikrotik.com\"\r\n <br>" + //
                              "/interface wireless set [ find default-name=wlan2] name=wlan2 comment=\"WiFi.id Generator RMikrotik.com\"\r\n <br>" + //
                              "/ip firewall nat <br>   add chain=srcnat out-interface=\""+body.getWlan()+"\" action=masquerade comment=\"WiFi.id Generator RMikrotik.com\"\r\n <br>" + //
                              "/ip dhcp-client\r\n <br>" + //
                              "add default-route-distance=1 comment=\"WiFi.id Generator by buananet.com\" disabled=no interface=\""+body.getWlan()+"\"\r\n <br>" + //
                              "/interface wireless security-profiles\r\n <br>" + //
                              "add comment=\"WiFi.id Generator by buananet.com\" authentication-types=wpa-eap,wpa2-eap eap-methods=peap mode=dynamic-keys \\ mschapv2-password=\""+body.getPassword()+"\" mschapv2-username=\""+body.getUsername()+"\" radius-mac-accounting=yes radius-mac-authentication=yes \\ supplicant-identity=\""+body.getUsername()+"\" name=\"Seamless.wifi.id\" tls-mode=dont-verify-certificate\r\n <br>" + //
                              "/interface wireless\r\n <br>" + //
                              "set [ find default-name=\""+body.getTargetInterface()  +"\" ] disabled=no installation=outdoor name=\""+body.getTargetInterface()+"\" security-profile=\"Seamless.wifi.id\" wireless-protocol=802.11 <br>");
                                break;


                }
                // html.append("<span></span> <br>");

                html.append("</div>");
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
