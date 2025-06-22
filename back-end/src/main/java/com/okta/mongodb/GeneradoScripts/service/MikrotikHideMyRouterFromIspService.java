package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikHideMyRouterFromIsp.MikrotikHideMyRouterFromIspBody;

@Service
public class MikrotikHideMyRouterFromIspService {

        private static final Logger logger = LoggerFactory.getLogger(MikrotikHideMyRouterFromIspService.class);

        public Map<String, String> create(MikrotikHideMyRouterFromIspBody body) {
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

        private String generateHtmlScript(MikrotikHideMyRouterFromIspBody body) {
                StringBuilder html = new StringBuilder();
            

                html.append("<div>");
                html.append("<span> ###############################################################</span> <br>");
                html.append("<span># MIKROTIK NINJA : HIDE ROUTERBOARD INFO FROM ISP / WAN SCANNING<span> <br>");
                html.append("<span># Created By: buananet.com<span> <br>");
                html.append("<span>###############################################################<span> <br>");

                html.append("/interface list add name=WAN-PROTECT comment=\"MikroTik Ninja by buananet.com\" <br>");
                html.append("/interface list member add interface=\""+body.getInterfaceToIsp()+"\" list=WAN-PROTECT comment=\"MikroTik Ninja RMikrotik.com\" <br>");
                
                if(body.isBlockWinboxScan()) {
                        html.append("## Block Winbox Scan <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=21,22,23,8291,80,443,8728,8729 comment=\"Block Winbox Scan - by buananet.com\" in-interface-list=WAN-PROTECT protocol=tcp <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=21,22,23,8291,80,443,8728,8729 in-interface-list=WAN-PROTECT protocol=udp <br>");                       
                }
               
                if(body.isBlockNeighborDiscovery()) {
                        html.append("## Block Neighbor Discovery <br>");
                        html.append("/ip firewall filter add action=drop chain=input comment=\"Block Neighbor Discovery - by buananet.com\" in-interface-list=WAN-PROTECT dst-port=5678 protocol=tcp <br>");
                        html.append("/ip firewall filter add action=drop chain=input in-interface-list=WAN-PROTECT dst-port=5678 protocol=udp <br>");
                        html.append("/ip neighbor discovery-settings set discover-interface-list=!WAN-PROTECT <br>");
                }

                if(body.isBlockMacAddress()) {
                        html.append("## Block MAC Address <br>");
                        html.append("/ip firewall filter add action=drop chain=input comment=\"Block MAC Address - by buananet.com\" in-interface-list=WAN-PROTECT dst-port=20561 protocol=tcp <br>");
                        html.append("/ip firewall filter add action=drop chain=input in-interface-list=WAN-PROTECT dst-port=20561 protocol=udp <br>");
                        html.append("/tool mac-server mac-winbox set allowed-interface-list=none <br>");
                        html.append("/tool mac-server set allowed-interface-list=none <br>");
                        html.append("/tool mac-server ping set enabled=no <br>");
                }

                if(body.isBlockTraceroute()) {
                        html.append("## Block Traceroute <br>");
                        html.append("/ip firewall filter add action=drop chain=input comment=\"Block Traceroute - by buananet.com\" in-interface-list=WAN-PROTECT dst-port=33434-33534 protocol=tcp <br>");
                        html.append("/ip firewall filter add action=drop chain=input in-interface-list=WAN-PROTECT dst-port=33434-33534 protocol=udp <br>");
                }

                if (body.isBlockRoMon()) {
                        html.append("## Block RoMON <br>");
                        html.append("/tool romon port add disabled=no forbid=yes comment=\"Block RoMON - by buananet.com\" interface=\""+body.getInterfaceToIsp()+"\" <br>");
                }

                if (body.isBlockOpenDns()) {
                        html.append("## Block DNS Poisoning <br>");
                        html.append("/ip firewall filter add chain=input dst-port=53 in-interface-list=WAN-PROTECT protocol=tcp action=drop comment=\"Block Open Recursive DNS - by buananet.com\" <br>");
                        html.append("/ip firewall filter add chain=input dst-port=53 in-interface-list=WAN-PROTECT protocol=udp action=drop <br>");
                }

                if (body.isBlockOpenProxy()) {
                        html.append("## Block Open PROXY <br>");
                        html.append("/ip proxy set enabled=no <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=3128,8080 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block Open PROXY - by buananet.com\" <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=3128,8080 in-interface-list=WAN-PROTECT protocol=udp <br>");
                }

                if (body.isBlockBTest()) {
                        html.append("## Block BTest Server <br>");
                        html.append("/tool bandwidth-server set enabled=no authenticate=yes <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=2000 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block BTest Server - by buananet.com\" <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=2000 in-interface-list=WAN-PROTECT protocol=udp <br>");
                }

                if (body.isBlockSnmp()) {
                        html.append("## Block SNMP <br>");
                        html.append("/snmp set enabled=no <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=161,162 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block SNMP - by buananet.com\" <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=161,162 in-interface-list=WAN-PROTECT protocol=udp <br>");
                }

                if (body.isBlockTheDude()) {
                        html.append("## Block The Dude <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=2210,2211 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block The Dude - by buananet.com\" <br>");
                        html.append("/ip firewall filter add action=drop chain=input dst-port=2210,2211 in-interface-list=WAN-PROTECT protocol=udp <br>");
                }

                if (body.isBlockIpCloud()) {
                        html.append("## Block IP Cloud <br>");
                        html.append("/ip cloud set ddns-enabled=no <br>");
                        html.append("/ip cloud advanced set use-local-address=no <br>");
                        html.append("/ip cloud set update-time=no <br>");
                }
                
                html.append("## Change MAC Interface <br>");
                html.append("/system identity set name=\""+body.getChangeRouterIdentity()+"\" <br>");
                html.append("/interface ethernet set \""+body.getInterfaceToIsp()+"\" mac-address=\""+body.getChangeRouterMacAddress()+"\" <br>");

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(MikrotikHideMyRouterFromIspBody body) {
                StringBuilder text = new StringBuilder();

                text.append("################################################################ \n");
                text.append("# MIKROTIK NINJA : HIDE ROUTERBOARD INFO FROM ISP / WAN SCANNING \n");
                text.append("# Created By: buananet.com \n");
                text.append("################################################################ \n");

                text.append("/interface list add name=WAN-PROTECT comment=\"MikroTik Ninja by buananet.com\" \n");
                text.append("/interface list member add interface=\"eth1\" list=WAN-PROTECT comment=\"MikroTik Ninja by buananet.com\" \n");

                if(body.isBlockWinboxScan()) {
                        text.append("## Block Winbox Scan \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=21,22,23,8291,80,443,8728,8729 comment=\"Block Winbox Scan - by buananet.com\" in-interface-list=WAN-PROTECT protocol=tcp \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=21,22,23,8291,80,443,8728,8729 in-interface-list=WAN-PROTECT protocol=udp \n");                       
                }
               
                if(body.isBlockNeighborDiscovery()) {
                        text.append("## Block Neighbor Discovery \n");
                        text.append("/ip firewall filter add action=drop chain=input comment=\"Block Neighbor Discovery - by buananet.com\" in-interface-list=WAN-PROTECT dst-port=5678 protocol=tcp \n");
                        text.append("/ip firewall filter add action=drop chain=input in-interface-list=WAN-PROTECT dst-port=5678 protocol=udp \n");
                        text.append("/ip neighbor discovery-settings set discover-interface-list=!WAN-PROTECT \n");
                }

                if(body.isBlockMacAddress()) {
                        text.append("## Block MAC Address \n");
                        text.append("/ip firewall filter add action=drop chain=input comment=\"Block MAC Address - by buananet.com\" in-interface-list=WAN-PROTECT dst-port=20561 protocol=tcp \n");
                        text.append("/ip firewall filter add action=drop chain=input in-interface-list=WAN-PROTECT dst-port=20561 protocol=udp \n");
                        text.append("/tool mac-server mac-winbox set allowed-interface-list=none \n");
                        text.append("/tool mac-server set allowed-interface-list=none \n");
                        text.append("/tool mac-server ping set enabled=no \n");
                }

                if(body.isBlockTraceroute()) {
                        text.append("## Block Traceroute \n");
                        text.append("/ip firewall filter add action=drop chain=input comment=\"Block Traceroute - by buananet.com\" in-interface-list=WAN-PROTECT dst-port=33434-33534 protocol=tcp \n");
                        text.append("/ip firewall filter add action=drop chain=input in-interface-list=WAN-PROTECT dst-port=33434-33534 protocol=udp \n");
                }

                if (body.isBlockRoMon()) {
                        text.append("## Block RoMON \n");
                        text.append("/tool romon port add disabled=no forbid=yes comment=\"Block RoMON - by buananet.com\" interface=\""+body.getInterfaceToIsp()+"\" \n");
                }

                if (body.isBlockOpenDns()) {
                        text.append("## Block DNS Poisoning \n");
                        text.append("/ip firewall filter add chain=input dst-port=53 in-interface-list=WAN-PROTECT protocol=tcp action=drop comment=\"Block Open Recursive DNS - by buananet.com\" \n");
                        text.append("/ip firewall filter add chain=input dst-port=53 in-interface-list=WAN-PROTECT protocol=udp action=drop \n");
                }

                if (body.isBlockOpenProxy()) {
                        text.append("## Block Open PROXY \n");
                        text.append("/ip proxy set enabled=no \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=3128,8080 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block Open PROXY - by buananet.com\" \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=3128,8080 in-interface-list=WAN-PROTECT protocol=udp \n");
                }

                if (body.isBlockBTest()) {
                        text.append("## Block BTest Server \n");
                        text.append("/tool bandwidth-server set enabled=no authenticate=yes \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=2000 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block BTest Server - by buananet.com\" \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=2000 in-interface-list=WAN-PROTECT protocol=udp \n");
                }

                if (body.isBlockSnmp()) {
                        text.append("## Block SNMP \n");
                        text.append("/snmp set enabled=no \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=161,162 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block SNMP - by buananet.com\" \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=161,162 in-interface-list=WAN-PROTECT protocol=udp \n");
                }

                if (body.isBlockTheDude()) {
                        text.append("## Block The Dude \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=2210,2211 in-interface-list=WAN-PROTECT protocol=tcp comment=\"Block The Dude - by buananet.com\" \n");
                        text.append("/ip firewall filter add action=drop chain=input dst-port=2210,2211 in-interface-list=WAN-PROTECT protocol=udp \n");
                }

                if (body.isBlockIpCloud()) {
                        text.append("## Block IP Cloud \n");
                        text.append("/ip cloud set ddns-enabled=no \n");
                        text.append("/ip cloud advanced set use-local-address=no \n");
                        text.append("/ip cloud set update-time=no \n");
                }

                text.append("## Change MAC Interface \n");
                text.append("/system identity set name=\""+body.getChangeRouterIdentity()+"\" \n");
                text.append("/interface ethernet set \""+body.getInterfaceToIsp()+"\" mac-address=\""+body.getChangeRouterMacAddress()+"\" \n");

                return text.toString();
        }
}