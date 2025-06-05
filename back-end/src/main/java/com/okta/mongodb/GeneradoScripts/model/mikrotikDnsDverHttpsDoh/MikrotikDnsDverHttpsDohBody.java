package com.okta.mongodb.GeneradoScripts.model.mikrotikDnsDverHttpsDoh;
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
public class MikrotikDnsDverHttpsDohBody {


   private String   dnsIPv4Server1;
 private String  dnsIPv4Server2;
 private String  dnsIPv6Server1;
 private String  dnsIPv6Server2;
 private String  dohServer;
  private String dohHostname;
}
