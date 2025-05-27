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
        html.append("<span>add kind=pcq name=\"" + body.getPcqUploadName() + "\" pcq-classifier=src-address pcq-rate=\""
                + body.getPcqUpLimitClient() + "\"<br>");
        html.append("<span>add kind=pcq name=\"" + body.getPcqDownloadName()
                + "\" pcq-classifier=dst-address pcq-rate=\"" + body.getPcqDownLimitClient() + "\" <br>");

        if (body.getIdQueueOption().equalsIgnoreCase("queue-tree")) {
            // /queue tree
            html.append("<span class='font-black'>/queue tree</span> <br>");
            html.append("<span>add name=\"" + body.getParentNameQueue()
                    + "\" parent=global comment=\"PCQ Generator by buananet.com\"</span> <br>");
            html.append("<span>add max-limit=\"" + body.getUploadMaxLimit() + "\" name=\"" + body.getSubQueueUpload()
                    + "\" packet-mark=\"upload-client\" parent=\"" + body.getParentNameQueue() + " queue=\""
                    + body.getPcqDownloadName() + "\" <br>");
            html.append("<span>add max-limit=\"" + body.getDownloadMaxLimit() + "\" packet-mark=\""
                    + body.getSubQueueDownload() + "\" parent=\"" + body.getParentNameQueue() + "\" queue=\""
                    + body.getPcqUploadName() + "\"<br>");

        }
        if (body.getIdQueueOption().equalsIgnoreCase("queue-simple")) {

            // /queue-simple
            html.append("<span class='font-black'>/queue simple</span> <br>");

            html.append("<span>add name=\"" + body.getParentNameQueue()
                    + "\" target=\"192.168.0.0/16,172.16.0.0/12,10.0.0.0/8\" comment=\"PCQ Generator by buananet.com\"</span> <br>");
            html.append("<span>\r\n" + //
                    "add max-limit=\"" + body.getUploadMaxLimit() + "\\" + body.getUploadMaxLimit() + "\" name=\""
                    + body.getSubQueueUpload() + "\" packet-marks=\"upload-client\" parent=\""
                    + body.getParentNameQueue() + "\" queue=\"" + body.getPcqUploadName()
                    + "/PCQ-Down\" target=\"192.168.0.0/16,172.16.0.0/12,10.0.0.0/8\"</span> <br>");
            html.append("<span>\r\n" + //
                    "add max-limit=\"" + body.getDownloadMaxLimit() + "\"/" + body.getDownloadMaxLimit()
                    + "\"\" name=\"" + body.getSubQueueDownload() + "\" packet-marks=\"download-client\" parent=\""
                    + body.getParentNameQueue() + " queue=\"PCQ-Up/" + body.getPcqDownloadName()
                    + "\" target=\"192.168.0.0/16,172.16.0.0/12,10.0.0.0/8\"</span> <br>");

        }

        // /ip firewall mangle
        html.append("<span class='font-black'>/ip firewall mangle</span> <br>");
        html.append(
                "<span>add action=mark-connection chain=forward new-connection-mark=\"global-conn\" passthrough=yes src-address-list=LOCAL-IP comment=\"PCQ Generator by buananet.com\"</span> <br>");
        html.append(
                "<span>add action=mark-packet chain=forward connection-mark=\"global-conn\" src-address-list=LOCAL-IP new-packet-mark=\"upload-client\" passthrough=no</span> <br>");
        html.append(
                "<span>add action=mark-packet chain=forward connection-mark=\"global-conn\" dst-address-list=LOCAL-IP new-packet-mark=\"download-client\" passthrough=no</span> <br>");

        // /ip firewall address-list
        html.append("<span class='font-black'>/ip firewall address-list</span> <br>");
        html.append("<span>add address=192.168.0.0/16 list=LOCAL-IP</span> <br>");
        html.append("<span>add address=172.16.0.0/12 list=LOCAL-IP</span> <br>");
        html.append("<span>add address=10.0.0.0/8 list=LOCAL-IP</span> <br>");

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
        text.append("add kind=pcq name=\"" + body.getPcqUploadName() + "\" pcq-classifier=src-address pcq-rate=\""
                + body.getPcqUpLimitClient() + "\" \n");
        text.append("add kind=pcq name=\"" + body.getPcqDownloadName() + "\" pcq-classifier=dst-address pcq-rate=\""
                + body.getPcqDownLimitClient() + "\" \n");

        // /queue tree
        text.append("<span class='font-black'>/queue tree</span> \n");
        text.append("<span>add name=\"" + body.getParentNameQueue()
                + "\" parent=global comment=\"PCQ Generator by buananet.com\"</span> \n");
        text.append("<span>add max-limit=\"" + body.getUploadMaxLimit() + "\" name=\"" + body.getSubQueueUpload()
                + "\" packet-mark=\"upload-client\" parent=\"" + body.getParentNameQueue() + " queue=\""
                + body.getPcqDownloadName() + "\" \n");
        text.append("<span>add max-limit=\"" + body.getDownloadMaxLimit() + "\" packet-mark=\""
                + body.getSubQueueDownload() + "\" parent=\"" + body.getParentNameQueue() + "\" queue=\""
                + body.getPcqUploadName() + "\"\n");

        // /ip firewall mangle
        text.append("<span class='font-black'>/ip firewall mangle</span> \n");
        text.append(
                "<span>add action=mark-connection chain=forward new-connection-mark=\"global-conn\" passthrough=yes src-address-list=LOCAL-IP comment=\"PCQ Generator by buananet.com\"</span> \n");
        text.append(
                "<span>add action=mark-packet chain=forward connection-mark=\"global-conn\" src-address-list=LOCAL-IP new-packet-mark=\"upload-client\" passthrough=no</span> \n");
        text.append(
                "<span>add action=mark-packet chain=forward connection-mark=\"global-conn\" dst-address-list=LOCAL-IP new-packet-mark=\"download-client\" passthrough=no</span> \n");

        // /ip firewall address-list
        text.append("<span class='font-black'>/ip firewall address-list</span> \n");
        text.append("<span>add address=192.168.0.0/16 list=LOCAL-IP</span> \n");
        text.append("<span>add address=172.16.0.0/12 list=LOCAL-IP</span> \n");
        text.append("<span>add address=10.0.0.0/8 list=LOCAL-IP</span> \n");
        return text.toString();
    }

}
