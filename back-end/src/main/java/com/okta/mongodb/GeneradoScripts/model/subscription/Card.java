package com.okta.mongodb.GeneradoScripts.model.subscription;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class Card {
    private String number;
    private String expiry;
    private String cvv;
    private String name;
}
