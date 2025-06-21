package com.okta.mongodb.GeneradoScripts.service;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.okta.mongodb.GeneradoScripts.model.mikrotikBlockSharingHotspot.MikrotikBlockSharingHotspotBody;

import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
@Service
public class MikrotikBlockSharingHotspotService {
     private static final Logger logger = LoggerFactory.getLogger(MikrotikBlockSharingHotspotService.class);  
     public Map<String, String> create(MikrotikBlockSharingHotspotBody body) {
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
        private String generateHtmlScript(MikrotikBlockSharingHotspotBody body) {
                StringBuilder html = new StringBuilder();
               html.append("<span class='text-orange-400'>###################################################################</span> <br>");
                html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'>###################################################################</span> <br>");
          return html.toString();
        }

 private String generatePlainTextScript(MikrotikBlockSharingHotspotBody body) {
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
