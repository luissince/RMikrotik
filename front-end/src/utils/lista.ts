const listaalgo = [
    {
        "title": "API (8728)",
        "bc": 1,
        "description": `  Application Programmable
                                                    Interface (API), a service
                                                    that allows users to create
                                                    custom software or
                                                    applications that
                                                    communicate with the router,
                                                    for example to retrieve
                                                    information on the router,
                                                    or even configure the
                                                    router. Using port 8728.
                                                    This API port is often
                                                    attacked using BRUTE FORCE,
                                                    you can change the port or
                                                    disable it when not in use.`,
        "code": `
        # API-SSL Port Enable
        /ip service set api-ssl port=8729 address=0.0.0.0/0 disabled=no
        # API-SSL Port Disable
        /ip service set api-ssl port=8729 address=0.0.0.0/0 disabled=yes
        `
    },

    {
        "title": "API-SSL (8729)",
        "description": `  It has the same function as the API, only for the SSL API it is more secure because it is equipped with an ssl certificate. This SSL API runs on port 8729. you can change the port or disable it when not in use.`,
        "code": `
        # API-SSL Port Enable
/ip service set api-ssl port=8729 address=0.0.0.0/0 disabled=no
# API-SSL Port Disable
/ip service set api-ssl port=8729 address=0.0.0.0/0 disabled=yes
        `
    },

    {
        "title": "FTP (21)",
        "description": `  Mikrotik provides a standard FTP service that uses ports 20 and 21. FTP is usually used to upload or download router data, such as backup files. FTP authorization using router account user & password. This FTP port is often attacked using BRUTE FORCE, you can change the port or disable it when not in use.`,
        "code": `
        # FTP Port Enable
/ip service set ftp port=21 address=0.0.0.0/0 disabled=no
# FTP Port Disable
/ip service set ftp port=21 address=0.0.0.0/0 disabled=yes 
        `
    },

    {
        "title": "SSH (22)",
        "description": `  Is one way to remote router in a console with secure. Almost the same as telnet, only it is more secure because the data transmitted by SSH is encrypted. MikroTik SSH by default uses port 22. This SSH port is often attacked using BRUTE FORCE, you can change the port or disable it when not in use.`,
        "code": `
        # SSH Port Enable
/ip service set ssh port=22 address=0.0.0.0/0 disabled=no
# SSH Port Disable
/ip service set ssh port=22 address=0.0.0.0/0 disabled=yes 
        `
    },
    {
        "title": "WINBOX (8291)",
        "description": `  The service that allows the Winbox application to connect to the router. Of course we are already familiar with the Winbox application which is used to graphically remotely router. Winbox connection using port 8291. Some versions of routeros can be hacked using an exploit, You can change the Port for more Secure!.`,
        "code": `
       # WINBOX Port Enable
/ip service set winbox port=8291 address=0.0.0.0/0 disabled=no
# WINBOX Port Disable
/ip service set winbox port=8291 address=0.0.0.0/0 disabled=yes 
        `
    },
    {
        "title": "WWW WEBFIG (80)",
        "description": `  In addition to the remote console and winbox, Mikrotik also provides a way to access the router via a web-base using a browser. The port used is the standard HTTP port, which is port 80, You can change the port or disable it when not in use.`,
        "code": `
       # WWW (webfig) Port Enable
/ip service set www port=80 address=0.0.0.0/0 disabled=no
# WWW (webfig) Port Disable
/ip service set www port=80 address=0.0.0.0/0 disabled=yes  
        `
    },
    {
        "title": "WWW-SSL WEBFIG (443)",
        "description": `  Just like the WWW service that allows router access using a web-base, however, www-ssl is more secure because it uses SSL certificates to establish a connection between the router and the remote client. By default use port 443, you can change the port or disable it when not in use.`,
        "code": `
       # WWW (webfig) Port Enable
# WWW-SSL (webfig) Port Enable
/ip service set www-ssl port=443 address=0.0.0.0/0 disabled=no
# WWW-SSL (webfig) Port Disable
/ip service set www-ssl port=443 address=0.0.0.0/0 disabled=yes   
        `
    },
    
    
];

