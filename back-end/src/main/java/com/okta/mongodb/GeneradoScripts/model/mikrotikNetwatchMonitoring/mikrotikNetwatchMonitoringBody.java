package com.okta.mongodb.GeneradoScripts.model.mikrotikNetwatchMonitoring;
import java.util.List;

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
public class mikrotikNetwatchMonitoringBody {
      private String sendingOption;
      private String botTelegram;
      private String chatIdTelegram;
      private List<mikrotikNetwatchMonitoringHost> hosts;
}
