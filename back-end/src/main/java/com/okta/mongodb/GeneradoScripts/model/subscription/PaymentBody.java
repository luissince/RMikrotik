package com.okta.mongodb.GeneradoScripts.model.subscription;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class PaymentBody {
    private String providerId;
    private Long planId;
    private String method;
}
