package com.okta.mongodb.GeneradoScripts.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import com.okta.mongodb.GeneradoScripts.model.body.pcc.PccBody;
import com.okta.mongodb.GeneradoScripts.model.body.pcc.PccInterfaces;

@RestController
@RequestMapping("/pcc")
public class Pcc {

    private static final Logger logger = LoggerFactory.getLogger(Pcc.class);

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PccBody pccBody) {
        logger.info("Body recibido: {}", pccBody); // Usa SLF4J (mejor para producción)

        String structure = """
                    ###############################################################
                    # Load Balancing Per Connection Clasifier (LB PCC) Script Generator
                    # Date/Time: 23/4/2025, 11:36:47 a.m.
                    # Created by: buananet.com - fb.me/buananet.pbun
                    # Load Balancing Method -> PCC (PER CONNECTION CLASIFIER)
                    ###############################################################
                """;

        structure += """
                /ip firewall address-list
                add address=192.168.0.0/16 list=LOCAL-IP comment="LB PCC by buananet.com"
                add address=172.16.0.0/12 list=LOCAL-IP comment="LB PCC by buananet.com"
                add address=10.0.0.0/8 list=LOCAL-IP comment="LB PCC by buananet.com"
                                """;

        structure += """
                /ip firewall nat
                    """;
        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure += "add chain=srcnat out-interface=" + pccInterfaces.getWanIsp()
                    + " action=masquerade comment=\"LB PCC by buananet.com\"\n";
        }

        if (pccBody.getIdRouterVersion().equalsIgnoreCase("ros7")) {
            structure += """
                    /routing table
                        """;
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure += "add name=\"to-" + pccInterfaces.getWanIsp() + "\" fib comment=\"LB PCC by buananet.com\"";
            }
        }

        structure += """
                /ip route
                   """;
        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure += "add check-gateway=ping distance=1 gateway=" + pccInterfaces.getGatewayIsp() + " routing-mark="
                    + pccInterfaces.getWanIsp() + " comment=\"LB PCC by buananet.com\"";
        }

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure += "add check-gateway=ping distance=" + pccInterfaces.getId() + " gateway="
                    + pccInterfaces.getGatewayIsp() + " comment=\"LB PCC by buananet.com";
        }

        structure += """
                /ip firewall mangle
                add action=accept chain=prerouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment="LB PCC by buananet.com"
                add action=accept chain=postrouting dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment="LB PCC by buananet.com"
                add action=accept chain=forward dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment="LB PCC by buananet.com"
                add action=accept chain=input dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment="LB PCC by buananet.com"
                add action=accept chain=output dst-address-list=LOCAL-IP src-address-list=LOCAL-IP comment="LB PCC by buananet.com"
                   """;

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure += "add action=mark-connection chain=input in-interface=" + pccInterfaces.getWanIsp()
                    + " new-connection-mark=\"cm-" + pccInterfaces.getWanIsp()
                    + "\" passthrough=yes comment=\"LB PCC by buananet.com\"\n";
        }

        for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
            structure += "add action=mark-routing chain=output connection-mark=\"cm-" + pccInterfaces.getWanIsp()
                    + "\" new-routing-mark=\"to-" + pccInterfaces.getWanIsp()
                    + "\" passthrough=yes comment=\"LB PCC by buananet.com\"\n";
        }

        int totalInterfaces = pccBody.getInterfaces().length;

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list1")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure += "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-"
                        + pccInterfaces.getWanIsp()
                        + "\" passthrough=yes per-connection-classifier=both-addresses-and-ports:"+totalInterfaces+"/"+(pccInterfaces.getId()-1)+" dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n";
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure += "add action=mark-routing chain=prerouting connection-mark=\"cm-"
                        + pccInterfaces.getWanIsp()
                        + "\" new-routing-mark=\"to-" + pccInterfaces.getWanIsp()
                        + "\" passthrough=yes dst-address-list=!LOCAL-IP src-address-list=LOCAL-IP comment=\"LB PCC by buananet.com\"\n";
            }
        }

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list2")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure += "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-"
                        + pccInterfaces.getWanIsp()
                        + "\" passthrough=yes per-connection-classifier=both-addresses-and-ports:"+totalInterfaces+"/"+(pccInterfaces.getId()-1)+" in-interface="
                        + pccBody.getInterfaceTarget() + " comment=\"LB PCC by buananet.com\"\n";
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure += "add action=mark-routing chain=prerouting connection-mark=\"cm-"
                        + pccInterfaces.getWanIsp() + "\" new-routing-mark=\"to-" + pccInterfaces.getWanIsp()
                        + "\" passthrough=yes in-interface=" + pccBody.getInterfaceTarget()
                        + " comment=\"LB PCC by buananet.com\"\n";
            }
        }

        if (pccBody.getIdLocalTarget().equalsIgnoreCase("local-list3")) {
            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure += "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=\"cm-"
                        + pccInterfaces.getWanIsp()
                        + "\" passthrough=yes per-connection-classifier=both-addresses-and-ports:"+totalInterfaces+"/"+(pccInterfaces.getId()-1)+" in-interface-list="
                        + pccBody.getInterfaceTarget() + " comment=\"LB PCC by buananet.com\"\n";
            }

            for (PccInterfaces pccInterfaces : pccBody.getInterfaces()) {
                structure += "add action=mark-routing chain=prerouting connection-mark=\"cm-"
                        + pccInterfaces.getWanIsp() + " new-routing-mark=\"to-" + pccInterfaces.getWanIsp()
                        + "\" passthrough=yes in-interface-list=" + pccBody.getInterfaceTarget()
                        + " comment=\"LB PCC by buananet.com\"\n";
            }
        }

        Map<String, String> response = new HashMap<>();
        response.put("message", structure);
        return ResponseEntity.ok(response);
    }

}
