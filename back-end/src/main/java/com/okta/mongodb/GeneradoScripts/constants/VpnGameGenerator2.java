package com.okta.mongodb.GeneradoScripts.constants;

import java.util.ArrayList;
import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator2.VpnGameGenerator2Vpn;

public final class VpnGameGenerator2 {

    public static final List<VpnGameGenerator2Vpn> VPNS = new ArrayList<VpnGameGenerator2Vpn>() {
        {
            add(new VpnGameGenerator2Vpn("pptp", "pptp"));
            add(new VpnGameGenerator2Vpn("sstp", "sstp"));
            add(new VpnGameGenerator2Vpn("l2tp", "l2tp"));
            add(new VpnGameGenerator2Vpn("ovpn", "ovpn"));
        }
    };
    
}
