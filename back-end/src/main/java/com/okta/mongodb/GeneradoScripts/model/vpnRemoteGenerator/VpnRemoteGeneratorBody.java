package com.okta.mongodb.GeneradoScripts.model.vpnRemoteGenerator;

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
public class VpnRemoteGeneratorBody {
    
    private String idVpnConnection;
    private String vpnNameOnInterface;
    private String vpnIpAddress;  
    private String vpnUsername;
    private String vpnPassword;

}
