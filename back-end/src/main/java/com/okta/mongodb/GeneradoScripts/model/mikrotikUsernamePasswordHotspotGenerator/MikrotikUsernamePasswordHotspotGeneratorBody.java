package com.okta.mongodb.GeneradoScripts.model.mikrotikUsernamePasswordHotspotGenerator;

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
public class MikrotikUsernamePasswordHotspotGeneratorBody {
  private String pppServiceOptions;
  private int qtyUserHotspot;
  private String profileHotspot;
  private String rateLimitUp;
  private String rateLimitUnitUp;
  private String rateLimitDown;
  private String rateLimitUnitDown;
  private String limitUptime;
  private String limitQuota;
  private String limitQuotaUnit;
  private String typeUsername;
  private String typePassword;
  private String isUsingQr;
}
