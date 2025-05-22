package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikPcqGenerator.MikrotikPcqGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class MikrotikPcqGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(MikrotikPcqGeneratorService.class);

    public Map<String, String> create(MikrotikPcqGeneratorBody body) {
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

    private String generateHtmlScript(MikrotikPcqGeneratorBody body) {
        StringBuilder html = new StringBuilder();
        // html.append("<span></span> <br>");
        html.append("<div>");
        html.append(
                "<span class='text-orange-400'>########################################################</span> <br>");
        html.append(
                "<span class='text-orange-400'>MIKROTIK PCQ GENERATOR FOR QUEUE TREE AND QUEUE SIMPLE</span> <br>");
        html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + "</span> <br>");
        html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun</span> <br>");
        html.append(
                "<span class='text-orange-400'>########################################################</span> <br>");
        html.append("</div>");

        // /queue type
        html.append("<span class='font-black'>/queue type</span> <br>");
        html.append("<span>add kind=pcq name=\"<span class='text-orange-400'>"+body.getPcqUploadName()+"</span>\" pcq-classifier=src-address pcq-rate=\"<span class='text-orange-400'>"+body.getPcqUpLimitClient()+"</span>\"</span> <br>");
        html.append("<span>add kind=pcq name=\"<span class='text-orange-400'>"+body.getPcqDownloadName()+"</span>\" pcq-classifier=dst-address pcq-rate=\"<span class='text-orange-400'>"+body.getPcqDownLimitClient()+"</span>\"</span> <br>");

        // /queue tree
        html.append("<span class='font-black'>/queue tree</span> <br>");
        html.append("<span>add name=\"GLOBAL-CONNECTION\" parent=global comment=\"PCQ Generator by buananet.com\"</span> <br>");
        html.append("<span>add max-limit=\"10M\" name=\"Upload-Client\" packet-mark=\"upload-client\" parent=\"GLOBAL-CONNECTION\" queue=\"PCQ-Up\"</span> <br>");
        html.append("<span>add max-limit=\"50M\" name=\"Download-Client\" packet-mark=\"download-client\" parent=\"GLOBAL-CONNECTION\" queue=\"PCQ-Down\"</span> <br>");

        return html.toString();
    }

    private String generatePlainTextScript(MikrotikPcqGeneratorBody body) {
        StringBuilder text = new StringBuilder();
        // text.append(" \n");
        text.append("######################################################## \n");
        text.append("MIKROTIK PCQ GENERATOR FOR QUEUE TREE AND QUEUE SIMPLE \n");
        text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
        text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
        text.append("######################################################## \n");

        // /queue type
        text.append("/queue type \n");
        text.append("add kind=pcq name=\""+body.getPcqUploadName()+"\" pcq-classifier=src-address pcq-rate=\""+body.getPcqUpLimitClient()+"\" \n");
        text.append("add kind=pcq name=\""+body.getPcqDownloadName()+"\" pcq-classifier=dst-address pcq-rate=\""+body.getPcqDownLimitClient()+"\" \n");

        // /queue tree
        text.append("/queue tree \n");
        text.append("add name=\"GLOBAL-CONNECTION\" parent=global comment=\"PCQ Generator by buananet.com\" \n");
        text.append("add max-limit=\"10M\" name=\"Upload-Client\" packet-mark=\"upload-client\" parent=\"GLOBAL-CONNECTION\" queue=\"PCQ-Up\" \n");
        text.append("add max-limit=\"50M\" name=\"Download-Client\" packet-mark=\"download-client\" parent=\"GLOBAL-CONNECTION\" queue=\"PCQ-Down\" \n");

        return text.toString();
    }

}
