package com.okta.mongodb.GeneradoScripts.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikBackupToMail.MikrotikBackupToMailBackupEntry;
import com.okta.mongodb.GeneradoScripts.model.mikrotikBackupToMail.MikrotikBackupToMailBody;
import com.okta.mongodb.constants.MikrotikBackupTomail;
import com.okta.mongodb.utils.DateUtils;

@Service
public class MikrotikBackupToMailService {

        private static final Logger logger = LoggerFactory.getLogger(MikrotikBackupToMailService.class);

        public Map<String, String> create(MikrotikBackupToMailBody body) {
                logger.info("Body recibido: {}", body);

                // Generar ambas versiones del script
                String htmlScript = generateHtmlScript(body);
                String plainTextScript = generatePlainTextScript(body);

                // Crear respuesta con ambos formatos
                Map<String, String> response = new HashMap<>();
                response.put("html", htmlScript);
                response.put("text", plainTextScript);

                return response;
        }

        private String generateHtmlScript(MikrotikBackupToMailBody body) {
                StringBuilder html = new StringBuilder();

                Optional<MikrotikBackupToMailBackupEntry> backupEntryOptional = MikrotikBackupTomail.BACKUP_ENTRIES
                                .stream()
                                .filter(entry -> entry.getId().equals(body.getIdBackupFileOption()))
                                .findFirst();

                boolean isBackupFile = backupEntryOptional.isPresent()
                                ? backupEntryOptional.get().getId().equals("allbackup") ? true : false
                                : false;
                String globlalName = backupEntryOptional.map(MikrotikBackupToMailBackupEntry::getName).orElse("none");

                html.append("<div>");
                html.append("<span>###############################################################</span> <br>");
                html.append("<span style='color:blue;'># Mikrotik RouterOS Auto Backup to E-Mail Generator</span> <br>");
                html.append("<span style='color:green;'># Date/Time:</span> <span style='color:red;'>"+DateUtils.currentDate()+"</span> <br>");
                html.append("<span style='color:green;'># Created By:</span> <span style='color:red;'>buananet.com - fb.me/buananet.pbun</span> <br>");
                html.append("<span>###############################################################</span> <br>");

                if (body.getIdRouterOsVersion().equalsIgnoreCase("ROS6")) {
                        html.append("/tool e-mail set address=\"74.125.200.109\" from=\"backupsi\"");
                        html.append("password=\"wvewfprmnymfepdx\" port=\"587\" start-tls=yes");
                        html.append("user=\"backup.mikrotik.ros@gmail.com\" <br>");
                }

                if (body.getIdRouterOsVersion().equalsIgnoreCase("ROS7")) {
                        html.append("/tool e-mail set address=\"74.125.200.109\" from=\"backupsi\"");
                        html.append("password=\"wvewfprmnymfepdx\" port=\"587\" tls=starttls");
                        html.append("user=\"backup.mikrotik.ros@gmail.com\" <br>");
                }

                if (body.getIdRouterOsVersion().equalsIgnoreCase("ROS7+")) {
                        html.append("/tool e-mail set server=\"74.125.200.109\" from=\"backupsi\"");
                        html.append("password=\"wvewfprmnymfepdx\" port=\"587\" tls=starttls");
                        html.append("user=\"backup.mikrotik.ros@gmail.com\" <br>");
                }

                html.append("/system scheduler rem [find name=BACKUP-TO-EMAIL] <br>");
                html.append("/system scheduler add interval=3d name=BACKUP-TO-EMAIL on-event=\"#=======================================================\\r\\ <br>");
                html.append("\\n# Mikrotik RouterOS Auto Backup to E-Mail by buananet.com\\r\\ <br>");
                html.append("\\n#=======================================================\\r\\ <br>");
                html.append("\\n:global date [/system clock get date]\\r\\ <br>");
                html.append("\\n:global d [:pick \\$date 4 6]\\r\\ <br>");
                html.append("\\n:global m [:pick \\$date 0 3] \\r\\ <br>");
                html.append("\\n:global y [:pick \\$date 7 11]\\r\\ <br>");
                html.append("\\n:log warning \\\"-> Backup To E-Mail Now\\\"\\r\\ <br>");

                if (isBackupFile) {
                        html.append("\\n:global " + globlalName
                                        + " ([/system identity get name] . \\\"-\\\" . \\\"\\$m-\\$d-\\$y\\\")\\r\\ <br>");
                } else {
                        html.append("\\n:global " + globlalName
                                        + " ([/system identity get name] . \\\"-\\\" . \\\"\\$m-\\$d-\\$y\\\")\\r\\ <br>");
                }

                for (MikrotikBackupToMailBackupEntry entry : MikrotikBackupTomail.BACKUP_ENTRIES) {
                        if (entry.getId().equals("allbackup")) {
                                html.append("\\n/system backup save name=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("allrsc")) {
                                html.append("\\nexport file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("queuesimplersc")) {
                                html.append("\\n/queue simple export file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("queuetreersc")) {
                                html.append("\\n/queue tree export file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("manglersc")) {
                                html.append("\\n/ip firewall mangle export file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("hotspotrsc")) {
                                html.append("\\n/ip hotspot export file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("ppprsc")) {
                                html.append("\\n/ppp export file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("addresslistrsc")) {
                                html.append("\\n/ip firewall address-list export file=\\$" + entry.getName()
                                                + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("ipaddress")) {
                                html.append("\\n/ip route export file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }
                        if (entry.getId().equals("routing")) {
                                html.append("\\n/routing export file=\\$" + entry.getName() + "\\r\\ <br>");
                                break;
                        }

                }

                html.append("\\n:delay 20s\\r\\ <br>");
                html.append("\\n:log warning \\\"-> Backup Being E-Mailed\\\"\\r\\ <br>");

                if (isBackupFile) {
                        html.append("\\n/tool e-mail send to=\\\"" + body.getSendBackupFileToEmail()
                                        + "\\\" subject=([/system identity get name] . \\\" - \\\". [/system clock get time] . \\\" - \\\" . [/system clock get date] . \\\"\\\") from=\\\""
                                        + body.getRouterDescriptionEmailTitle() + "\\\" file=(\\\"\\$" + globlalName
                                        + "\\\" . \\\".backup\\\") start-tls=yes\\r\\\n <br>");
                } else {
                        html.append("\\n/tool e-mail send to=\\\"" + body.getSendBackupFileToEmail()
                                        + "\\\" subject=([/system identity get name] . \\\" - \\\". [/system clock get time] . \\\" - \\\" . [/system clock get date] . \\\"\\\") from=\\\""
                                        + body.getRouterDescriptionEmailTitle() + "\\\" file=(\\\"\\$" + globlalName
                                        + "\\\" . \\\".rsc\\\") start-tls=yes\\r\\\n <br>");
                }

                html.append("\\n:delay 20s\\r\\ br>");
                html.append("\\n:log warning \\\"-> Backup File Remove\\\"\\r\\ <br>");

                if (isBackupFile) {
                        html.append("\\n/file remove (\\\"\\$" + globlalName + "\\\" . \\\".backup\\\")\\r\\ <br>");
                } else {
                        html.append("\\n/file remove (\\\"\\$" + globlalName + "\\\" . \\\".rsc\\\")\\r\\ <br>");
                }

                html.append("\\n:delay 5s\\r\\ <br>");
                html.append("\\n:log warning \\\"-> Backup To E-Mail Finished\\\"\\r\\ <br>");
                html.append("\\n\" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup comment=\"Backup To E-Mail Generator by buananet.com\"");

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript(MikrotikBackupToMailBody body) {
                StringBuilder text = new StringBuilder();

                Optional<MikrotikBackupToMailBackupEntry> backupEntryOptional = MikrotikBackupTomail.BACKUP_ENTRIES
                                .stream()
                                .filter(entry -> entry.getId().equals(body.getIdBackupFileOption()))
                                .findFirst();

                boolean isBackupFile = backupEntryOptional.isPresent()
                                ? backupEntryOptional.get().getId().equals("allbackup") ? true : false
                                : false;
                String globlalName = backupEntryOptional.map(MikrotikBackupToMailBackupEntry::getName).orElse("none");

                text.append("############################################################### \n");
                text.append("# Mikrotik RouterOS Auto Backup to E-Mail Generator \n");
                text.append("# Date/Time: "+DateUtils.currentDate()+" \n");
                text.append("# Created By: buananet.com - fb.me/buananet.pbun \n");
                text.append("############################################################### \n");

                if (body.getIdRouterOsVersion().equalsIgnoreCase("ROS6")) {
                        text.append("/tool e-mail set address=\"74.125.200.109\" from=\"backupsi\"");
                        text.append("password=\"wvewfprmnymfepdx\" port=\"587\" start-tls=yes");
                        text.append("user=\"backup.mikrotik.ros@gmail.com\" \n");
                }

                if (body.getIdRouterOsVersion().equalsIgnoreCase("ROS7")) {
                        text.append("/tool e-mail set address=\"74.125.200.109\" from=\"backupsi\"");
                        text.append("password=\"wvewfprmnymfepdx\" port=\"587\" tls=starttls");
                        text.append("user=\"backup.mikrotik.ros@gmail.com\" \n");
                }

                if (body.getIdRouterOsVersion().equalsIgnoreCase("ROS7+")) {
                        text.append("/tool e-mail set server=\"74.125.200.109\" from=\"backupsi\"");
                        text.append("password=\"wvewfprmnymfepdx\" port=\"587\" tls=starttls");
                        text.append("user=\"backup.mikrotik.ros@gmail.com\" \n");
                }

                text.append("/system scheduler rem [find name=BACKUP-TO-EMAIL] \n");
                text.append("/system scheduler add interval=3d name=BACKUP-TO-EMAIL on-event=\"#=======================================================\\r\\ \n");
                text.append("\\n# Mikrotik RouterOS Auto Backup to E-Mail by buananet.com\\r\\ \n");
                text.append("\\n#=======================================================\\r\\ \n");
                text.append("\\n:global date [/system clock get date]\\r\\ \n");
                text.append("\\n:global d [:pick \\$date 4 6]\\r\\ \n");
                text.append("\\n:global m [:pick \\$date 0 3] \\r\\ \n");
                text.append("\\n:global y [:pick \\$date 7 11]\\r\\ \n");
                text.append("\\n:log warning \\\"-> Backup To E-Mail Now\\\"\\r\\ \n");

                if (isBackupFile) {
                        text.append("\\n:global " + globlalName
                                        + " ([/system identity get name] . \\\"-\\\" . \\\"\\$m-\\$d-\\$y\\\")\\r\\ \n");
                } else {
                        text.append("\\n:global " + globlalName
                                        + " ([/system identity get name] . \\\"-\\\" . \\\"\\$m-\\$d-\\$y\\\")\\r\\ \n");
                }

                for (MikrotikBackupToMailBackupEntry entry : MikrotikBackupTomail.BACKUP_ENTRIES) {
                        if (entry.getId().equals("allbackup")) {
                                text.append("\\n/system backup save name=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("allrsc")) {
                                text.append("\\nexport file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("queuesimplersc")) {
                                text.append("\\n/queue simple export file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("queuetreersc")) {
                                text.append("\\n/queue tree export file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("manglersc")) {
                                text.append("\\n/ip firewall mangle export file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("hotspotrsc")) {
                                text.append("\\n/ip hotspot export file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("ppprsc")) {
                                text.append("\\n/ppp export file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("addresslistrsc")) {
                                text.append("\\n/ip firewall address-list export file=\\$" + entry.getName()
                                                + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("ipaddress")) {
                                text.append("\\n/ip route export file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }
                        if (entry.getId().equals("routing")) {
                                text.append("\\n/routing export file=\\$" + entry.getName() + "\\r\\ \n");
                                break;
                        }

                        text.append("\\n:delay 20s\\r\\ <br>");
                        text.append("\\n:log warning \\\"-> Backup Being E-Mailed\\\"\\r\\ \n");
                        
                        if (isBackupFile) {
                                text.append("\\n/tool e-mail send to=\\\"" + body.getSendBackupFileToEmail()
                                                + "\\\" subject=([/system identity get name] . \\\" - \\\". [/system clock get time] . \\\" - \\\" . [/system clock get date] . \\\"\\\") from=\\\""
                                                + body.getRouterDescriptionEmailTitle() + "\\\" file=(\\\"\\$" + globlalName
                                                + "\\\" . \\\".backup\\\") start-tls=yes\\r\\\n \n");
                        } else {
                                text.append("\\n/tool e-mail send to=\\\"" + body.getSendBackupFileToEmail()
                                                + "\\\" subject=([/system identity get name] . \\\" - \\\". [/system clock get time] . \\\" - \\\" . [/system clock get date] . \\\"\\\") from=\\\""
                                                + body.getRouterDescriptionEmailTitle() + "\\\" file=(\\\"\\$" + globlalName
                                                + "\\\" . \\\".rsc\\\") start-tls=yes\\r\\\n \n");
                        }

                        text.append("\\n:delay 20s\\r\\ \n");
                        text.append("\\n:log warning \\\"-> Backup File Remove\\\"\\r\\ \n");
        
                        if (isBackupFile) {
                                text.append("\\n/file remove (\\\"\\$" + globlalName + "\\\" . \\\".backup\\\")\\r\\ \n");
                        } else {
                                text.append("\\n/file remove (\\\"\\$" + globlalName + "\\\" . \\\".rsc\\\")\\r\\ \n");
                        }
        
                        text.append("\\n:delay 5s\\r\\ \n");
                        text.append("\\n:log warning \\\"-> Backup To E-Mail Finished\\\"\\r\\ \n");
                        text.append("\\n\" policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup comment=\"Backup To E-Mail Generator by buananet.com\"");
                        
                        return text.toString();
                }


                return text.toString();
        }
}