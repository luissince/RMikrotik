package com.okta.mongodb.GeneradoScripts.model.remoteIpPublicStatic;

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
public class RemoteIpPublicStaticBody {
    
    private String interfaceIsp;
    private String ipGatewayIsp;
    private String idRosVersion;

}
