package com.okta.mongodb.GeneradoScripts.model.subscription;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class ActiveBody {
    private Long id;
    private String providerId;
}
