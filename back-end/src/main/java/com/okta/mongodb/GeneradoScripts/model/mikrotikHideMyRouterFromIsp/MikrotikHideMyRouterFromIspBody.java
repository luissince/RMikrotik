package com.okta.mongodb.GeneradoScripts.model.mikrotikHideMyRouterFromIsp;

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
public class MikrotikHideMyRouterFromIspBody {

    private String interfaceToIsp;
    private String changeRouterIdentity;
    private String changeRouterMacAddress;
    private boolean blockWinboxScan;
    private boolean blockNeighborDiscovery;
    private boolean blockMacAddress;
    private boolean blockTraceroute;
    private boolean blockRoMon;
    private boolean blockOpenDns;
    private boolean blockOpenProxy;
    private boolean blockBTest;
    private boolean blockSnmp;
    private boolean blockTheDude;
    private boolean blockIpCloud;
    
}
