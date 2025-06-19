package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.simpleQueueGenerator.SimpleQueueGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class SimpleQueueGeneratorService {

        private static final Logger logger = LoggerFactory.getLogger(SimpleQueueGeneratorService.class);        

        public Map<String, String> create(SimpleQueueGeneratorBody body) {
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

        private String generateHtmlScript(SimpleQueueGeneratorBody body) {
                StringBuilder html = new StringBuilder();
                html.append("<div>");
                // html.append("<span></span> <br>");

                html.append("<span class='text-orange-400'>###################################################################</span> <br>");
                html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'>###################################################################</span> <br>");
          
               
                html.append("<span class='text-green-500'>##############################################################</span> <br>");
                html.append("<span class='text-green-500'># If you want to add a game script only, you can ignore the script above</span> <br>");
                html.append("<span class='text-green-500'>##############################################################</span> <br>");

         html.append("<span class='font-black'>/queue simple</span> <br>");
         html.append("add max-limit=\""+body.getUpTotal()+"/"+body.getDownTotal()+"\" target=\""+body.getTargetLocalIP()+"\" name=\""+body.getParentNameQueue()+"\" bucket-size=\"0.1/0.1\" comment=\"Simple Queue Generator RMikrotik\"<br>");
 html.append("add max-limit=\""+body.getUpClient()+"/"+body.getDownClient()+"\" target=\""+body.getStartIPClient()+"\" name=\""+body.getClientNameQueue()+"\" parent=\""+body.getParentNameQueue()+"\" bucket-size=\""+body.getBucketSizeUp()+"/"+body.getBucketSizeDown()+"\"<br>");
               
 html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(SimpleQueueGeneratorBody body) {
                StringBuilder text = new StringBuilder();

                // text.append(" \n");
                text.append("################################################################### \n");
                text.append("# Static Routing Games Using Mangle port Generator By buananet.com \n");
                text.append("# Date/Time: " + DateUtils.currentDate() + "\n");
                text.append(" # Created By: buananet.com - fb.me/buananet.pbun \n");
                text.append("################################################################### \n");

                // /ip firewall address-list
                text.append("/ip firewall address-list \n");
                text.append("add list=LOCAL-IP address=10.0.0.0/8 comment=\"Routing Games by buananet.com\" \n");
                text.append("add list=LOCAL-IP address=172.16.0.0/12 comment=\"Routing Games by buananet.com\" \n");
                text.append("add list=LOCAL-IP address=192.168.0.0/16 comment=\"Routing Games by buananet.com\" \n");

                // /ip route
                text.append("/ip route \n");
                text.append("add gateway=x.x.x.x routing-mark=routing-game comment=\"Routing Games by buananet.com\" \n");
                text.append("############################################################## \n");
                text.append("# If you want to add a game script only, you can ignore the script above \n");
                text.append("############################################################## \n");

          

                return text.toString();
        }

}