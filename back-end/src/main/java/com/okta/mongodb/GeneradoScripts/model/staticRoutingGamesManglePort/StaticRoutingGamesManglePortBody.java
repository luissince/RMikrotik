package com.okta.mongodb.GeneradoScripts.model.staticRoutingGamesManglePort;

import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.games.GamesGame;

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
public class StaticRoutingGamesManglePortBody {
    
    private String idRouterOsVersion;
    private String gatewayToWanOrIspGame;
    private List<GamesGame> games;

}
