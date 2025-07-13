package com.okta.mongodb.GeneradoScripts.model.mikrotikchangemacaddress;

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
public class MikrotikChangeMacAddressBody {
    private String interfaceName;
    private String macOption;
    private String macAddress;
}
