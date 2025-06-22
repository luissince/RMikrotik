package com.okta.mongodb.GeneradoScripts.service;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.okta.mongodb.GeneradoScripts.model.mikrotikAccessBlock.MikrotikAccessBlockBody;


import org.springframework.stereotype.Service;


import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikAccessBlockService {
      private static final Logger logger = LoggerFactory.getLogger(MikrotikAccessBlockService.class);

    public Map<String, String> create(MikrotikAccessBlockBody body) {
        logger.info("Body recibido: {}", body);

                // Generar ambas versiones del script
                String htmlScript1 = generateHtmlScript1(body);
                String htmlScript2 = generateHtmlScript2(body);

                String plainTextScript1 = generatePlainTextScript1(body);
                String plainTextScript2 = generatePlainTextScript2(body);

                // Crear respuesta con ambos formatos
                Map<String, String> response = new HashMap<>();
                response.put("html1", htmlScript1);
                response.put("html2", htmlScript2);
                response.put("text1", plainTextScript1);
                response.put("text2", plainTextScript2);

                return response;
        }

    private String generateHtmlScript1(MikrotikAccessBlockBody body) {
        StringBuilder html = new StringBuilder();
      
     html.append(" html1");
        return html.toString();
    }
        private String generateHtmlScript2(MikrotikAccessBlockBody body) {
        StringBuilder html = new StringBuilder();
       html.append(" html2");
    
        return html.toString();
    }

    private String generatePlainTextScript1(MikrotikAccessBlockBody body) {
        StringBuilder text = new StringBuilder();

   

        text.append(" text1");
        return text.toString();
    }
      private String generatePlainTextScript2(MikrotikAccessBlockBody body) {
        StringBuilder text = new StringBuilder();

   

        text.append(" text 2");
        return text.toString();
    }
}
