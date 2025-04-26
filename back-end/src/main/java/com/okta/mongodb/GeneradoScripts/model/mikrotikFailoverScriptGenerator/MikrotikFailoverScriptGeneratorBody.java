package com.okta.mongodb.GeneradoScripts.model.mikrotikFailoverScriptGenerator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class MikrotikFailoverScriptGeneratorBody {
    
    private String idSelectYourFailoverMethod;
    private String idSelectNumberYourIspLine;
    private MikrotikFailoverScriptGeneratorLines[] lines;

}
