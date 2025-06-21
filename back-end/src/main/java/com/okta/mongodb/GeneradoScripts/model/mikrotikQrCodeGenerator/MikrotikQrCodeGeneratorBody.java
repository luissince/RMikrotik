package com.okta.mongodb.GeneradoScripts.model.mikrotikQrCodeGenerator;
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
public class MikrotikQrCodeGeneratorBody {
    
 private String routerOption;
  private String ssid;
  private String dnsName;
  private String username;
  private String password;
  private String templateSize;



}
