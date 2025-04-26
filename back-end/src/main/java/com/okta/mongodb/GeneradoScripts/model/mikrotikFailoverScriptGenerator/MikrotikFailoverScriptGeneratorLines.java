package com.okta.mongodb.GeneradoScripts.model.mikrotikFailoverScriptGenerator;

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
public class MikrotikFailoverScriptGeneratorLines {
    private int id;
    private String identityIsp;
    private String gatewayIsp;
    private String distance;
    private String ipPublicCheck;
}
