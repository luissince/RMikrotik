package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.constants.VpnTunnelAllTrafficScriptGenerator;
import com.okta.mongodb.GeneradoScripts.model.vpnTunnelAllTrafficScriptGeneratorController.VpnTunnelAllTrafficScriptGeneratorBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class VpnTunnelAllTrafficScriptGeneratorService {

    private static final Logger logger = LoggerFactory.getLogger(PccService.class);

    public Map<String, String> create(VpnTunnelAllTrafficScriptGeneratorBody body) {
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

    private String generateHtmlScript(VpnTunnelAllTrafficScriptGeneratorBody body) {
        StringBuilder html = new StringBuilder();

        String vpnName = VpnTunnelAllTrafficScriptGenerator.VPNS.stream()
                .filter(vpn -> vpn.getId().equals(body.getIdSelectVpnConnection()))
                .findFirst()
                .get()
                .getName();

        html.append("<div>");

        html.append(
                "<span class='text-orange-400'>###################################################################</span> <br>");
        html.append("<span class='text-orange-400'># VPN Tunnel All Traffic Script Generator By buananet.com </span> <br>");
        html.append("<span class='text-orange-400'># Date/Time: " + DateUtils.currentDate() + " </span> <br>");
        html.append("<span class='text-orange-400'># Created By: buananet.com - fb.me/buananet.pbun </span> <br>");
        html.append("<span class='text-orange-400'># VPN Protocol -> " + vpnName.toUpperCase() + " </span> <br>");
        html.append("<span class='text-orange-400'>################################################################### </span> <br>");
        
        // <span class='text-orange-400'></span>
        // /interface pptp-client
        html.append("<span class='font-black'>/interface " + vpnName.toLowerCase() + "-client </span> <br>");
        html.append(
                "<span>add connect-to=<span class='text-orange-400'>\""+body.getVpnIpAddress()+"\"</span> disabled=no name=<span class='text-orange-400'>\""+body.getCreateVpnNameOnInterfaceVpn()+"\" </span> user=<span class='text-orange-400'>\""+body.getVpnUsername()+"\"</span> password=<span class='text-orange-400'>\""+body.getVpnPassword()+"\"</span> comment=\"VPN Tunnel by buananet.com\" </span> <br>");

        // /ip firewall nat
        html.append("<span class='font-black'>/ip firewall nat </span> <br>");
        html.append(
                "<span>add chain=srcnat out-interface=<span class='text-orange-400'>\""+body.getCreateVpnNameOnInterfaceVpn()+"\"</span> action=masquerade comment=\"VPN Tunnel by buananet.com\" </span> <br>");

        // /ip route
        html.append("<span class='font-black'>/ip route </span> <br>");
        html.append("<span>add gateway=<span class='text-orange-400'></span>\""+body.getCreateVpnNameOnInterfaceVpn()+"\" distance=1 comment=\"VPN Tunnel by buananet.com\" </span> <br>");
        html.append(
                "<span>add dst-address=<span class='text-orange-400'>\""+body.getVpnIpAddress()+"\"</span> distance=1 gateway=<span class='text-orange-400'>\""+body.getTargetIpGatewayYourIsp()+"\"</span> comment=\"VPN Tunnel by buananet.com\" </span> <br>");

        html.append("</div>");
        return html.toString();
    }

    private String generatePlainTextScript(VpnTunnelAllTrafficScriptGeneratorBody body) {
        StringBuilder text = new StringBuilder();

        String vpnName = VpnTunnelAllTrafficScriptGenerator.VPNS.stream()
                .filter(vpn -> vpn.getId().equals(body.getIdSelectVpnConnection()))
                .findFirst()
                .get()
                .getName();

        text.append(" ###################################################################\n");
        text.append("# VPN Tunnel All Traffic Script Generator By buananet.com \n");
        text.append("# Date/Time: " + DateUtils.currentDate() + " \n");
        text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
        text.append("# VPN Protocol -> " + vpnName.toUpperCase() + " \n");
        text.append("################################################################### \n");

        // /interface pptp-client
        text.append("/interface " + vpnName.toLowerCase() + "-client \n");
        text.append(
                "add connect-to=\""+body.getVpnIpAddress()+"\" disabled=no name=\""+body.getCreateVpnNameOnInterfaceVpn()+"\" user=\""+body.getVpnUsername()+"\" password=\""+body.getVpnPassword()+"\" comment=\"VPN Tunnel by buananet.com\" \n");

        // /ip firewall nat
        text.append("/ip firewall nat \n");
        text.append(
                "add chain=srcnat out-interface=\""+body.getCreateVpnNameOnInterfaceVpn()+"\" action=masquerade comment=\"VPN Tunnel by buananet.com\" \n");

        // /ip route
        text.append("/ip route \n");
        text.append("add gateway=\""+body.getCreateVpnNameOnInterfaceVpn()+"\" distance=1 comment=\"VPN Tunnel by buananet.com\" \n");
        text.append(
                "add dst-address=\""+body.getVpnIpAddress()+"\" distance=1 gateway=\""+body.getTargetIpGatewayYourIsp()+"\" comment=\"VPN Tunnel by buananet.com\" \n");

        return text.toString();
    }

}
