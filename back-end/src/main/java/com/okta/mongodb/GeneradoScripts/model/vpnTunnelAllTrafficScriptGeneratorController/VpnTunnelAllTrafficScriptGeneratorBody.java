package com.okta.mongodb.GeneradoScripts.model.vpnTunnelAllTrafficScriptGeneratorController;

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
public class VpnTunnelAllTrafficScriptGeneratorBody {
    
    private String idSelectVpnConnection;
    private String createVpnNameOnInterfaceVpn;
    private String vpnIpAddress;
    private String vpnUsername;
    private String vpnPassword;
    private String targetIpGatewayYourIsp;

}
