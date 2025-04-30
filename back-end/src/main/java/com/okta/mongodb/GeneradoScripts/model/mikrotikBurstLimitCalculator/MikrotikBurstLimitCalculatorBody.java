package com.okta.mongodb.GeneradoScripts.model.mikrotikBurstLimitCalculator;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class MikrotikBurstLimitCalculatorBody {
    
    private String uploadMaxLimit;
    private String uploadBurstLimit;
    private int uploadBurstTime;
    private String downloadMaxLimit;
    private String downloadBurstLimit;
    private int downloadBurstTime;

}
