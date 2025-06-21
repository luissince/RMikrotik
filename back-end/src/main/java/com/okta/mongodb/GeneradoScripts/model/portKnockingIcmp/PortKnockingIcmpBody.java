package com.okta.mongodb.GeneradoScripts.model.portKnockingIcmp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class PortKnockingIcmpBody {
      private String dhcpInterface;
      private String firstIcmpPacketSize;
      private String secondIcmpPacketSize;
      private String onLoginTimeDuration;
      private String portServiceToProtected;
}
