package com.okta.mongodb.GeneradoScripts.model.mikrotikBackupToMail;

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
public class MikrotikBackupToMailBody {
    
    private String emailServer;
    private String emailPort;
    private String idRouterOsVersion;
    private String emailUser;
    private String emailPassword;
    private String idBackupFileOption;
    private String sendBackupFileToEmail;
    private String routerDescriptionEmailTitle;
    private String schedulerSedingEmail;
}
