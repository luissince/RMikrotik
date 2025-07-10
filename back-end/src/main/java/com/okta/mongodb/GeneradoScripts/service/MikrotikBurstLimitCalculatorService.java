package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikBurstLimitCalculator.MikrotikBurstLimitCalculatorBody;

@Service
public class MikrotikBurstLimitCalculatorService {

        private static final Logger logger = LoggerFactory.getLogger(MikrotikBurstLimitCalculatorService.class);

        public Map<String, Object> create(MikrotikBurstLimitCalculatorBody body) {
                logger.info("Body recibido: {}", body);

                // Convertir valores a bytes para hacer los cálculos
                double uploadMaxBytes = toBytes(body.getUploadMaxLimit());
                double uploadBurstBytes = toBytes(body.getUploadBurstLimit());
                double downloadMaxBytes = toBytes(body.getDownloadMaxLimit());
                double downloadBurstBytes = toBytes(body.getDownloadBurstLimit());
                System.out.println("Bytes: " + uploadMaxBytes + " " + uploadBurstBytes + " " + downloadMaxBytes + " "
                                + downloadBurstBytes);

                // Calcular valores de umbral (threshold)
                double uploadThresholdBytes = uploadMaxBytes * 0.75;
                double downloadThresholdBytes = downloadMaxBytes * 0.75;

                // Calcular valores de limit at
                double uploadLimitAtBytes = uploadMaxBytes * 0.125;
                double downloadLimitAtBytes = downloadMaxBytes * 0.125;

                // Calcular valores de burst time basado en la fórmula inversa
                // Si Actual Burst Time = (Threshold * Burst Time) / Burst Limit
                // Entonces Burst Time = (Actual Burst Time * Burst Limit) / Threshold
                int uploadBurstTimeValue = (int) Math
                                .ceil((body.getUploadBurstTime() * uploadBurstBytes) / uploadThresholdBytes);
                int downloadBurstTimeValue = (int) Math
                                .ceil((body.getDownloadBurstTime() * downloadBurstBytes) / downloadThresholdBytes);

                // Verificar los cálculos del tiempo de burst real
                int uploadActualBurstDuration = (int) Math
                                .ceil((uploadThresholdBytes * uploadBurstTimeValue) / uploadBurstBytes);
                int downloadActualBurstDuration = (int) Math
                                .ceil((downloadThresholdBytes * downloadBurstTimeValue) / downloadBurstBytes);

                // Formatear valores para mostrar
                String uploadThreshold = formatBytes(uploadThresholdBytes);
                String downloadThreshold = formatBytes(downloadThresholdBytes);
                String uploadLimitAt = formatBytes(uploadLimitAtBytes);
                String downloadLimitAt = formatBytes(downloadLimitAtBytes);

                // Construir la respuesta
                Map<String, String> data = new HashMap<>();
                data.put("upload-max-limit", body.getUploadMaxLimit());
                data.put("upload-burst-limit", body.getUploadBurstLimit());
                data.put("upload-threshold", uploadThreshold);
                data.put("upload-burst-time-value", String.valueOf(uploadBurstTimeValue));
                data.put("upload-actual-burst-duration", String.valueOf(uploadActualBurstDuration));
                data.put("upload-limit-at", uploadLimitAt);

                data.put("download-max-limit", body.getDownloadMaxLimit());
                data.put("download-burst-limit", body.getDownloadBurstLimit());
                data.put("download-threshold", downloadThreshold);
                data.put("download-burst-time-value", String.valueOf(downloadBurstTimeValue));
                data.put("download-actual-burst-duration", String.valueOf(downloadActualBurstDuration));
                data.put("download-limit-at", downloadLimitAt);

                // Construir la cadena de rate limit para copiar
                String rateLimit = body.getUploadMaxLimit() + "/" + body.getDownloadMaxLimit() + " " +
                                body.getUploadBurstLimit() + "/" + body.getDownloadBurstLimit() + " " +
                                uploadThreshold + "/" + downloadThreshold + " " +
                                uploadBurstTimeValue + "/" + downloadBurstTimeValue + " 8 " +
                                uploadLimitAt + "/" + downloadLimitAt;

                // Crear respuesta con ambos formatos
                Map<String, Object> response = new HashMap<>();
                response.put("data", data);
                response.put("reateLimit", rateLimit);

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

                return Math.round(bytes / 1000) + "K";

        }

}