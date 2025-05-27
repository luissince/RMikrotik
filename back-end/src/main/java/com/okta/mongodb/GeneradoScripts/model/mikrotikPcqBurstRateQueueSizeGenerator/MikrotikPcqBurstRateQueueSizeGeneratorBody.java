package com.okta.mongodb.GeneradoScripts.model.mikrotikPcqBurstRateQueueSizeGenerator;

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
public class MikrotikPcqBurstRateQueueSizeGeneratorBody {
    private String totalClient;
    private String queueSize;
    private String rate;
    private String burstRate;
    private String burstTime;
    private String burstThreshold;
}
