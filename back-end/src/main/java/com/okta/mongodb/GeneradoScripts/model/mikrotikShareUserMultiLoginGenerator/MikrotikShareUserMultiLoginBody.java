package com.okta.mongodb.GeneradoScripts.model.mikrotikShareUserMultiLoginGenerator;

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
public class MikrotikShareUserMultiLoginBody {
    private String pppServiceOptions;
    private String parentNameQueue;
    private String maxLimit;
    private String targetIPAddress;
    private String profileName;
    private String sharedUser;
    private String rateLimit;
    private String userName;
    private String password;
    private Boolean autoSetForBandwidthShared;
}
