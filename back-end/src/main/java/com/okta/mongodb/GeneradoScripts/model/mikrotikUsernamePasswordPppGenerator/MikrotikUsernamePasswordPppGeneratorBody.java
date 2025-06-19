package com.okta.mongodb.GeneradoScripts.model.mikrotikUsernamePasswordPppGenerator;
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
public class MikrotikUsernamePasswordPppGeneratorBody {
  
  private String  pppServiceOptions;
    private int   quantityUserPPP;
     private String  pppProfileName;
      private String rateLimit;
    private String   localServerIPAddress;
    private String   clientIPAddressStartFrom;
    private String   typeUsername;
    private String   typePassword;
}
