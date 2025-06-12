package com.okta.mongodb.GeneradoScripts.model.mikrotikDhcpRogue;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString

public class MikrotikDhcpRogueBody {

   private String dhcpInterface;
   private String validMacInterface;
   private String alertTimeout;
   private String sendingOption;
   private String botTelegram;
   private String chatIdTelegram;
}
