package com.okta.mongodb.GeneradoScripts.constants;

import java.util.ArrayList;
import java.util.List;

import com.okta.mongodb.GeneradoScripts.model.mikrotikBackupToMail.MikrotikBackupToMailBackupEntry;

public final class MikrotikBackupTomail {

    public static final List<MikrotikBackupToMailBackupEntry> BACKUP_ENTRIES = new ArrayList<MikrotikBackupToMailBackupEntry>() {
        {
            add(new MikrotikBackupToMailBackupEntry("allbackup", "backupfile"));
            add(new MikrotikBackupToMailBackupEntry("allrsc", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("queuesimplersc", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("queuetreersc", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("manglersc", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("hotspotrsc", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("ppprsc", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("addresslistrsc", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("ipaddress", "backupfilersc"));
            add(new MikrotikBackupToMailBackupEntry("routing", "backupfilersc"));
        }
    };
    
}
