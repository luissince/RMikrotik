package com.okta.mongodb.GeneradoScripts.model.staticRoutingGames;

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
public class StaticRoutingGamesBody {

    private String idRouterOsVersion;
    private String gatewayToWanOrIspGame;
    private List<StaticRoutingGamesGame> games;
    
}
