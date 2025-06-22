package com.okta.mongodb.GeneradoScripts.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.okta.mongodb.GeneradoScripts.model.mikrotikDnsDverHttpsDoh.MikrotikDnsDverHttpsDohBody;
import com.okta.mongodb.GeneradoScripts.model.mikrotikDnsDverHttpsDoh.MikrotikDnsDverHttpsDohDnsOption;

@Service
public class MikrotikDnsDverHttpsDohService {
    private static final Logger logger = LoggerFactory.getLogger(MikrotikDnsDverHttpsDohBody.class);

    public Map<String, Object> create(MikrotikDnsDverHttpsDohBody body) {
        logger.info("Body recibido: {}", body);

        // Generar ambas versiones del script
        String htmlScript1 = generateHtmlScript1(body);
        String htmlScript2 = generateHtmlScript2(body);
        String htmlScript3 = generateHtmlScript3(body);
        String plainTextScript = generatePlainTextScript(body);

        // Crear respuesta con ambos formatos
        Map<String, Object> response = new HashMap<>();

        if (body.getType().equalsIgnoreCase("1")) {
            response.put("data", generateData1());
        } else if (body.getType().equalsIgnoreCase("2")) {
            response.put("data", generateData2());
        }

        response.put("html1", htmlScript1);
        response.put("html2", htmlScript2);
        response.put("html3", htmlScript3);
        response.put("text1", plainTextScript);
        response.put("text2", plainTextScript);
        response.put("text3", plainTextScript);

        return response;
    }

    private Map<String, String> generateData1() {
        Map<String, String> map = Map.of(
                "dnsIPv4Server1", "94.140.14.14",
                "dnsIPv4Server2", "94.140.15.15",
                "dnsIPv6Server1", "2a10:50c0::ad1:ff",
                "dnsIPv6Server2", "2a10:50c0::ad2:ff",
                "dohServer", "https://dns.adguard.com/dns-query",
                "dohHostname", "dns.adguard.com");

        return map;
    }

    private Map<String, String> generateData2() {
        Map<String, String> map = Map.of(
                "dnsIPv4Server1", "94.140.14.14",
                "dnsIPv4Server2", "94.140.15.15",
                "dnsIPv6Server1", "2a10:50c0::ad1:ff",
                "dnsIPv6Server2", "2a10:50c0::ad2:ff",
                "dohServer", "https://dns.adguard.com/dns-query",
                "dohHostname", "dns.adguard.com");

        return map;
    }

    private Map<String, String> generateData3() {
        Map<String, String> map = Map.of(
                "dnsIPv4Server1", "208.67.222.222",
                "dnsIPv4Server2", "94.140.15.15",
                "dnsIPv6Server1", "2a10:50c0::ad1:ff",
                "dnsIPv6Server2", "2a10:50c0::ad2:ff",
                "dohServer", "https://dns.adguard.com/dns-query",
                "dohHostname", "dns.adguard.com");

        return map;
    }

    private String generateHtmlScript1(MikrotikDnsDverHttpsDohBody body) {
        StringBuilder html = new StringBuilder();

        // 1
        html.append(
                "/ip dns set allow-remote-requests=yes cache-max-ttl=1d servers=94.140.14.14,94.140.15.15 use-doh-server=https://dns.adguard.com/dns-query <br>");
        html.append("/ip dns static\r\n" + //
                "add address=94.140.14.14 name=dns.adguard.com\r\n" + //
                "add address=94.140.15.15 name=dns.adguard.com");
        html.append("</div>");

        // 2

        return html.toString();
    }

    private String generateHtmlScript2(MikrotikDnsDverHttpsDohBody body) {
        StringBuilder html = new StringBuilder();

        // 1|
        html.append("<div>");
        html.append("<span> hola2 </span>");
        html.append("</div>");

        // 2
        html.append("<div>");
        html.append("<span> hola2 </span>");
        html.append("</div>");

        // 3
        html.append("<div>");
        html.append("<span> hola2 </span>");
        html.append("</div>");

        return html.toString();
    }

    private String generateHtmlScript3(MikrotikDnsDverHttpsDohBody body) {
        StringBuilder html = new StringBuilder();

        html.append("<div>");
        html.append("<span> hola3 </span>");
        html.append("</div>");

        return html.toString();
    }

    private String generatePlainTextScript(MikrotikDnsDverHttpsDohBody body) {
        StringBuilder text = new StringBuilder();
        text.append("hola1");
        return text.toString();
    }

    public List<MikrotikDnsDverHttpsDohDnsOption> list() {
        List<MikrotikDnsDverHttpsDohDnsOption> response = new ArrayList<>();
        response.add(new MikrotikDnsDverHttpsDohDnsOption("00", "AdGuard DNS - 94.140.14.14"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("07", "Cloudflare DNS - 1.1.1.1"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("06", "Cisco OpenDNS - 208.67.222.222"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("27", "Google DNS - 8.8.8.8"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("42", "Quad9 DNS - 9.9.9.9"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("34", "NextDNS - 45.90.28.140"));

        response.add(new MikrotikDnsDverHttpsDohDnsOption("01", "Applied Privacy DNS - 94.130.106.88"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("02", "Ali DNS - 223.5.5.5"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("03", "BlahDNS - 95.216.212.177"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("04", "Comodo Secure DNS - 8.26.56.26 - Not Support DoH"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("05", "CleanBrowsing - 185.228.168.168"));

        response.add(new MikrotikDnsDverHttpsDohDnsOption("08", "CIRA Shield DNS - 149.112.121.10"));

        response.add(new MikrotikDnsDverHttpsDohDnsOption("09", "CZ.NIC ODVR - 193.17.47.1"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("10", "ControlD DNS - 76.76.2.0"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("11", "CFIEC Public DNS - 240C::6666"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("12", "Captnemo DNS 139.59.48.222:4434 - Not Support DoH"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("13", "Comss.ru DNS - 92.38.152.163"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("14", "DNS for Family - 94.130.180.225"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("15", "Dyn DNS - 216.146.35.35 - Not Support DoH"));
        response.add(new MikrotikDnsDverHttpsDohDnsOption("16", "DNSPod - 119.29.29.29"));
        return response;
    }

}
