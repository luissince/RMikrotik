package com.okta.mongodb.GeneradoScripts.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.okta.mongodb.GeneradoScripts.model.mikrotikUsernamePasswordPppGenerator.MikrotikUsernamePasswordPppGeneratorBody;

import com.okta.mongodb.GeneradoScripts.utils.DateUtils;
import com.okta.mongodb.GeneradoScripts.utils.GeneratePassword;

@Service
public class MikrotikUsernamePasswordPppGeneratorService {
       private static final Logger logger = LoggerFactory.getLogger(MikrotikUsernamePasswordPppGeneratorService.class);

       public Map<String, String> create(MikrotikUsernamePasswordPppGeneratorBody body) {
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

       private String generateHtmlScript(MikrotikUsernamePasswordPppGeneratorBody body) {
              StringBuilder html = new StringBuilder();
              html.append("<span class='text-orange-400'>###################################################################</span> <br>");
              html.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
              html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
              html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
              html.append("<span class='text-orange-400'>###################################################################</span> <br>");
              html.append("<span class='font-black'>/ppp profile add name=\"default\"</span> <br>");

              html.append("/ppp profile {set [find name=\"" + body.getPppProfileName() + "\"] rate-limit=\""
                            + body.getRateLimit() + "\" local-address=\"" + body.getLocalServerIPAddress()
                            + "\" } <br>");
              html.append("<span class='font-black'>/ppp secret</span> <br>");

              switch (body.getTypePassword().toLowerCase()) {

                     case "01":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + body.getTypeUsername() + "" + (i + 1) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "02":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + GeneratePassword.run(5, null) + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;

                     case "03":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + body.getTypeUsername() + ""
                                                 + GeneratePassword.run(5, null) + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "04":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + body.getTypeUsername() + ""
                                                 + body.getLocalServerIPAddress() + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "05":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + body.getTypeUsername() + ""
                                                 + body.getLocalServerIPAddress() + "\" password=\""
                                                 + body.getLocalServerIPAddress() + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "06":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + GeneratePassword.run(3, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "07":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + GeneratePassword.run(4, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "08":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   html.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
              }

              return html.toString();
       }

       private String generatePlainTextScript(MikrotikUsernamePasswordPppGeneratorBody body) {
              StringBuilder text = new StringBuilder();
              text.append("<span class='text-orange-400'>###################################################################</span> <br>");
              text.append("<span class='text-orange-400'># Static Routing Games Using Mangle port Generator By buananet.com</span> <br>");
              text.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
              text.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
              text.append("<span class='text-orange-400'>###################################################################</span> <br>");
              text.append("<span class='font-black'>/ppp profile add name=\"default\"</span> <br>");

              text.append("/ppp profile {set [find name=\"" + body.getPppProfileName() + "\"] rate-limit=\""
                            + body.getRateLimit() + "\" local-address=\"" + body.getLocalServerIPAddress()
                            + "\" } <br>");
              text.append("<span class='font-black'>/ppp secret</span> <br>");

              switch (body.getTypePassword().toLowerCase()) {

                     case "01":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + body.getTypeUsername() + "" + (i + 1) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "02":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + GeneratePassword.run(5, null) + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;

                     case "03":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + body.getTypeUsername() + ""
                                                 + GeneratePassword.run(5, null) + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "04":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + body.getTypeUsername() + ""
                                                 + body.getLocalServerIPAddress() + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "05":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + body.getTypeUsername() + ""
                                                 + body.getLocalServerIPAddress() + "\" password=\""
                                                 + body.getLocalServerIPAddress() + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "06":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + GeneratePassword.run(3, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "07":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + GeneratePassword.run(4, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
                     case "08":
                            for (int i = 0; i < body.getQuantityUserPPP(); i++) {
                                   // Condición de ejemplo: si el índice es par, muestra un texto diferente
                                   text.append("add name=\"" + body.getTypeUsername() + "" + (i + 1) + "\" password=\""
                                                 + GeneratePassword.run(5, null) + "\" profile=\""
                                                 + body.getPppProfileName() + "\" local-address=\""
                                                 + body.getLocalServerIPAddress() + "\" remote-address=\""
                                                 + body.getClientIPAddressStartFrom() + "\" service=\""
                                                 + body.getPppServiceOptions() + "\"<br>");
                            }

                            break;
              }

              return text.toString();
       }

}