export {
    listaalgo
}


const listar2 = [


    {
        "title": "Protect Neighbors Discovery",
        "bc": 1,
        "description": `  Mikrotik has a protocol that can broadcast domains through layer 2 so that Mikrotik devices can find each other if they are on the same layer 2 network, the name is Mikrotik Neighbor Discovery Protocol (MNDP). Devices that support MNDP and CDP can find or know other router information such as Router identity information, MAC-Address, and IP-Address. The easiest example when we are going to do winbox in the Neighbors tab, we will see some router information that is connected to layer 2 with our Network Info.`,
        "code": `
        # Hide Discover Interface Broadcast
/ip neighbor discovery-settings set discover-interface-list=none
# Show Discover Interface Broadcast
/ip neighbor discovery-settings set discover-interface-list=all 
        `
    },
    {
        "title": "Protect Mac Server",
        "bc": 1,
        "description": `  By disabling the discovery interface, it doesn't mean that the router can't be remote using the MAC-Address. If you have previously saved or know the MAC-Address of the Router, you can still remotely use the MAC-Address. If you want the router to be unable to be remotely using MAC-address either through Winbox or via telnet, turn off the MAC-Server feature on the router.`,
        "code": `
        # Protect login from Mac Address
/tool mac-server mac-winbox set allowed-interface-list=none
/tool mac-server ping set enabled=no
# Unprotect login from Mac Address
/tool mac-server mac-winbox set allowed-interface-list=all
/tool mac-server ping set enabled=yes  
        `
    },
    {
        "title": "Bootloader Protector",
        "bc": 1,
        "description": `  In Mikrotik there is a feature that serves to protect access to the router system, especially with regard to the use of the reset button. The feature is "Protected RouterBOOT". When this feature is activated, some functions cannot be performed as by default, namely the reset button and pin-hole reset. And router access from the console will also be disabled.

Note: in ROS New version, after paste script to enable, don't forget press button within 60 seconds to confirm protected routerboot enable
`,
        "code": `
        # Enable Bootloader Protector
/system routerboard settings set protected-routerboot=enabled
# Disable Bootloader Protector
/system routerboard settings set protected-routerboot=disabled   
        `
    },
    {
        "title": "Protect Btest Server",
        "bc": 1,
        "description": `  The Mikrotik router also has a Btest Server feature, which can be used to test connections that have been formed. But if this feature is suddenly used by outsiders, our router is forced to generate traffic or receive bandwidth test traffic, it could be that our bandwidth runs out or suddenly our CPU load becomes 100%. Of course as network admins don't want that, it's better to turn this feature off.


Note: in ROS New version, after paste script to enable, don't forget press button within 60 seconds to confirm protected routerboot enable
`,
        "code": `
        # Btest Server Enable
/tool bandwidth-server set enabled=yes authenticate=yes
# Btest Server Disable
/tool bandwidth-server set enabled=no authenticate=yes    
        `
    },
    {
        "title": "Protect RoMON",
        "bc": 1,
        "description": `  RoMON is the 'MikroTik Proprietary Protocol' or a protocol that is only supported by MikroTik devices. RoMON communication is based on the RoMON ID parameter taken from the router's MAC address. RoMON enabled devices will make a discovery of MAC Address Peer and also data forwarding protocol independently. if you don't want your mac address to be spread to all networks you can disable RoMON
`,
        "code": `
        # Enable RoMON
/tool romon set enabled=yes secrets=12345
# Disable RoMON
/tool romon set enabled=no secrets=12345     
        `
    },




];
export {
    listar2
}

