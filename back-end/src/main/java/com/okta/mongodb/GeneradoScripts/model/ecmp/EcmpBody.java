package com.okta.mongodb.GeneradoScripts.model.ecmp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class EcmpBody {

    private String idYourLineWanIsp;
    private String idRouterOsVersion;
    private EcmpInterfaces[] interfaces;

}
