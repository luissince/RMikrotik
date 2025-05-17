package com.okta.mongodb.GeneradoScripts.model.vpnGameGenerator2;

import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.games.GamesGame;

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
public class VpnGameGenerator2Body {
    
    private String idVpnConnection;
    private String vpnNameOnInterface;
    private String vpnIpAddress;
    private String vpnUsername;
    private String vpnPassword;
    private boolean ipGatewayIspGame;
    private String ipGatewayIspGameValue;
    private List<GamesGame> games;  

}