const listar3 = [

    {
        "title": "Protect Port Service from Internet",
        "bc": 1,
        "description": ` Securing the Default Service Port used by Mikrotik such as telnet, ssh, ftp, winbox, www and api. or if not in use can be turned off / disabled. if using a custom port, please add your own
`,
        "code": `
        ## Protect Port Service from Internet
/interface list add name=WAN
/interface list member
add list=WAN interface="ether to ISP"
/ip firewall filter
add action=drop chain=input dst-port=21,22,23,8291,80,8728,8729 in-interface-list=WAN protocol=tcp comment="Protect Port Service from Internet"
add action=drop chain=input dst-port=21,22,23,8291,80,8728,8729 in-interface-list=WAN protocol=udp     
        `
    },
    {
        "title": "Anti Hack from EXPLOIT",
        "bc": 1,
        "description": ` The vulnerability allowed a special tool to connect to the Winbox port, and request the system user database file.

Versions affected:
Affected all bugfix releases from 6.30.1 to 6.40.7, from 6.29 to 6.42 and from 6.29rc1 to 6.43rc3
`,
        "code": `
        # Anti Hack from EXPLOIT
/ip firewall filter add action=reject chain=input content=user.dat reject-with=icmp-network-unreachable comment="Anti Hack Exploit"
/ip firewall filter add action=drop chain=input content=user.dat      
        `
    },
    {
        "title": "Memcrashed - Amplification Attacks UDP 11211",
        "bc": 1,
        "description": ` This DDoS is known as Memcrashed, where the attacker exploits the UDP port 11211 protocol used by the Memcached service from the webserver. Memchaced is a technology used for data storage and distribution systems in server memory. The more dynamic the application and the web, the more problems and slowing down the system itself when it comes to retrieving (load) data from the database directly because of the frequent reading and writing processes in storage.
`,
        "code": `
        # Memcrashed - Amplification Attacks UDP 11211
/ip firewall filter
add chain=forward dst-port=11211 protocol=udp action=drop comment="Memcrashed - Amplification Attacks UDP 11211"       
        `
    },
    {
        "title": "Block Access Modem",
        "bc": 1,
        "description": ` Modem or ISP router generally has a default configuration. Whether it's the IP address to the username and password. If there are people who understand this, of course it will be dangerous for your internet network especially for those of you who have managed public networks such as hotspots, because it could be that later you will be disturb by that person such as changing the configuration, changing the wifi name, wifi password.

`,
        "code": `
        # Block ACCESS MODEM
/ip firewall address-list
add address=192.168.1.1 list=IP-MODEM
add address=192.168.2.1 list=IP-MODEM
/ip firewall filter
add action=drop chain=forward dst-address-list=IP-MODEM dst-port=21-23,80,443 protocol=tcp comment="MODEM PROTECTED"
add action=drop chain=output dst-address-list=IP-MODEM dst-port=21-23,80,443 protocol=tcp        
        `
    },
    {
        "title": "Block Access Modem",
        "bc": 1,
        "description": ` Modem or ISP router generally has a default configuration. Whether it's the IP address to the username and password. If there are people who understand this, of course it will be dangerous for your internet network especially for those of you who have managed public networks such as hotspots, because it could be that later you will be disturb by that person such as changing the configuration, changing the wifi name, wifi password.

`,
        "code": `
        # Block ACCESS MODEM
/ip firewall address-list
add address=192.168.1.1 list=IP-MODEM
add address=192.168.2.1 list=IP-MODEM
/ip firewall filter
add action=drop chain=forward dst-address-list=IP-MODEM dst-port=21-23,80,443 protocol=tcp comment="MODEM PROTECTED"
add action=drop chain=output dst-address-list=IP-MODEM dst-port=21-23,80,443 protocol=tcp        
        `
    },
    {
        "title": "Drop TRACEROUTE",
        "bc": 1,
        "description": ` To hide through several routers or via which ISP so that the client cannot read our network path, we can hide or drop it for the traceroute except for the purpose, here's the script to hide our Mikrotik network traffic
.

`,
        "code": `
        # Drop TRACEROUTE
/ip firewall filter
add action=drop chain=forward icmp-options=11:0 protocol=icmp comment="Drop TRACEROUTE"
add action=drop chain=forward icmp-options=3:3 protocol=icmp         
        `
    },
    {
        "title": "Anti NETCUT",
        "bc": 1,
        "description": ` Anti Netcut, Netcut broadcasts ARP and attacks on Layer2, but at least with the script below we are able to answer who is naughty who wants to cut our network.
.

`,
        "code": `
        # ANTI NETCUT
/ip firewall address-list add list=netcut address=www.arcai.com comment="Anti Netcut"
/ip firewall mangle add action=add-src-to-address-list address-list=NetcutUser address-list-timeout=1h5m chain=prerouting dst-address-list=netcut dst-port=80 protocol=tcp comment="Anti Netcut"
/ip firewall filter add action=drop chain=forward src-address-list=NetcutUser comment="Anti Netcut"
/system scheduler add interval=10m name="AutoBlockNetcut" comment="Anti Netcut"
Open System Scheduler and enter this script into "AutoBlockNetcut"

local a [/ip firewall address-list get [find list="NetcutUser"] address]
local b [/ip hotspot active get [find address=$a] mac-address]
if ($a != "") do={[ /ip hotspot ip-binding add mac-address="$b" address="$a" type=blocked
/ip firewall address-list remove [find address="$a"]
/system scheduler add name ($a) interval="01:00:00" on "/ip hotspot ip-binding remove [find mac-address=$b]
/system scheduler remove [find name=$a]"
]}          
        `
    },
    {
        "title": "Block Open Recursive DNS",
        "bc": 1,
        "description": ` Have you ever felt that internet access suddenly feels slow? it could be that someone is naughty who uses our public router IP as a DNS server, usually this is indicated by the high upload speed to the internet, to avoid this we simply use the script below.
.

`,
        "code": `
        # Block Open Recursive DNS
/interface list add name=WAN
/interface list member
add list=WAN interface="ether to ISP"
/ip firewall filter
add chain=input dst-port=53 in-interface-list=WAN protocol=tcp action=drop comment="Block Open Recursive DNS"
add chain=input dst-port=53 in-interface-list=WAN protocol=udp action=drop           
        `
    },
    {
        "title": "Block Open PROXY",
        "bc": 1,
        "description": ` Prevent the Open proxy from being misused by outsiders. if using a custom port, please add your own. 
.

`,
        "code": `
        # Block Open PROXY
/interface list add name=WAN
/interface list member
add list=WAN interface="ether to ISP"
/ip firewall filter
add action=drop chain=input dst-port=3128,8080 in-interface-list=WAN protocol=tcp comment="Block Open PROXY"
add action=drop chain=input dst-port=3128,8080 in-interface-list=WAN protocol=udp            
        `
    },
    {
        "title": "Anti DDoS Attacks",
        "bc": 1,
        "description": ` Anticipate DDoS attacks, namely by limiting the number of connections in firewall rules. When there is a DDoS attack, the system detects the number of connection requests exceeding the specified limit. 
.

`,
        "code": `
        # Anti DDoS Attacks
/ip firewall filter
add chain=forward connection-state=new action=jump jump-target=block-ddos comment="Anti DDoS Attacks"
add chain=forward connection-state=new src-address-list=ddoser dst-address-list=ddosed action=drop
add chain=block-ddos dst-limit=50,50,src-and-dst-addresses/10s action=return
add chain=block-ddos action=add-dst-to-address-list address-list=ddosed address-list-timeout=10m
add chain=block-ddos action=add-src-to-address-list address-list=ddoser address-list-timeout=10m             
        `
    },
    {
        "title": "Anti PORT SCAN",
        "bc": 1,
        "description": ` To reduce all kinds of risks and losses resulting from irresponsible parties, we as Network Administrators or Network Support / Engineers are also required to always actively maintain and prevent security threats, especially from the network side. Various kinds of actions that can be taken to prevent from the networking side. One way is to do drop traffic from the Port Scanner application. 
.

`,
        "code": `
        # Anti PORT SCAN
/ip firewall filter
add chain=input protocol=tcp psd=21,3s,3,1 action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="Mark Source ip port scanner to Address list " disabled=no
add chain=input protocol=tcp tcp-flags=fin,!syn,!rst,!psh,!ack,!urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="NMAP FIN Stealth scan"
add chain=input protocol=tcp tcp-flags=fin,syn action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="SYN/FIN scan"
add chain=input protocol=tcp tcp-flags=syn,rst action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="SYN/RST scan"
add chain=input protocol=tcp tcp-flags=fin,psh,urg,!syn,!rst,!ack action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="FIN/PSH/URG scan"
add chain=input protocol=tcp tcp-flags=fin,syn,rst,psh,ack,urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="ALL/ALL scan"
add chain=input protocol=tcp tcp-flags=!fin,!syn,!rst,!psh,!ack,!urg action=add-src-to-address-list address-list="port scanners" address-list-timeout=2w comment="NMAP NULL scan"
add chain=input src-address-list="port scanners" action=drop comment="Drop port scanners" disabled=no              
        `
    },
    {
        "title": "Anti Hack from BruteForce FTP + SSH",
        "bc": 1,
        "description": ` BRUTE FORCE is an attack carried out to break into passwords by trying each password at random from a combination of letters, numbers and symbols, until finally finding the right password. Usually BRUTE FORCEs are carried out by robots or programs, because to get a combination of letters, numbers and symbols, certain programs/algorithms can quickly create them. 
.

`,
        "code": `
        # Anti Hack from BruteForce FTP + SSH
/ip firewall filter
add action=drop chain=input comment="drop ftp BRUTE FORCErs" dst-port=21 protocol=tcp src-address-list=ftp_blacklist
add action=accept chain=output content="530 Login incorrect" dst-limit=1/1m,9,dst-address/1m protocol=tcp
add action=add-dst-to-address-list address-list=ftp_blacklist address-list-timeout=3h chain=output content="530 Login incorrect" protocol=tcp
add action=drop chain=input comment="drop ssh BRUTE FORCErs" dst-port=22-23 protocol=tcp src-address-list=ssh_blacklist
add action=add-src-to-address-list address-list=ssh_blacklist address-list-timeout=1w3d chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage3
add action=add-src-to-address-list address-list=ssh_stage3 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage2
add action=add-src-to-address-list address-list=ssh_stage2 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp src-address-list=ssh_stage1
add action=add-src-to-address-list address-list=ssh_stage1 address-list-timeout=1m chain=input connection-state=new dst-port=22-23 protocol=tcp
add action=drop chain=forward comment="drop ssh brute downstream" dst-port=22-23 protocol=tcp src-address-list=ssh_blacklist               
        `
    },
    {
        "title": "Port Knocking Use Icmp + Packet Size",
        "bc": 1,
        "description": `In computer networking, port knocking is a method of externally opening ports on a firewall by generating a connection attempt on a set of prespecified closed ports. Once a correct sequence of connection attempts is received, the firewall rules are dynamically modified to allow the host which sent the connection attempts to connect over specific port(s).to prevent an attacker from scanning a system for potentially exploitable services by doing a port scan, because unless the attacker sends the correct knock sequence, the protected ports will appear closed

Unique Packet Size For Key Knocking: 72 and 172

Example Manually Open Key Ping in CMD Windows:
First Key Knock = ping -l 72 (IP Adrress)
Second Key Knock = ping -l 172 (IP Adrress)

Example Manually Open Key Ping in Terminal Linux or MacOS:
First Key Knock = ping -s 72 (IP Adrress)
Second Key Knock = ping -s 172 (IP Adrress)  
.

`,
        "code": `
        
# Port Knocking Use Icmp + Packet Size
/ip firewall filter
add action=add-src-to-address-list address-list="port-knocking-first" address-list-timeout="00:00:00" chain=input packet-size="100" protocol=icmp comment="Port Knocking Use Icmp + Packet Size"
add action=add-src-to-address-list address-list="port-knocking-second" address-list-timeout="00:00:00" chain=input packet-size="200" protocol=icmp src-address-list="port-knocking-first"
add action=accept chain=input dst-port="21,22,23" protocol=tcp src-address-list="port-knocking-second"
add action=drop chain=input dst-port="21,22,23" protocol=tcp src-address-list="!port-knocking-second"                
        `
    },

];
export {
    listar3
}