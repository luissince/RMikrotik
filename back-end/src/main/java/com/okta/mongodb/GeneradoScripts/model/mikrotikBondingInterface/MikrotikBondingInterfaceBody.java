package com.okta.mongodb.GeneradoScripts.model.mikrotikBondingInterface;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString

public class MikrotikBondingInterfaceBody {
    private String   bondingName_a;
    private String   bondingIPAddress_a;
    private String   bondingSlaves_a;
    private String   arpMonitoring_a;
   private String   bondingName_b;
    private String   bondingIPAddress_b;
    private String   bondingSlaves_b;
    private String   arpMonitoring_b;
 
}
