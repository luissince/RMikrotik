package com.okta.mongodb.GeneradoScripts.model.pcc;

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
public class PccInterfaces {
    private int id;
    private String wanIsp;
    private String gatewayIsp;
}
