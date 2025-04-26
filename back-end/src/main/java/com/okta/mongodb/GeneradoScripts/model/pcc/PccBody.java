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
public class PccBody {
    private String idLineWan;
    private String idRouterVersion;
    private String idLocalTarget;
    private String interfaceTarget;
    private PccInterfaces[] interfaces;
    
}
