package com.okta.mongodb.GeneradoScripts.model.mikrotikPortStaticRouting;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MikrotikPortStaticRoutingBody {
    
    private String idRoutingOption;
    private String idRouterOsVersion;
    private String ipGatewayIspVpn;
    private String routingMarkTable;
    private MikrotikPortStaticRoutingFirewall[] firewalls;

}
