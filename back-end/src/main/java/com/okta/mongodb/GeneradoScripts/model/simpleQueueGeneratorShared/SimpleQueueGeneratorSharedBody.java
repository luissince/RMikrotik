package com.okta.mongodb.GeneradoScripts.model.simpleQueueGeneratorShared;
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
public class SimpleQueueGeneratorSharedBody {


     private String  parentNameQueue;
     private String  targetLocalIP;
     private String  upTotal;
     private String  downTotal;
     private String  clientNameQueue;
     private String  clientIdentity;
     private String  startIPClient;
     private String  endIPClient;
     private String  upClient;
     private String  downClient;
     private String  upLimitAt;
     private String  downLimitAt;
     private String  autoSetBandwidth;
    
}
