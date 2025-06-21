export type Tool = {
    name: string;
    href: string;
};

export type ToolsSection = {
    title: string;
    color: string;
    tools: Tool[];
};

export const toolsSections: ToolsSection[] = [
    {
        title: "MOST POPULAR TOOLS",
        color: "text-blue-100",
        tools: [
            { name: "Load Balancing Pcc", href: "pcc" },
            { name: "Auto Backup en E-Mail", href: "mikrotik-backup-to-mail" },
            {
                name: "Burst Limite Calculadora",
                href: "mikrotik-burst-limit-calculator",
            },
            {
                name: "Failover Recursive Gateway",
                href: "mikrotik-failover-script-generator",
            },
            {
                name: "MikroTik Ninja: Hide Routerboard Scanning",
                href: "mikrotik-hide-my-router-from-isp",
            },
            {
                name: "Games Static Routing Using Filter Raw",
                href: "static-routing-games",
            },
        ],
    },
    {
        title: "Route // Mangle // NAT // VPN",
        color: "text-rose-600",
        tools: [
            { name: "Load Balancing PCC", href: "pcc" },
            {
                name: "Port Forwarding with NAT",
                href: "mikrotik-port-forward-generator",
            },
            { name: "Load Balancing NTH", href: "Balanceo_NTH" },
            {
                name: "Port TCP/UDP Static Routing",
                href: "mikrotik-port-static-routing",
            },
            {
                name: "Load Balancing ECMP",
                href: "ecmp",
            },
            {
                name: "All Traffic to VPN Tunnel",
                href: "vpn-tunnel-all-traffic-script-generator",
            },
            {
                name: "Failover Recursive Gateway",
                href: "mikrotik-failover-script-generator",
            },
            {
                name: 'Remote Access ISP "Public IP Static"',
                href: "remote-ip-public-static",
            },
            {
                name: "Games Static Routing Using Filter Raw",
                href: "static-routing-games",
            },
            { name: "VPN Routing Port Games", href: "vpn-game-generator" },
            {
                name: "Games Static Routing Using Mangle Port",
                href: "static-routing-games-mangle-port",
            },
            {
                name: "VPN Routing IP Address Games",
                href: "vpn-game-generator2",
            },
            {
                name: "Website Static Routing",
                href: "policy-based-routing-website",
            },
            {
                name: "VPN Remote SSTP - L2TP - PPTP - OVPN",
                href: "vpn-remote-generator",
            },
            {
                name: "Local Client IP Static Routing",
                href: "mikrotik-local-ip-pbr",
            },
            {
                name: "Static Routing Youtube, Tiktok, FB, WA, etc.",
                href: "mikrotik-static-routing",
            },
        ],
    },
    {
        title: "SIMPLE QUEUE // QUEUE TREE // QUEUE TYPE",
        color: "text-amber-500",
        tools: [
            {
                name: "Burst Limit Calculator",
                href: "mikrotik-burst-limit-calculator",
            },
            {
                name: "Queue Tree + Bandwidth Shared Up-To",
                href: "queue-tree-generator-shared",
            },
            {
                name: "PCQ Burst Rate + Queue Size Calculator",
                href: "mikrotik-pcq-burst-rate-queue-size-generator",
            },
            {
                name: "PCQ for Queue Tree and Queue Simple",
                href: "mikrotik-pcq-generator",
            },
            {
                name: "Simple Queue + Tocken Bucket",
                href: "simple-queue-generator",
            },
            {
                name: "QoS Priority Youtube, Tiktok, WA, FB, etc.",
                href: "mikrotik-queue-qos",
            },
            {
                name: "Simple Queue + Bandwidth Shared Up-To",
                href: "simple-queue-generator-shared",
            },
        ],
    },
    {
        title: "HOTSPOT // PPPOE // PPP",
        color: "text-lime-500",
        tools: [
            {
                name: "Free Hotspot Wi-Fi QR Code Template",
                href: "mikrotik-qr-code-generator",
            },
            {
                name: "Hotspot Username Password Generator",
                href: "mikrotik-username-password-hotspot-generator",
            },
            {
                name: 'Block Sharing Hotspot with "Change TTL"',
                href: "mikrotik-block-sharing-hotspot",
            },
            {
                name: "Bandwidth Share Up-To for Hotspot",
                href: "mikrotik-share-user-multi-login",
            },
            {
                name: "Easy Hotspot Configuration Wizard",
                href: "#",
            },
            {
                name: "Notify Expired Hotspot + PPPoE + Static IP",
                href: "mikrotik-expired-isolate-pppoe-hotspot",
            },
            {
                name: "PPP Secrets Username Password Generator",
                href: "mikrotik-username-password-ppp-generator",
            },
        ],
    },
    {
        title: "DNS // NETWATCH // INTERFACE // MAC // DHCP",
        color: "text-indigo-500",
        tools: [
            {
                name: "DNS over HTTPS (DoH) Servers",
                href: "mikrotik-dns-over-https-doh",
            },
            {
                name: "Bonding Interface / Link Aggregation",
                href: "mikrotik-bonding-interface",
            },
            {
                name: "Netwatch to Telegram, WA, Email, SMS",
                href: "mikrotik-netwatch-monitoring",
            },
            {
                name: "Discover Unknown DHCP Rogue Server",
                href: "mikrotik-dhcp-rogue",
            },
            {
                name: "Change or Random Mac Address Interface",
                href: "mikrotik-change-mac-address",
            },
        ],
    },
    {
        title: "PROTECTION // BLOCKED // BACKUP",
        color: "text-cyan-400",
        tools: [
            {
                name: "MikroTik Ninja: Hide Routerboard from ISP",
                href: "mikrotik-hide-my-router-from-isp",
            },
            {
                name: "Port Knocking with ICMP + Packet Size",
                href: "port-knocking-icmp",
            },
            {
                name: "Advanced MikroTik Router-OS Protection",
                href: "advanced-mikrotik-protection",
            },
            {
                name: "Block Websites Generator",
                href: "mikrotik-block-website-generator",
            },
            {
                name: "MikroTik Auto Backup to E-Mail",
                href: "mikrotik-backup-to-mail",
            },
            {
                name: "Mangle Chain Obfuscator / Encryption",
                href: "mikrotik-mangle-script-obfuscator",
            },
            {
                name: "Block For Youtube, Tiktok, WA, FB, etc.",
                href: "mikrotik-access-block",
            },
        ],
    },
    {
        title: "ROUTER-OS OTHER TOOLS",
        color: "text-purple-400",
        tools: [
            { name: "Load Balancing PCC Calculation", href: "pcc-calculation" },
            {
                name: "Wifi.id WMS and Seamless Auto Login",
                href: "wifid-wms-seamless",
            },
            {
                name: "Latinoamerica Time Zone NTP/SNTP Client",
                href: "mirkotik-latinoamerica-timezone",
            },
        ],
    },
    {
        title: "MIKROTIK TOOLS OFFICIAL FOR WINDOWS",
        color: "text-green-600",
        tools: [
            { name: "Winbox-64 (64bit)", href: "https://mikrotik.com/download" },
            { name: "Winbox-32 (32bit)", href: "https://mikrotik.com/download" },
            {
                name: "Winbox 4 Version Windows",
                href: "https://download.mikrotik.com/routeros/winbox/4.0beta3/WinBox_Windows.zip",
            },
            {
                name: "Winbox 4 Version Linux",
                href: "https://download.mikrotik.com/routeros/winbox/4.0beta3/WinBox_Linux.zip",
            },
            {
                name: "Winbox 4 Version MacOS",
                href: "https://download.mikrotik.com/routeros/winbox/4.0beta3/WinBox.dmg",
            },
            { name: "The Dude", href: "https://mikrotik.com/download" },
            { name: "Netinstall", href: "https://mikrotik.com/download" },
            {
                name: "Bandwidth Test",
                href: "https://download.mikrotik.com/routeros/7.12.1/btest.exe",
            },
            {
                name: "MT Syslog Daemon",
                href: "https://i.mt.lv/files/exe/MT_Syslog.exe",
            },
            {
                name: "MT Traffic Counter",
                href: "https://mikrotik.com/download/TrafficCounter.zip",
            },
            {
                name: "Supout.rif viewer (need login)",
                href: "https://mikrotik.com/client/supout",
            },
            {
                name: "Branding maker (need login)",
                href: "https://mikrotik.com/client/branding",
            },
            {
                name: "MikroTik Logo, Walpaper, T-Shirt",
                href: "https://merch.mikrotik.com/",
            },
        ],
    },
    {
        title: "MIKROTIK MOBILE TOOLS ANDROID IPHONE",
        color: "text-cyan-400",
        tools: [
            {
                name: "MikroTik Winbox iPhone",
                href: "https://apps.apple.com/id/app/mikrotik/id1323064830?l=id",
            },
            {
                name: "MikroTik HOME",
                href: "https://play.google.com/store/apps/details?id=com.mikrotik.android.tikapp&hl=in",
            },
            {
                name: "MikroTik Beacon Manager",
                href: "https://play.google.com/store/apps/details?id=com.mikrotik.android.bt5",
            },
        ],
    },
    {
        title: "MIKROTIK ROUTEROS SOFTWARE DOWNLOAD",
        color: "text-fuchsia-600",
        tools: [
            {
                name: "Mikrotik RouterOS Download Official",
                href: "https://mikrotik.com/download",
            },
            {
                name: "Routeros.co.id (Latinoamerica Server)",
                href: "https://mikrotik.com/download",
            },
        ],
    },
    {
        title: "MIKROTIK WIRELESS TOOLS",
        color: "text-lime-500",
        tools: [
            {
                name: "Unlock Wireless Frequency Mode",
                href: "unlock-mikrotik-wireless-frequency-mode",
            },
            {
                name: "MikroTik Link Planner",
                href: "unlock-mikrotik-wireless-frequency-mode",
            },
            {
                name: "Wireless MiniPCI A/B/G",
                href: "unlock-mikrotik-wireless-frequency-mode",
            },
            { name: "Antenna Height Calculation", href: "test_tower" },
            { name: "Wireless link calculator (need login)", href: "#" },
            { name: "Lockpack creator (need login)", href: "#" },
        ],
    },
    {
        title: "MIKROTIK TOOLS CALCULATOR AND MONITOR",
        color: "text-blue-400",
        tools: [
            { name: "Traffic Monitor with Cacti linux", href: "#" },
            { name: "RouterBoard Comparison Table", href: "#" },
            { name: "MikroTik Product Comparison", href: "#" },
            { name: "RAM Proxy MikroTik Calculator", href: "#" },
            { name: "Neighbour Viewer dan Mac Telnet", href: "#" },
            { name: "Trafr Sniffer linux", href: "#" },
            { name: "ATTIX5 Traffic Monitor", href: "#" },
            { name: "Supout.rif Reader (Unofficial)", href: "#" },
            { name: "PDF RouterOS Console Cheat Sheet", href: "#" },
        ],
    },
    {
        title: "MIKROTIK SKIN AND BRANDING",
        color: "text-orange-400",
        tools: [
            { name: "Webfig Mikrotik Skin", href: "#" },
            { name: "Branding Maker Mikrotik", href: "#" },
        ],
    },
    {
        title: "MIKROTIK RADIUS BILLING HOTSPOT OR PPPOE",
        color: "text-green-500",
        tools: [
            { name: "Mikhmon Billing Hotspot", href: "#" },
            { name: "FREERADIUS", href: "#" },
            { name: "DMA Radius Manager", href: "#" },
            { name: "Daloradius", href: "#" },
        ],
    },
    {
        title: "OTHER MIKROTIK BATCH TOOLS",
        color: "text-sky-600",
        tools: [
            { name: "Batch: DNS Ping Test", href: "#" },
            { name: "Batch: Winbox Port Scanner", href: "#" },
            { name: "Batch: RouterOS Auto Backup", href: "#" },
            { name: "Batch: Restore Winbox Session", href: "#" },
        ],
    },
];