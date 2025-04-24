package com.okta.mongodb.GeneradoScripts.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vpn-tunnel-all-traffic-script-generator")
public class VpnTunnelAllTrafficScriptGenerator {

    // @PostMapping
    // public ResponseEntity<?> create(@RequestBody BalanceoCargaBody balanceoCargaBody) {
    //     System.out.println("==============================");
    //     System.out.println(balanceoCargaBody.getLinea());
    //     System.out.println(balanceoCargaBody.getLocal());
    //     System.out.println(balanceoCargaBody.getRouter());
    //     System.out.println(balanceoCargaBody.getInterfaceTarget());


    //     for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //         System.out.println(inter.getWanInput() + " " + inter.getGatewayInput());
    //     }

    //     String comentario = """
    //             ###############################################################
    //             # Balanceo de Carga Per Connection Clasifier
    //             # Ultima Actualización | Update Script: 2024---
    //             # Createdo: script.corporacionit.com
    //             # Necesitas Soporte con el Script : +51930327563
    //             # Horario de Atención: Lunes a Sabado 8:00am - 8:00pm
    //             ###############################################################
    //                             """;

    //     String header = """
    //             /ip firewall address-list
    //             add address=192.168.0.0/16 list=LAN
    //             add address=172.16.0.0/12 list=LAN
    //             add address=10.0.0.0/8 list=LAN
    //                             """;

    //     String nat = """
    //              /ip firewall nat
    //             """;

    //     for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //         nat += "add chain=srcnat out-interface=" + inter.getWanInput() + " action=masquerade \n";
    //     }

    //     // /routing table
    //     // add name="to-ether" fib 
    //     // add name="to-ether2" fib 
      
    //     String versionrs= """
    //     /routing table
    //                     """;
    //     if (balanceoCargaBody.getRouter().equals("v7")) {
    //         for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //             versionrs += "add name=to-" + inter.getWanInput() + " fib \n";
             
    //         }
           
    //     }


    //     String route = """
    //              /ip route
    //             """;

    //     for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //         route += "add check-gateway=ping distance=1 gateway=" + inter.getGatewayInput() + " routing-mark=to-"
    //                 + inter.getWanInput() + " \n";
    //     }
    //     int distance = 1;
    //     for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //         route += "add check-gateway=ping distance=" + distance + " gateway=" + inter.getGatewayInput() + " \n";
    //         distance++;
    //     }

    //     String mangle = """
    //              /ip firewall mangle
    //             add action=accept chain=prerouting dst-address-list=LAN src-address-list=LAN
    //             add action=accept chain=postrouting dst-address-list=LAN src-address-list=LAN
    //             add action=accept chain=forward dst-address-list=LAN src-address-list=LAN
    //             add action=accept chain=input dst-address-list=LAN src-address-list=LAN
    //             add action=accept chain=output dst-address-list=LAN src-address-list=LAN
    //                        """;

    //     for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //         mangle += "add action=mark-connection chain=input in-interface=" + inter.getWanInput()
    //                 + " new-connection-mark=conn-" + inter.getWanInput() + " passthrough=yes \n";
    //     }

    //     for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //         mangle += "add action=mark-routing chain=output connection-mark=cm-" + inter.getWanInput()
    //                 + " new-routing-mark=to-" + inter.getWanInput() + " passthrough=yes \n";
    //     }

    //     // Aqui empieza
    //     int count = 0;

    //     if (balanceoCargaBody.getLocal().equals("local-ip")) {

    //         for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //             mangle += "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=cm-"
    //                     + inter.getWanInput()
    //                     + " passthrough=yes per-connection-classifier=both-addresses-and-ports:"
    //                     + balanceoCargaBody.getLinea() + "/"
    //                     + +(count++) + " dst-address-list=!LAN src-address-list=LAN  \n";
    //         }
    //         for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //             mangle += "add action=mark-routing chain=prerouting connection-mark=cm-" +
    //                     inter.getWanInput()
    //                     + " new-routing-mark=to-" + inter.getWanInput()
    //                     + " passthrough=yes dst-address-list=!LAN src-address-list=LAN \n";
    //         }

    //     }

    //     if (balanceoCargaBody.getLocal().equals("local-ip1")) {

    //         for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //             mangle += "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=cm-"
    //                     + inter.getWanInput()
    //                     + " passthrough=yes per-connection-classifier=both-addresses-and-ports:"
    //                     + balanceoCargaBody.getLinea() + "/"
    //                     + +(count++) + " in-interface=" + balanceoCargaBody.getInterfaceTarget() + "\n";
    //         }

    //         for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //             mangle += "add action=mark-routing chain=prerouting connection-mark=cm-" + inter.getWanInput()
    //                     + " new-routing-mark=to-" + inter.getWanInput()
    //                     + " passthrough=yes in-interface=" + balanceoCargaBody.getInterfaceTarget() + "\n";
    //         }
    //     }

    //     if (balanceoCargaBody.getLocal().equals("local-ip2")) {

    //         for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //             mangle += "add action=mark-connection chain=prerouting dst-address-type=!local new-connection-mark=cm-"
    //                     + inter.getWanInput()
    //                     + " passthrough=yes per-connection-classifier=both-addresses-and-ports:"
    //                     + balanceoCargaBody.getLinea() + "/"
    //                     + +(count++) + " in-interface-list=" + balanceoCargaBody.getInterfaceTarget() + "\n";
    //         }

    //         for (LineInterfacesBody inter : balanceoCargaBody.getInterfaces()) {
    //             mangle += "add action=mark-routing chain=prerouting connection-mark=cm-" + inter.getWanInput()
    //                     + " new-routing-mark=to-" + inter.getWanInput()
    //                     + " passthrough=yes in-interface-list=" + balanceoCargaBody.getInterfaceTarget() + "\n";
    //         }
    //     }

      
    //     String message = "";
    //     message += comentario;
    //     message += header;
    //     message += nat;
    //     message += versionrs;
    //     message += route;
    //     message += mangle;
        
    //     Map<String, String> response = new HashMap<>();
    //     response.put("message", message);
    //     return ResponseEntity.ok(response);
    // }

}
