package com.okta.mongodb.GeneradoScripts.model.mikrotikQueueQos;

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
public class QueueQosServiceBody {
     

  private String idRoutingOptions;
  private String idRosVersion;
  private String ispGateway;
  private String routingMark;
  private String maxLimit;
  private String priority;

}
