import React, { useState } from "react";

const FormularioMikrotik = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const scripts = [
    { id: 1, title: "Dynamic DNS Update Script for No-IP DNS" },
    { id: 2, title: "Delete Arp Traffic For Arp Table" },
    { id: 3, title: "Default Filter Rules" },
    { id: 4, title: "DNSCRYPT with OpenDNS port 443 or 5353" },
    { id: 5, title: "DNS Cache Flush" },
    { id: 6, title: "Detect New Log Entry" },
    { id: 7, title: "Dial PPPoE until a Certain IP Range is Obtained" },
    { id: 8, title: "Discover Unknown DHCP Server On The Network (Telegram)" },
    { id: 9, title: "Extract The Day Of The Month" },
    { id: 10, title: "Expired Hotspot Page Without A Proxy" },
    { id: 11, title: "Enable or Disable New Guest User Account Daily Hotspot" },
    { id: 12, title: "Expire Users Hotspot A After Number Of Days" },
    { id: 13, title: "Fasttrack Enable" },
    { id: 14, title: "Filter A Command Output" },
    { id: 15, title: "Find The Day Of The Week" },
    { id: 16, title: "Forget or Show User Manager Password" },
    { id: 17, title: "Failover with Network" },
    { id: 18, title: "Failover With Scripting" },
    { id: 19, title: "Force Disconnect Wireless Stations with Low CCQ" },
    { id: 20, title: "GPS Text File Converter To Google Earth Or Maps" },
  ];

  const filteredScripts = scripts.filter((script) =>
    script.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
      {/* Panel izquierdo - Lista de Scripts */}
      <div className="w-full lg:w-1/3 bg-gray-800 p-4 rounded-lg">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search script..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700"
          />
        </div>
        <div className="space-y-2 overflow-y-auto h-96">
          {filteredScripts.map((script) => (
            <div key={script.id} className="p-2 bg-gray-700 rounded">
              {script.title}
            </div>
          ))}
        </div>
        <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition mt-4">
          BACK TO TOP
        </button>
      </div>

      {/* Panel derecho - Descripción */}
      <div className="w-full lg:w-2/3 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold text-orange-500 mb-4">
          COMPLETE MIKROTIK SCRIPT ROUTEROS DATABASE
        </h2>
        <p className="text-gray-300 mb-4">
          We try to collect all the scripts found on the internet and combine them in one
          Database. Scripting host provides a way to automate some router maintenance tasks
          by means of executing user-defined scripts bounded to some event occurrence.
          Scripts can be stored in the Script repository or can be written directly to the console.
          The events used to trigger script execution include, but are not limited to the System
          Scheduler, the Traffic Monitoring Tool, and the Netwatch Tool generated events.
        </p>
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-gray-300">
            MMM MMM KKK TTTTTTTTTT KKK<br />
            MMMM MMMM KKK KKK RRRRRR 000000 TTT III KKK KKK<br />
            MMM MMM III KKKKKK RRR RRR 000 000 TTT III KKK KKK<br />
            MMM MM MM III KKK KKK RRR RRR 000 000 TTT III KKKKKK<br />
            MMM MM MM III KKK KKK RRRRRR 000000 TTT III KKK KKK
          </p>
        </div>
        <div className="mt-4">
          <p className="text-gray-300">
            MikroTik RouterOS Script <a href="https://buanet.com/mikrotik" className="text-orange-500">https://buanet.com/mikrotik</a>
          </p>
          <p className="text-gray-300 mt-2">
            Enjoy the most complete script to make it easier for you to learn MikroTik RouterOS scripts!
          </p>
          <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition mt-4">
            Send Your MikroTik RouterOS Script For Contribution -&gt; Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioMikrotik;
