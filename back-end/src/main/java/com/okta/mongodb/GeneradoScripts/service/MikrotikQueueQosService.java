package com.okta.mongodb.GeneradoScripts.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.okta.mongodb.GeneradoScripts.model.mikrotikQueueQos.QueueQosServiceBody;
import com.okta.mongodb.GeneradoScripts.utils.DateUtils;

@Service
public class MikrotikQueueQosService {

        private static final Logger logger = LoggerFactory.getLogger(MikrotikQueueQosService.class);

        public Map<String, String> create(QueueQosServiceBody body) {
                logger.info("Body recibido: {}", body);

                // Generar ambas versiones del script
                String htmlScript1 = generateHtmlScript1(body);
                String htmlScript2 = generateHtmlScript2(body);

                String plainTextScript1 = generatePlainTextScript1(body);
                String plainTextScript2 = generatePlainTextScript2(body);

                // Crear respuesta con ambos formatos
                Map<String, String> response = new HashMap<>();
                response.put("html1", htmlScript1);
                response.put("html2", htmlScript2);
                response.put("text1", plainTextScript1);
                response.put("text2", plainTextScript2);

                return response;
        }

        private String generateHtmlScript1(QueueQosServiceBody body) {
                StringBuilder html = new StringBuilder();

                switch (body.getIdRoutingOptions().toLowerCase()) {

                        case "youtube":
                                html.append("/file remove \"Mikrotik-Youtube.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Youtube.rsc\" dst-path=\"Mikrotik-Youtube.rsc\"<br>");
                                break;

                        case "tiktok":
                                html.append("/file remove \"Mikrotik-Tiktok.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Tiktok.rsc\" dst-path=\"Mikrotik-Tiktok.rsc\"<br>");
                                break;

                        case "vidio":
                                html.append("/file remove \"Mikrotik-Vidio.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Vidio.rsc\" dst-path=\"Mikrotik-Vidio.rsc\"<br>");
                                break;

                        case "iflix":
                                html.append("/file remove \"Mikrotik-Iflix.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Iflix.rsc\" dst-path=\"Mikrotik-Iflix.rsc\"<br>");
                                break;

                        case "netflix":
                                html.append("/file remove \"Mikrotik-Netflix.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Netflix.rsc\" dst-path=\"Mikrotik-Netflix.rsc\"<br>");
                                break;

                        case "facebook":
                                html.append("/file remove \"Mikrotik-Facebook.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Facebook.rsc\" dst-path=\"Mikrotik-Facebook.rsc\"<br>");
                                break;

                        case "instagram":
                                html.append("/file remove \"Mikrotik-Instagram.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Instagram.rsc\" dst-path=\"Mikrotik-Instagram.rsc\"<br>");
                                break;

                        case "whatsapp":
                                html.append("/file remove \"Mikrotik-WhatsApp.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-WhatsApp.rsc\" dst-path=\"Mikrotik-WhatsApp.rsc\"<br>");
                                break;

                        case "twitter":
                                html.append("/file remove \"Mikrotik-Twitter.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Twitter.rsc\" dst-path=\"Mikrotik-Twitter.rsc\"<br>");
                                break;

                        case "telegram":
                                html.append("/file remove \"Mikrotik-Telegram.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Telegram.rsc\" dst-path=\"Mikrotik-Telegram.rsc\"<br>");
                                break;

                        case "threads":
                                html.append("/file remove \"Mikrotik-Threads.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Threads.rsc\" dst-path=\"Mikrotik-Threads.rsc\"<br>");
                                break;

                        case "imo":
                                html.append("/file remove \"Mikrotik-Imo.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Imo.rsc\" dst-path=\"Mikrotik-Imo.rsc\"<br>");
                                break;

                        case "shopee":
                                html.append("/file remove \"Mikrotik-Shopee.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Shopee.rsc\" dst-path=\"Mikrotik-Shopee.rsc\"<br>");
                                break;

                        case "tokopedia":
                                html.append("/file remove \"Mikrotik-Tokopedia.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Tokopedia.rsc\" dst-path=\"Mikrotik-Tokopedia.rsc\"<br>");
                                break;

                        case "bukalapak":
                                html.append("/file remove \"Mikrotik-Bukalapak.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Bukalapak.rsc\" dst-path=\"Mikrotik-Bukalapak.rsc\"<br>");
                                break;

                        case "lazada":
                                html.append("/file remove \"Mikrotik-Lazada.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Lazada.rsc\" dst-path=\"Mikrotik-Lazada.rsc\"<br>");
                                break;

                        case "zoom":
                                html.append("/file remove \"Mikrotik-Zoom.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Zoom.rsc\" dst-path=\"Mikrotik-Zoom.rsc\"<br>");
                                break;

                        case "teams":
                                html.append("/file remove \"Mikrotik-Teams.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Teams.rsc\" dst-path=\"Mikrotik-Teams.rsc\"<br>");
                                break;

                        case "google-meet":
                                html.append("/file remove \"Mikrotik-Google-Meet.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Google-Meet.rsc\" dst-path=\"Mikrotik-Google-Meet.rsc\"<br>");
                                break;

                        case "meta":
                                html.append("/file remove \"Mikrotik-Meta.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Meta.rsc\" dst-path=\"Mikrotik-Meta.rsc\"<br>");
                                break;

                        case "google":
                                html.append("/file remove \"Mikrotik-Google.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Google.rsc\" dst-path=\"Mikrotik-Google.rsc\"<br>");
                                break;

                        case "speedtest":
                                html.append("/file remove \"Mikrotik-Speedtest.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Speedtest.rsc\" dst-path=\"Mikrotik-Speedtest.rsc\"<br>");
                                break;

                        case "ggc":
                                html.append("/file remove \"Mikrotik-GGC.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-GGC.rsc\" dst-path=\"Mikrotik-GGC.rsc\"<br>");
                                break;

                        case "nice-oixp":
                                html.append("/file remove \"Mikrotik-NICE-OIXP.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-NICE-OIXP.rsc\" dst-path=\"Mikrotik-NICE-OIXP.rsc\"<br>");
                                break;

                        case "bank":
                                html.append("/file remove \"Mikrotik-Bank.rsc\"<br>");
                                html.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Bank.rsc\" dst-path=\"Mikrotik-Bank.rsc\"<br>");
                                break;

                }
                // html.append("<span></span> <br>");

