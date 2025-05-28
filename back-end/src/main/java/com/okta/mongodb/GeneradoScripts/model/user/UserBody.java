package com.okta.mongodb.GeneradoScripts.model.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class UserBody {

    private String providerId;
    private String name;
    private String email;
    private String image;

}
