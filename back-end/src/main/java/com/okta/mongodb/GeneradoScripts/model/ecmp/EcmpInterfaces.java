package com.okta.mongodb.GeneradoScripts.model.ecmp;

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
public class EcmpInterfaces {
    private int id;
    private String wanIsp;
    private String gatewayIsp;
}
