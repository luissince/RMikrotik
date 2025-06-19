package com.okta.mongodb.GeneradoScripts.model.mikrotikBlockSharingHotspot;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString


public class MikrotikBlockSharingHotspotBody {
    

   private String   id;
   private String   mangleChain;
   private String   localInterface;
   private String   localIPAddress;
   private String   changeTTL;
   private String   description;
}
