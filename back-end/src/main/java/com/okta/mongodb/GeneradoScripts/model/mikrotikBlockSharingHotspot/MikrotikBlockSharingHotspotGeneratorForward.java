package com.okta.mongodb.GeneradoScripts.model.mikrotikBlockSharingHotspot;

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
public class MikrotikBlockSharingHotspotGeneratorForward {
   private String id;
   private String mangleChain;
   private String localInterface;
   private String localIPAddress;
   private String changeTTL;
   private String description;
}
