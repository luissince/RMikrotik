package com.okta.mongodb.GeneradoScripts.model.mikrotikStaticRouting;

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
public class MikrotikStaticRoutingBody {
    
    private String idRoutingOption;
    private String idRosVersion;
    private String ispGateway;
    private String routingMark;

}
