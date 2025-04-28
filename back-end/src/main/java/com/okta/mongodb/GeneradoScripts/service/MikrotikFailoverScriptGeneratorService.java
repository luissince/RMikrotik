package com.okta.mongodb.GeneradoScripts.service;

import static com.okta.mongodb.GeneradoScripts.constants.MikrotikFailoverScriptGenerator.FAIL_OVER_METHODS;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikFailoverScriptGenerator.MikrotikFailoverScriptGeneratorBody;
import com.okta.mongodb.GeneradoScripts.model.mikrotikFailoverScriptGenerator.MikrotikFailoverScriptGeneratorFailOverMethod;
import com.okta.mongodb.GeneradoScripts.model.mikrotikFailoverScriptGenerator.MikrotikFailoverScriptGeneratorLines;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class MikrotikFailoverScriptGeneratorService {

        private static final Logger logger = LoggerFactory.getLogger(PccService.class);

        public Map<String, String> create(MikrotikFailoverScriptGeneratorBody body) {
                logger.info("Body recibido: {}", body);

                // Generar ambas versiones del script
                String htmlScript = generateHtmlScript(body);
                String plainTextScript = generatePlainTextScript(body);

                // // Crear respuesta con ambos formatos
                Map<String, String> response = new HashMap<>();
                response.put("html", htmlScript);
                response.put("text", plainTextScript);

                return response;
        }

        private String generateHtmlScript(MikrotikFailoverScriptGeneratorBody body) {
                StringBuilder html = new StringBuilder();
                html.append("<div>");
                html.append("<span>###############################################################</span> <br>");
                html.append("<span style='color:blue;'># MIKROTIK FAILOVER CHECK GATEWAY, RECUSIVE, NETWATCH GENERATOR</span> <br>");
                html.append("<span style='color:green;'># Date/Time:</span> <span style='color:red;'>"
                                + DateUtils.currentDate() + "</span> <br>");
                html.append("<span style='color:green;'># Created by:</span> <span style='color:red;'>buananet.com - fb.me/buananet.pbun</span> <br>");

                for (MikrotikFailoverScriptGeneratorFailOverMethod mikrotikFailoverScriptGeneratorFailOverMethod : FAIL_OVER_METHODS) {
                        if (body.getIdSelectYourFailoverMethod()
                                        .equalsIgnoreCase(mikrotikFailoverScriptGeneratorFailOverMethod.getId())) {
                                html.append(
                                                "# <span style='color:green;'># Failover Method -> <span style='color:red; font-weight:bold;'>"
                                                                + mikrotikFailoverScriptGeneratorFailOverMethod
                                                                                .getName()
                                                                + "</span></span> <br>");
                                break;
                        }
                }

                html.append("<span>###############################################################</span> <br>");

                html.append("/ip route <br>");

                if (body.getIdSelectYourFailoverMethod()
                                .equalsIgnoreCase(FAIL_OVER_METHODS.get(0).getId())) {

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {
                                html.append("add dst-address=\"0.0.0.0/0\" target-scope=\"10\" distance=\""
                                                + mikrotikFailoverScriptGeneratorLine.getDistance() + "\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getGatewayIsp() + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" <br>");
                        }

                }

                if (body.getIdSelectYourFailoverMethod()
                                .equalsIgnoreCase(FAIL_OVER_METHODS.get(1).getId())) {

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {
                                html.append("add dst-address=\"0.0.0.0/0\" target-scope=\"30\" distance=\""
                                                + mikrotikFailoverScriptGeneratorLine.getDistance()
                                                + "\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" comment=\"" + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" <br>");
                        }

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {
                                html.append("add dst-address=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" target-scope=\"10\" distance=\"1\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getGatewayIsp() + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" <br>");
                        }

                }

                if (body.getIdSelectYourFailoverMethod()
                                .equalsIgnoreCase(FAIL_OVER_METHODS.get(2).getId())) {

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {
                                html.append("add dst-address=\"0.0.0.0/0\" target-scope=\"10\" distance=\""
                                                + mikrotikFailoverScriptGeneratorLine.getDistance()
                                                + "\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" comment=\"" + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" <br>");
                        }

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {
                                html.append("add dst-address=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" target-scope=\"10\" distance=\"1\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getGatewayIsp() + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" scope=\"30\" <br>");
                        }

                        html.append("/tool netwatch<br>");

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {
                                html.append("add host=\"" + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" interval=\"5s\" down-script=\"/ip route disable [find comment=\\\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\\\"]\" up-script=\"/ip route enable [find comment=\\\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\\\"]\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp() + "\" <br>");
                        }
                }

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(MikrotikFailoverScriptGeneratorBody body) {
                StringBuilder text = new StringBuilder();
                text.append("############################################################### \n");
                text.append("# MIKROTIK FAILOVER CHECK GATEWAY, RECUSIVE, NETWATCH GENERATOR \n");
                text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
                text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");

                for (MikrotikFailoverScriptGeneratorFailOverMethod mikrotikFailoverScriptGeneratorFailOverMethod : FAIL_OVER_METHODS) {
                        if (body.getIdSelectYourFailoverMethod()
                                        .equalsIgnoreCase(mikrotikFailoverScriptGeneratorFailOverMethod.getId())) {
                                text.append("# Failover Method -> "
                                                + mikrotikFailoverScriptGeneratorFailOverMethod.getName() + " \n");
                                break;
                        }
                }

                text.append("############################################################### \n");

                text.append("/ip route \n");

                if (body.getIdSelectYourFailoverMethod()
                                .equalsIgnoreCase(FAIL_OVER_METHODS.get(0).getId())) {

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {
                                text.append("add dst-address=\"0.0.0.0/0\" target-scope=\"10\" distance=\""
                                                + mikrotikFailoverScriptGeneratorLine.getDistance() + "\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getGatewayIsp() + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" \n");
                        }

                }

                if (body.getIdSelectYourFailoverMethod()
                                .equalsIgnoreCase(FAIL_OVER_METHODS.get(1).getId())) {

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {

                                text.append("add dst-address=\"0.0.0.0/0\" target-scope=\"30\" distance=\""
                                                + mikrotikFailoverScriptGeneratorLine.getDistance() + "\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" \n");
                        }

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {

                                text.append("add dst-address=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" target-scope=\"10\" distance=\"1\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getGatewayIsp() + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" \n");
                        }

                }

                if (body.getIdSelectYourFailoverMethod()
                                .equalsIgnoreCase(FAIL_OVER_METHODS.get(2).getId())) {

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {

                                text.append("add dst-address=\"0.0.0.0/0\" target-scope=\"10\" distance=\""
                                                + mikrotikFailoverScriptGeneratorLine.getDistance() + "\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" check-gateway=\"ping\" scope=\"30\" \n");

                        }

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {

                                text.append("add dst-address=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" target-scope=\"10\" distance=\"1\" gateway=\""
                                                + mikrotikFailoverScriptGeneratorLine.getGatewayIsp() + "\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\" scope=\"30\" \n");
                        }

                        text.append("/tool netwatch<br>");

                        for (MikrotikFailoverScriptGeneratorLines mikrotikFailoverScriptGeneratorLine : body
                                        .getLines()) {

                                text.append("add host=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIpPublicCheck()
                                                + "\" interval=\"5s\" down-script=\"/ip route disable [find comment=\\\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\\\"]\" up-script=\"/ip route enable [find comment=\\\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp()
                                                + "\\\"]\" comment=\""
                                                + mikrotikFailoverScriptGeneratorLine.getIdentityIsp() + "\" \n");
                        }
                }

                return text.toString();
        }

}
