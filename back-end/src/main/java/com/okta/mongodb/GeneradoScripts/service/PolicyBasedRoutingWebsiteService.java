package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.policyBasedRoutingWebsite.PolicyBasedRoutingWebsiteBody;
import com.okta.mongodb.GeneradoScripts.model.policyBasedRoutingWebsite.PolicyBasedRoutingWebsiteDomain;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class PolicyBasedRoutingWebsiteService {

        private static final Logger logger = LoggerFactory.getLogger(PolicyBasedRoutingWebsiteService.class);

        public Map<String, String> create(PolicyBasedRoutingWebsiteBody body) {
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

        private String generateHtmlScript(PolicyBasedRoutingWebsiteBody body) {
                StringBuilder html = new StringBuilder();
                html.append("<div>");
                html.append(
                                "<span class='text-orange-400'>########################################################</span> <br>");
                html.append(
                                "<span class='text-orange-400'># Policy Based Routing Website \"Public IP Static\" for MikroTik</span> <br>");
                html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
                html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append(
                                "<span class='text-orange-400'>########################################################</span> <br>");

                html.append("/ip firewall address-list <br>");
                html.append(
                                "add address=<span style='color:red;'>192.168.0.0/16</span> list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add address=<span style='color:red;'>172.16.0.0/12</span> list=LOCAL-IP comment=\"RMikrotik.com\" <br>");
                html.append(
                                "add address=<span style='color:red;'>10.0.0.0/8</span> list=LOCAL-IP comment=\"RMikrotik.com\" <br>");

         

                if (body.getIdRosVersion().equalsIgnoreCase("ros6")) {
                        html.append("/ip route add check-gateway=ping distance=1 gateway=\"" + body.getIpGatewayIsp()
                                        + "\" routing-mark=\"" + body.getRoutingMark() + "\" comment=\""
                                        + body.getRoutingMark() + " - RMikrotik.com\"<br>");
                        html.append("/ip firewall mangle add action=mark-routing chain=prerouting dst-address-list=\""
                                        + body.getRoutingMark() + "-list\" new-routing-mark=\"" + body.getRoutingMark()
                                        + "\" passthrough=no src-address-list=LOCAL-IP comment=\""
                                        + body.getRoutingMark() + " - RMikrotik.com\" <br>");

                     
                        for (PolicyBasedRoutingWebsiteDomain domain : body.getDomains()) {
                                html.append("/ip firewall raw add action=add-dst-to-address-list address-list=\""
                                                + body.getRoutingMark()
                                                + "\" chain=prerouting src-address-list=LOCAL-IP dst-address-list=!LOCAL-IP content=\".\""
                                                + domain.getName() + "\" comment=\"" + body.getRoutingMark()
                                                + " - RMikrotik.com\" <br>");
                        }

                }
                if (body.getIdRosVersion().equalsIgnoreCase("ros7")) {
                        html.append("/routing table add name=\"" + body.getRoutingMark() + "\" fib comment=\""
                                        + body.getRoutingMark() + " - RMikrotik.com\" <br>");
                        html.append("/ip route add check-gateway=ping distance=1 gateway=\"" + body.getIpGatewayIsp()
                                        + "\" routing-table=\"" + body.getRoutingMark() + "\" comment=\""
                                        + body.getRoutingMark() + " - RMikrotik.com\" <br>");
                        html.append("/ip firewall mangle add action=mark-routing chain=prerouting dst-address-list=\""
                                        + body.getRoutingMark() + "-list\" new-routing-mark=\"" + body.getRoutingMark()
                                        + "\" passthrough=no src-address-list=LOCAL-IP comment=\""
                                        + body.getRoutingMark() + " - RMikrotik.com\" <br>");

                }

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(PolicyBasedRoutingWebsiteBody body) {
                StringBuilder text = new StringBuilder();
                text.append("######################################################## \n");
                text.append("# Policy Based Routing Website \"Public IP Static\" for MikroTik \n");
                text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
                text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
                text.append("######################################################## \n");
                text.append("/ip firewall address-list <br>");
                text.append(
                                "add address=<span style='color:red;'>192.168.0.0/16</span> list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append(
                                "add address=<span style='color:red;'>172.16.0.0/12</span> list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                text.append(
                                "add address=<span style='color:red;'>10.0.0.0/8</span> list=LOCAL-IP comment=\"RMikrotik.com\" \n");
                return text.toString();
        }

}
