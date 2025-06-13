package com.okta.mongodb.GeneradoScripts.service;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.model.queuetreegeneratorshared.QueuetreegeneratorsharedBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;



@Service
public class QueueTreeGeneratorSharedService {



    private static final Logger logger = LoggerFactory.getLogger(QueueTreeGeneratorSharedService.class);  
     public Map<String, String> create(QueuetreegeneratorsharedBody body) {
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

 private String generateHtmlScript(QueuetreegeneratorsharedBody body) {
                StringBuilder html = new StringBuilder();
               html.append("<span class='text-orange-400'>###################################################################</span> <br>");
                html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span class='text-orange-400'>###################################################################</span> <br>");
          
             html.append("<span class='font-black'>/queue tree</span> <br>");

                html.append("add name=\""+body.getParentNameQueue()+"\" parent=\"global\" comment=\"Queue Tree Generator RMikrotik.com\"<br>");


 html.append("add max-limit=\""+body.getDownloadMaxLimit()+"\" name=\""+body.getSubQueueDownload()+"\" parent=\""+body.getParentNameQueue()+"\"<br>");


     html.append("add max-limit=\""+body.getUploadMaxLimit()+"\" name=\""+body.getSubQueueUpload()+"\" parent=\""+body.getParentNameQueue()+"\"<br>");

     //Subida - Automatico debe generarse de acuerdo a la cantidad de ip o rango que estamos ingresando
 html.append("add max-limit=\""+body.getSubUploadMaxLimit()+"\" limit-at=\"0\" packet-mark=\"U-"+body.getClientNameQueue()+"-"+body.getClientIdentity()+"\" name=\"Up-"+body.getSubQueueUpload()+"-"+body.getClientIdentity()+"\" parent=\""+body.getSubQueueUpload()+"\"<br>");
 
 
 //Descargas - Automatico debe generarse de acuerdo a la cantidad de ip o rango que estamos ingresando
 
 
 html.append("add max-limit=\""+body.getDownloadMaxLimit()+"\" limit-at=\"0\" packet-mark=\"D-"+body.getClientNameQueue()+"-"+body.getClientIdentity()+"\" name=\"Down-"+body.getClientNameQueue()+"-"+body.getClientIdentity()+"\" parent=\""+body.getSubQueueDownload()+"\"<br>");

 // UPLOAD ---De igual forma debe agregarse automatico de acuerdo al rango de ip que se genera
     html.append("<span class='font-black'>/ip firewall mangle</span> <br>");
  html.append("add action=mark-packet chain=forward src-address=\""+body.getStartIPClient()+"\" new-packet-mark=\"U-"+body.getClientNameQueue()+"-"+body.getClientIdentity()+"\" passthrough=no comment=\"Upload for IP "+body.getStartIPClient()+"\"<br>");
  
   // DESCARGAS ---De igual forma debe agregarse automatico de acuerdo al rango de ip que se genera
     
  html.append("add action=mark-packet chain=forward dst-address=\""+body.getStartIPClient()+"\" new-packet-mark=\"D-"+body.getClientNameQueue()+"-"+body.getClientIdentity()+"\" passthrough=no comment=\"Download for IP "+body.getStartIPClient()+"\"<br>");
    html.append("");

                return html.toString();
        }


 private String generatePlainTextScript(QueuetreegeneratorsharedBody body) {
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
