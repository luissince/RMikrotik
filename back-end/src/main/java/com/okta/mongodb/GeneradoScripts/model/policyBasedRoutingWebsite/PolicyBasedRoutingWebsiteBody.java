package com.okta.mongodb.GeneradoScripts.model.policyBasedRoutingWebsite;

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
public class PolicyBasedRoutingWebsiteBody {

    private String ipGatewayIsp;
    private String routingMark;
    private String idRosVersion;
    private String idRoutingOption;
    private String firstRegexp;
    private String lastRegexp;
    
}
