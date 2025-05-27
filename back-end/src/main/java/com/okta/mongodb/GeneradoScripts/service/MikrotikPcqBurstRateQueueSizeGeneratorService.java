package com.okta.mongodb.GeneradoScripts.service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import com.okta.mongodb.GeneradoScripts.model.mikrotikPcqBurstRateQueueSizeGenerator.MikrotikPcqBurstRateQueueSizeGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class MikrotikPcqBurstRateQueueSizeGeneratorService {
    
 private static final Logger logger = LoggerFactory.getLogger(MikrotikPcqBurstRateQueueSizeGeneratorBody.class);


public Map<String, Object> calculateBurst(int totalClient, int queueSize, String rate, String burstRate, int burstTime) {
        // Convertir valores a bytes para hacer los cálculos
        double rateBytes = toBytes(rate);
        double burstRateBytes = toBytes(burstRate);

        // Calcular el tamaño total de la cola
        int totalQueueSize = totalClient * queueSize;

        // Calcular el umbral de ráfaga
        double burstThreshold = rateBytes * 0.75;

        // Calcular el tiempo de ráfaga real
        double actualBurstTime = (burstThreshold * burstTime) / burstRateBytes;

        // Construir la respuesta
        Map<String, Object> data = new HashMap<>();
        data.put("Total Client", totalClient);
        data.put("Queue Size", queueSize);
        data.put("Total Queue Size", totalQueueSize);
        data.put("Rate", rate);
        data.put("Burst Rate", burstRate);
        data.put("Burst Threshold", formatBytes(burstThreshold));
        data.put("Burst Time", burstTime);
        data.put("Actual Burst Time", actualBurstTime);

        // Construir la cadena de resultado para copiar
        String result = String.format("Total Queue Size: %d, Burst Threshold: %s, Actual Burst Time: %.2f",
                totalQueueSize, formatBytes(burstThreshold), actualBurstTime);

        // Crear respuesta con ambos formatos
        Map<String, Object> response = new HashMap<>();
        response.put("data", data);
        response.put("result", result);

        return response;
    }

    // Método para convertir valores como "1M" o "512K" a bytes
    private double toBytes(String value) {
        if (value == null || value.isEmpty()) {
            return 0;
        }

        value = value.toUpperCase();
        if (value.endsWith("K")) {
            return Double.parseDouble(value.substring(0, value.length() - 1)) * 1000;
        } else if (value.endsWith("M")) {
            return Double.parseDouble(value.substring(0, value.length() - 1)) * 1000000;
        }
        return Double.parseDouble(value);
    }

    // Método para formatear bytes a K/M
    private String formatBytes(double bytes) {
        if (bytes >= 1000000) {
            return Math.round(bytes / 1000000) + "M";
        } else if (bytes >= 1000) {
            return Math.round(bytes / 1000) + "K";
        }
        return Math.round(bytes) + "B";
    }

    public static void main(String[] args) {
        MikrotikPcqBurstRateQueueSizeGeneratorService calculator = new MikrotikPcqBurstRateQueueSizeGeneratorService();
        Map<String, Object> result = calculator.calculateBurst(40, 50, "512K", "1M", 16);
        System.out.println(result);
    }
}



































//     public Map<String, String> create(MikrotikPcqBurstRateQueueSizeGeneratorBody body) {
//         logger.info("Body recibido: {}", body);

//         // Generar ambas versiones del script
//         String htmlScript = generateHtmlScript(body);
//         String plainTextScript = generatePlainTextScript(body);

//         // Crear respuesta con ambos formatos
//         Map<String, String> response = new HashMap<>();
//         response.put("html", htmlScript);
//         response.put("text", plainTextScript);

//         return response;
    
// }
//  private String generateHtmlScript(MikrotikPcqBurstRateQueueSizeGeneratorBody body) {
//         StringBuilder html = new StringBuilder();
     
   

//         return html.toString();
//     }

    // private String generatePlainTextScript(MikrotikPcqBurstRateQueueSizeGeneratorBody body) {
    //     StringBuilder text = new StringBuilder();
    //     text.append("######################################################## \n");
    //     text.append("# MikroTik Local Client IP Static Routing (Policy Based Routing) \n");
    //     text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
    //     text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
    //     text.append("######################################################## \n");

    //     return text.toString();
    // }

//}
