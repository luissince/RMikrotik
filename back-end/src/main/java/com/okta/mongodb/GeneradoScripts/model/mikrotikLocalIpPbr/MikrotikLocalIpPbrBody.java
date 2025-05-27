package com.okta.mongodb.GeneradoScripts.model.mikrotikLocalIpPbr;

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
public class MikrotikLocalIpPbrBody {
    
    private String idRoutingOption;
    private String idIpOptions;
    private String idRosVersion;
    private String ispGateway;
    private String targetClientIp;
    private String routingMark;

}
