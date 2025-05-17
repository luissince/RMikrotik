package com.okta.mongodb.GeneradoScripts.constants;

import java.util.ArrayList;
import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator.VpnGameGeneratorVpn;

public final class VpnGameGenerator {

    public static final List<VpnGameGeneratorVpn> VPNS = new ArrayList<VpnGameGeneratorVpn>() {
        {
            add(new VpnGameGeneratorVpn("pptp", "pptp"));
            add(new VpnGameGeneratorVpn("sstp", "sstp"));
            add(new VpnGameGeneratorVpn("l2tp", "l2tp"));
            add(new VpnGameGeneratorVpn("ovpn", "ovpn"));
        }
    };
    
}
