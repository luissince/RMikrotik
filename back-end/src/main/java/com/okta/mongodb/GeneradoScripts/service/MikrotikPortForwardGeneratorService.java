package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.constants.MikrotikPortForwardGenerator;
import com.okta.mongodb.GeneradoScripts.model.mikrotikPortForwardGenerator.MikrotikPortForwardGeneratorBody;
import com.okta.mongodb.GeneradoScripts.model.mikrotikPortForwardGenerator.MikrotikPortForwardGeneratorForward;

@Service
public class MikrotikPortForwardGeneratorService {

        private static final Logger logger = LoggerFactory.getLogger(MikrotikPortForwardGeneratorService.class);

        public Map<String, String> create(MikrotikPortForwardGeneratorBody body) {
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

        private String generateHtmlScript(MikrotikPortForwardGeneratorBody body) {
                StringBuilder html = new StringBuilder();

                for (MikrotikPortForwardGeneratorForward forward : body.getForwards()) {
                        String protocol = forward.getIdProtocol() == MikrotikPortForwardGenerator.TCP ? "tcp" : "udp";
                        html.append("<span>/ip firewall nat add action=dst-nat chain=dstnat protocol=" + protocol
                                        + " dst-address=\"" + forward.getRemoteIp() + "\" dst-port=\""
                                        + forward.getRemotePort() + "\" to-addresses=\"" + forward.getTargetIp()
                                        + "\" to-ports=\"" + forward.getTargetPort() + "\" comment=\""
                                        + forward.getDescription() + " - port forwarding by buananet.com\"</span> <br>");
                }

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(MikrotikPortForwardGeneratorBody body) {
                StringBuilder text = new StringBuilder();

                for (MikrotikPortForwardGeneratorForward forward : body.getForwards()) {
                        String protocol = forward.getIdProtocol() == MikrotikPortForwardGenerator.TCP ? "tcp" : "udp";
                        text.append("/ip firewall nat add action=dst-nat chain=dstnat protocol=" + protocol
                                        + " dst-address=\"" + forward.getRemoteIp() + "\" dst-port=\""
                                        + forward.getRemotePort() + "\" to-addresses=\"" + forward.getTargetIp()
                                        + "\" to-ports=\"" + forward.getTargetPort() + "\" comment=\""
                                        + forward.getDescription() + " - port forwarding by buananet.com\" \n");
                }

                return text.toString();
        }
}