                html.append("</div>");
                return html.toString();
        }

        private String generateHtmlScript2(QueueQosServiceBody body) {
                StringBuilder html = new StringBuilder();
                html.append("/import file-name=\"Mikrotik-" + body.getIdRoutingOptions() + ".rsc\"<br>");
                html.append("/file remove \"Mikrotik-" + body.getIdRoutingOptions() + ".rsc\"<br>");
                if (body.getIdRosVersion().equalsIgnoreCase("queueSimple")) {
                        html.append("<span class='text-orange-400 '>/queue simple</span> <br>");
                        html.append("add priority=" + body.getPriority() + "/" + body.getPriority() + " max-limit=\""
                                        + body.getMaxLimit() + "/" + body.getMaxLimit() + "\" name=\"-> "
                                        + body.getIdRoutingOptions() + "\" packet-marks=\"" + body.getIdRoutingOptions()
                                        + "-Up," + body.getIdRoutingOptions()
                                        + "-Down\" target=\"192.168.0.0/16,172.16.0.0/12,10.0.0.0/8\"<br>");

                } else if (body.getIdRosVersion().equalsIgnoreCase("queueTree")) {
                        html.append("<span class='text-orange-400 '>/queue tree</span> <br>");
                        html.append("add parent=global priority=" + body.getPriority() + " max-limit=\""
                                        + body.getMaxLimit() + "\" name=\"-> " + body.getIdRoutingOptions()
                                        + " UP\" packet-mark=\"" + body.getIdRoutingOptions() + "-Up\"<br>");
                        html.append("add parent=global priority=" + body.getPriority() + " max-limit=\""
                                        + body.getMaxLimit() + "\" name=\"-> " + body.getIdRoutingOptions()
                                        + " DOWN\" packet-mark=\"" + body.getIdRoutingOptions() + "-Down\"<br>");
                }
                html.append("<span class='text-orange-400 '>/ip firewall mangle</span> <br>");

                html.append("add action=mark-connection chain=forward new-connection-mark=\""
                                + body.getIdRoutingOptions() + "-conn\" dst-address-list=\"Mikrotik-"
                                + body.getIdRoutingOptions() + "\" passthrough=yes src-address-list=LOCAL-IP comment=\""
                                + body.getIdRoutingOptions() + " Mangle - RMikrotik.com\"<br>");
                html.append("add action=mark-packet chain=forward connection-mark=\"" + body.getIdRoutingOptions()
                                + "-conn\" src-address-list=LOCAL-IP new-packet-mark=\"" + body.getIdRoutingOptions()
                                + "-Up\" passthrough=no <br>");
                html.append("add action=mark-packet chain=forward connection-mark=\"" + body.getIdRoutingOptions()
                                + "-conn\" dst-address-list=LOCAL-IP new-packet-mark=\"" + body.getIdRoutingOptions()
                                + "-Down\" passthrough=no <br>");

                html.append("<span class='text-orange-400 '>/ip firewall address-list</span> <br>");
                html.append("add address=192.168.0.0/16 list=LOCAL-IP comment=\"LOCAL IP - RMikrotik.com\"<br>");
                html.append("add address=172.16.0.0/12 list=LOCAL-IP comment=\"LOCAL IP - RMikrotik.com\"<br>");
                html.append("add address=10.0.0.0/8 list=LOCAL-IP comment=\"LOCAL IP - RMikrotik.com\"<br>");

                html.append("</div>");
                return html.toString();
        }

        private String generatePlainTextScript1(QueueQosServiceBody body) {
                StringBuilder text = new StringBuilder();

                switch (body.getIdRoutingOptions().toLowerCase()) {

                        case "youtube":
                                text.append("/file remove \"Mikrotik-Youtube.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Youtube.rsc\" dst-path=\"Mikrotik-Youtube.rsc\"<br>");
                                break;

                        case "tiktok":
                                text.append("/file remove \"Mikrotik-Tiktok.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Tiktok.rsc\" dst-path=\"Mikrotik-Tiktok.rsc\"<br>");
                                break;

                        case "vidio":
                                text.append("/file remove \"Mikrotik-Vidio.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Vidio.rsc\" dst-path=\"Mikrotik-Vidio.rsc\"<br>");
                                break;

                        case "iflix":
                                text.append("/file remove \"Mikrotik-Iflix.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Iflix.rsc\" dst-path=\"Mikrotik-Iflix.rsc\"<br>");
                                break;

                        case "netflix":
                                text.append("/file remove \"Mikrotik-Netflix.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Netflix.rsc\" dst-path=\"Mikrotik-Netflix.rsc\"<br>");
                                break;

                        case "facebook":
                                text.append("/file remove \"Mikrotik-Facebook.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Facebook.rsc\" dst-path=\"Mikrotik-Facebook.rsc\"<br>");
                                break;

                        case "instagram":
                                text.append("/file remove \"Mikrotik-Instagram.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Instagram.rsc\" dst-path=\"Mikrotik-Instagram.rsc\"<br>");
                                break;

                        case "whatsapp":
                                text.append("/file remove \"Mikrotik-WhatsApp.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-WhatsApp.rsc\" dst-path=\"Mikrotik-WhatsApp.rsc\"<br>");
                                break;

                        case "twitter":
                                text.append("/file remove \"Mikrotik-Twitter.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Twitter.rsc\" dst-path=\"Mikrotik-Twitter.rsc\"<br>");
                                break;

                        case "telegram":
                                text.append("/file remove \"Mikrotik-Telegram.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Telegram.rsc\" dst-path=\"Mikrotik-Telegram.rsc\"<br>");
                                break;

                        case "threads":
                                text.append("/file remove \"Mikrotik-Threads.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Threads.rsc\" dst-path=\"Mikrotik-Threads.rsc\"<br>");
                                break;

                        case "imo":
                                text.append("/file remove \"Mikrotik-Imo.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Imo.rsc\" dst-path=\"Mikrotik-Imo.rsc\"<br>");
                                break;

                        case "shopee":
                                text.append("/file remove \"Mikrotik-Shopee.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Shopee.rsc\" dst-path=\"Mikrotik-Shopee.rsc\"<br>");
                                break;

                        case "tokopedia":
                                text.append("/file remove \"Mikrotik-Tokopedia.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Tokopedia.rsc\" dst-path=\"Mikrotik-Tokopedia.rsc\"<br>");
                                break;

                        case "bukalapak":
                                text.append("/file remove \"Mikrotik-Bukalapak.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Bukalapak.rsc\" dst-path=\"Mikrotik-Bukalapak.rsc\"<br>");
                                break;

                        case "lazada":
                                text.append("/file remove \"Mikrotik-Lazada.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Lazada.rsc\" dst-path=\"Mikrotik-Lazada.rsc\"<br>");
                                break;

                        case "zoom":
                                text.append("/file remove \"Mikrotik-Zoom.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Zoom.rsc\" dst-path=\"Mikrotik-Zoom.rsc\"<br>");
                                break;

                        case "teams":
                                text.append("/file remove \"Mikrotik-Teams.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Teams.rsc\" dst-path=\"Mikrotik-Teams.rsc\"<br>");
                                break;

                        case "google-meet":
                                text.append("/file remove \"Mikrotik-Google-Meet.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Google-Meet.rsc\" dst-path=\"Mikrotik-Google-Meet.rsc\"<br>");
                                break;

                        case "meta":
                                text.append("/file remove \"Mikrotik-Meta.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Meta.rsc\" dst-path=\"Mikrotik-Meta.rsc\"<br>");
                                break;

                        case "google":
                                text.append("/file remove \"Mikrotik-Google.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Google.rsc\" dst-path=\"Mikrotik-Google.rsc\"<br>");
                                break;

                        case "speedtest":
                                text.append("/file remove \"Mikrotik-Speedtest.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Speedtest.rsc\" dst-path=\"Mikrotik-Speedtest.rsc\"<br>");
                                break;

                        case "ggc":
                                text.append("/file remove \"Mikrotik-GGC.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-GGC.rsc\" dst-path=\"Mikrotik-GGC.rsc\"<br>");
                                break;

                        case "nice-oixp":
                                text.append("/file remove \"Mikrotik-NICE-OIXP.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-NICE-OIXP.rsc\" dst-path=\"Mikrotik-NICE-OIXP.rsc\"<br>");
                                break;

                        case "bank":
                                text.append("/file remove \"Mikrotik-Bank.rsc\"<br>");
                                text.append(
                                                "/tool fetch url=\"https://RMikrotik.com/mikrotik-routeros-rsc/Mikrotik-Bank.rsc\" dst-path=\"Mikrotik-Bank.rsc\"<br>");
                                break;

                }
                return text.toString();
        }

        private String generatePlainTextScript2(QueueQosServiceBody body) {
                StringBuilder text = new StringBuilder();

                text.append("/import file-name=\"Mikrotik-" + body.getIdRoutingOptions() + ".rsc\"<br>");
                text.append("/file remove \"Mikrotik-" + body.getIdRoutingOptions() + ".rsc\"<br>");
                if (body.getIdRosVersion().equalsIgnoreCase("queueSimple")) {
                        text.append("<span class='text-orange-400 '>/queue simple</span> <br>");
                        text.append("add priority=" + body.getPriority() + "/" + body.getPriority() + " max-limit=\""
                                        + body.getMaxLimit() + "/" + body.getMaxLimit() + "\" name=\"-> "
                                        + body.getIdRoutingOptions() + "\" packet-marks=\"" + body.getIdRoutingOptions()
                                        + "-Up," + body.getIdRoutingOptions()
                                        + "-Down\" target=\"192.168.0.0/16,172.16.0.0/12,10.0.0.0/8\"<br>");

                } else if (body.getIdRosVersion().equalsIgnoreCase("queueTree")) {
                        text.append("<span class='text-orange-400 '>/queue tree</span> <br>");
                        text.append("add parent=global priority=" + body.getPriority() + " max-limit=\""
                                        + body.getMaxLimit() + "\" name=\"-> " + body.getIdRoutingOptions()
                                        + " UP\" packet-mark=\"" + body.getIdRoutingOptions() + "-Up\"<br>");
                        text.append("add parent=global priority=" + body.getPriority() + " max-limit=\""
                                        + body.getMaxLimit() + "\" name=\"-> " + body.getIdRoutingOptions()
                                        + " DOWN\" packet-mark=\"" + body.getIdRoutingOptions() + "-Down\"<br>");
                }
                text.append("<span class='text-orange-400 '>/ip firewall mangle</span> <br>");

                text.append("add action=mark-connection chain=forward new-connection-mark=\""
                                + body.getIdRoutingOptions() + "-conn\" dst-address-list=\"Mikrotik-"
                                + body.getIdRoutingOptions() + "\" passthrough=yes src-address-list=LOCAL-IP comment=\""
                                + body.getIdRoutingOptions() + " Mangle - RMikrotik.com\"<br>");
                text.append("add action=mark-packet chain=forward connection-mark=\"" + body.getIdRoutingOptions()
                                + "-conn\" src-address-list=LOCAL-IP new-packet-mark=\"" + body.getIdRoutingOptions()
                                + "-Up\" passthrough=no <br>");
                text.append("add action=mark-packet chain=forward connection-mark=\"" + body.getIdRoutingOptions()
                                + "-conn\" dst-address-list=LOCAL-IP new-packet-mark=\"" + body.getIdRoutingOptions()
                                + "-Down\" passthrough=no <br>");

                text.append("<span class='text-orange-400 '>/ip firewall address-list</span> <br>");
                text.append("add address=192.168.0.0/16 list=LOCAL-IP comment=\"LOCAL IP - RMikrotik.com\"<br>");
                text.append("add address=172.16.0.0/12 list=LOCAL-IP comment=\"LOCAL IP - RMikrotik.com\"<br>");
                text.append("add address=10.0.0.0/8 list=LOCAL-IP comment=\"LOCAL IP - RMikrotik.com\"<br>");
                return text.toString();
        }

}
