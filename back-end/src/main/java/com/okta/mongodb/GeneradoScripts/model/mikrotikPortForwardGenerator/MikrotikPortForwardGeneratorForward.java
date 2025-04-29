package com.okta.mongodb.GeneradoScripts.model.mikrotikPortForwardGenerator;

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
public class MikrotikPortForwardGeneratorForward {

    private String idProtocol;
    private String remoteIp;
    private String remotePort;
    private String targetIp;
    private String targetPort;
    private String description;
    
}
