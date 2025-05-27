package com.okta.mongodb.GeneradoScripts.constants;

import java.util.ArrayList;
import java.util.List;
import com.okta.mongodb.GeneradoScripts.model.vpnRemoteGenerator.VpnRemoteSelectOption;
import com.okta.mongodb.GeneradoScripts.model.vpnRemoteGenerator.VpnRemoteRoutingOsVersion;

public final class VpnRemoteGenerator {

    public static final List<VpnRemoteSelectOption> OPTIONS = new ArrayList<VpnRemoteSelectOption>() {
        {
            add(new VpnRemoteSelectOption("pptp", "PPTP - Point to Point Tunneling Protocol"));
            add(new VpnRemoteSelectOption("l2tp", "Layer Two Tunneling Protocol"));
            add(new VpnRemoteSelectOption("ovpn", "Open VPN (Virtual Private Network)"));
        }

    };

    public static final List<VpnRemoteRoutingOsVersion> OS_VERSIONS = new ArrayList<VpnRemoteRoutingOsVersion>() {
        {
            add(new VpnRemoteRoutingOsVersion("ros6", "RouterOS v6.xx"));
            add(new VpnRemoteRoutingOsVersion("ros7", "RuoterOS v7.xx"));
        }
    };

}
