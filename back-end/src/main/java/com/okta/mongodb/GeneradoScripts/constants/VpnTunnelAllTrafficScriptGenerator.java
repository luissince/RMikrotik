package com.okta.mongodb.GeneradoScripts.constants;

import java.util.ArrayList;
import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.vpnTunnelAllTrafficScriptGeneratorController.VpnTunnelAllTrafficScriptGeneratorVpn;

public final class VpnTunnelAllTrafficScriptGenerator {
    
      public static final List<VpnTunnelAllTrafficScriptGeneratorVpn> VPNS = new ArrayList<VpnTunnelAllTrafficScriptGeneratorVpn>() {
        {
            add(new VpnTunnelAllTrafficScriptGeneratorVpn("pptp", "pptp"));
            add(new VpnTunnelAllTrafficScriptGeneratorVpn("sstp", "sstp"));
            add(new VpnTunnelAllTrafficScriptGeneratorVpn("l2tp", "l2tp"));
            add(new VpnTunnelAllTrafficScriptGeneratorVpn("ovpn", "ovpn"));
        }
    };
    
}
