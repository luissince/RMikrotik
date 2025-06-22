package com.okta.mongodb.GeneradoScripts.service;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import com.okta.mongodb.GeneradoScripts.model.mikrotikExpiredIsolatePppoeHotspot.MikrotikExpiredIsolatePppoeHotspotBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
@Service
public class MikrotikExpiredIsolatePppoeHotspotService {
      private static final Logger logger = LoggerFactory.getLogger(MikrotikBlockSharingHotspotService.class);  
     public Map<String, String> create(MikrotikExpiredIsolatePppoeHotspotBody body) {
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

  private String generateHtmlScript(MikrotikExpiredIsolatePppoeHotspotBody body) {
                StringBuilder html = new StringBuilder();
                  html.append(" <br>");
               html.append("<span class='text-orange-400'>###################################################################</span> <br>");
                html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'>###################################################################</span> <br>");

               html.append("/ip proxy set enabled=yes max-cache-size=none port="+body.getProxyPort()+" <br>");
html.append(" /ip proxy access<br>");
html.append("add action=allow dst-port="+body.getProxyPort()+" comment=\"Expired RMikrotik.com\"<br>");
html.append("add action=deny redirect-to="+body.getWanIPAddress()+":"+body.getProxyPort()+" comment=\"Expired RMikrotik.com\" dst-port=80\r\n <br>");
html.append(" /ip firewall address-list<br>");
html.append(" add list=EXPIRED address=0.0.0.0 comment=\"Expired RMikrotik.com\"<br>");
html.append(" /ip firewall filter<br>");
html.append(" /ip firewall filter add action=drop chain=forward comment=\"Expired RMikrotik.com\" dst-port=!80,"+body.getProxyPort()+" protocol=tcp src-address-list=EXPIRED <br>");
html.append("/ip firewall filter add action=drop chain=forward comment=\"Expired RMikrotik.com\" dst-port=!53,5353 protocol=udp src-address-list=EXPIRED <br>");
html.append("/ip firewall nat <br>");
html.append("add chain=dstnat src-address-list=EXPIRED protocol=tcp action=redirect to-ports="+body.getProxyPort()+" comment=\"Expired RMikrotik.com\" <br>");
html.append(" /ppp profile<br>");
html.append("add address-list=EXPIRED comment=\"Expired RMikrotik.com\" name=EXPIRED on-down=\":local username \\$\\\"user\\\";\\r\\ \\n" + //
            "/ip proxy access remove [find comment=\\\"ppp-\\$username\\\"];\\r\\ \\n" + //
            "/ip firewall address-list remove [find comment=\\\"ppp-\\$username\\\"];\" on-up=\":local username \\$\\\"user\\\";\\r\\ \\n" + //
            ":local address \\$\\\"remote-address\\\";\\r\\ \\n" + //
            "/ip proxy access add action=deny src-address=\\$address comment=\\\"ppp-\\$username\\\";\\r\\ \\n" + //
            "/ip firewall address-list add list=EXPIRED address=\\$address comment=\\\"ppp-\\$username\\\"\" <br>");
html.append(" /ip hotspot user profile<br>");
html.append(" add add-mac-cookie=no address-list=EXPIRED !mac-cookie-timeout name=EXPIRED on-login=\":local username \\$\\\"user\\\";\\r\\ \\n" + //
            ":local ipaddress \\$\\\"address\\\";\\r\\ \\n" + //
            "/ip proxy access add action=deny src-address=\\$ipaddress comment=\\\"hs-\\$username\\\";\\r\\ \\n" + //
            "/ip firewall address-list add list=EXPIRED address=\\$address comment=\\\"hs-\\$username\\\"\" on-logout=\":local username \\$user;\\r\\ \\n" + //
            "/ip hotspot cookie remove [find user=\\$username]\\r\\ \\n" + //
            "/ip proxy access remove [find comment=\\\"hs-\\$username\\\"]\\r\\ \\n" + //
            "/ip firewall address-list remove [find comment=\\\"hs-\\$username\\\"];\" shared-users=50<br>");
html.append(" <br>");
html.append(" <br>");

          return html.toString();
        }

 private String generatePlainTextScript(MikrotikExpiredIsolatePppoeHotspotBody body) {
                StringBuilder text = new StringBuilder();
text.append("<span class='text-orange-400'>###################################################################</span> <br>");
                text.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                text.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                text.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                text.append("<span class='text-orange-400'>###################################################################</span> <br>");
          
             text.append("<span class='font-black'>/queue tree</span> <br>");
          return text.toString();
        }
}



