package com.okta.mongodb.GeneradoScripts.constants;

import java.util.ArrayList;
import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.mikrotikPortStaticRouting.MikrotikPortStaticRoutingOption;
import com.okta.mongodb.GeneradoScripts.model.mikrotikPortStaticRouting.MikrotikPortStaticRoutingOsVersion;

public class MikrotikPortStaticRouting {
    
    public static final List<MikrotikPortStaticRoutingOption> OPTIONS = new ArrayList<MikrotikPortStaticRoutingOption>() {
        {
            add(new MikrotikPortStaticRoutingOption("01", "Only Port Mangle Routing"));
            add(new MikrotikPortStaticRoutingOption("02", "Port To IP Routing Use RAW"));
            add(new MikrotikPortStaticRoutingOption("03", "Port To IP Routing Use Filter"));
        }
    };

    public static final List<MikrotikPortStaticRoutingOsVersion> OS_VERSIONS = new ArrayList<MikrotikPortStaticRoutingOsVersion>() {
        {
            add(new MikrotikPortStaticRoutingOsVersion("ros6", "RouterOS v6.xx"));
            add(new MikrotikPortStaticRoutingOsVersion("ros7", "RuoterOS v7.xx"));
        }
    };

}
