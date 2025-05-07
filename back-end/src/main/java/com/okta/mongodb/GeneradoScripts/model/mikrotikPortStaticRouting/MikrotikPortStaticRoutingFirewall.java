package com.okta.mongodb.GeneradoScripts.model.mikrotikPortStaticRouting;

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
public class MikrotikPortStaticRoutingFirewall {
    
    private String idProtocol;
    private String targetPort;
    private String description;

}
