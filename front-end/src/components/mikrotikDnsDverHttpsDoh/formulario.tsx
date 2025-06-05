import React, { useState } from "react";


type ScriptResult = {
  html: string;
  text: string;
};

interface FormData {
  dnsIPv4Server1: string;
  dnsIPv4Server2: string;
  dnsIPv6Server1: string;
  dnsIPv6Server2: string;
  dohServer: string;
  dohHostname: string;
}

const FormulariomikrotikDnsOverHttpsDoh = () => {
  const [formData, setFormData] = useState<FormData>({
    dnsIPv4Server1: "94.140.14.14",
    dnsIPv4Server2: "94.140.15.15",
    dnsIPv6Server1: "2a10:50c0::ad1:ff",
    dnsIPv6Server2: "2a10:50c0::ad2:ff",
    dohServer: "https://dns.adguard.com/dns-query",
    dohHostname: "dns.adguard.com",
  });

  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-dns-script-generator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const resultData: ScriptResult = await response.json();
      setScriptResult(resultData);
    } catch (error) {
      console.error("Error generating script:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      dnsIPv4Server1: "",
      dnsIPv4Server2: "",
      dnsIPv6Server1: "",
      dnsIPv6Server2: "",
      dohServer: "",
      dohHostname: "",
    });
    setScriptResult(null);
  };

  const handleCopyScript = () => {
    if (scriptResult) {
      navigator.clipboard.writeText(scriptResult.text);
    }
  };

  return (

      <div className="bg-gray-900 text-white font-sans min-h-screen flex items-center justify-center">
    

        <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="text-gray-100 shadow-2xl rounded-lg p-6 w-full ring-2 ring-slate-600 text-center">
            <div>
              <select
                id="ros-version"
                className="w-5/6 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-500 shadow-lg shadow-blue-500/50"
              >
                <option value="v6.xx">AdGuard DNS - 94.140.14.14</option>
                <option value="v7.xx">Cloudflare DNS - 1.1.1.1</option>
                <option value="v7.xx">Cisco OpenDNS - 208.67.222.222</option>
                <option value="v7.xx">Google DNS - 8.8.8.8</option>
                <option value="v7.xx">Quad9 DNS - 9.9.9.9</option>
                <option value="v7.xx">NextDNS - 45.90.28.140</option>
                <option value="v7.xx">Applied Privacy DNS - 94.130.106.88</option>
                <option value="v7.xx">Ali DNS - 223.5.5.5</option>
                <option value="v7.xx">BlahDNS - 95.216.212.177</option>
                <option value="v7.xx">Comodo Secure DNS - 8.26.56.26 - Not Support DoH</option>
                <option value="v7.xx">CleanBrowsing - 185.228.168.168</option>
                <option value="v7.xx">CIRA Shield DNS - 149.112.121.10</option>
                <option value="v7.xx">CZ.NIC ODVR - 193.17.47.1</option>
                <option value="v7.xx">ControlD DNS - 76.76.2.0</option>
                <option value="v7.xx">CFIEC Public DNS - 240C::6666</option>
                <option value="v7.xx">Captnemo DNS 139.59.48.222:4434 - Not Support DoH</option>
                <option value="v7.xx">Comss.ru DNS - 92.38.152.163</option>
                <option value="v7.xx">DNS for Family - 94.130.180.225</option>
                <option value="v7.xx">Dyn DNS - 216.146.35.35 - Not Support DoH</option>
                <option value="v7.xx">DNSPod - 119.29.29.29</option>
                <option value="v7.xx">DNS.SB - 185.222.222.222</option>
                <option value="v7.xx">DNS Forge - 176.9.93.198</option>
                <option value="v7.xx">DNS Privacy - 185.49.141.37 - Not Support DoH</option>
                <option value="v7.xx">Digitale Gesellschaft DNS - 185.95.218.42</option>
                <option value="v7.xx">DNS.WATCH - 84.200.69.80 - Not Support DoH</option>
                <option value="v7.xx">FreeDNS - 172.104.237.57 - Not Support DoH</option>
                <option value="v7.xx">Freenom World - 80.80.80.80 - Not Support DoH</option>
                <option value="v7.xx">Fondation Restena DNS - 158.64.1.29</option>
                <option value="v7.xx">Fvz DNS - 185.121.177.177 - Not Support DoH</option>
                <option value="v7.xx">FFMUC DNS</option>
                <option value="v7.xx">Ibksturm DNS - 178.82.102.190</option>
                <option value="v7.xx">Lelux DNS - 51.158.147.50</option>
                <option value="v7.xx">LibreDNS - 88.198.92.222</option>
                <option value="v7.xx">Mullvad</option>
                <option value="v7.xx">Neustar UltraDNS - 156.154.70.1 - Not Support DoH</option>
                <option value="v7.xx">OSZX DNS - 51.38.83.141</option>
                <option value="v7.xx">OpenNIC DNS - 185.121.177.17 - Not Support DoH</option>
                <option value="v7.xx">OneDNS - 117.50.10.10 - Not Support DoH</option>
                <option value="v7.xx">Privacy-First DNS - 174.138.21.128</option>
                <option value="v7.xx">PuntCAT DNS - 109.69.8.51 - Not Support DoH</option>
                <option value="v7.xx">PI-DNS - 88.198.91.187</option>
                <option value="v7.xx">Quad101 - 101.101.101.101</option>
                <option value="v7.xx">RethinkDNS</option>
                <option value="v7.xx">SWITCH DNS - 130.59.31.248</option>
                <option value="v7.xx">SkyDNS RU - 193.58.251.251 - Not Support DoH</option>
                <option value="v7.xx">Safe DNS - 195.46.39.39 - Not Support DoH</option>
                <option value="v7.xx">Snopyta DNS - 95.216.24.230</option>
                <option value="v7.xx">Strongarm DNS - 54.174.40.213 - Not Support DoH</option>
                <option value="v7.xx">SafeSurfer DNS - 104.155.237.225 - Not Support DoH</option>
                <option value="v7.xx">Seby DNS - 45.76.113.31</option>
                <option value="v7.xx">Verisign Public DNS - 64.6.64.6 - Not Support DoH</option>
                <option value="v7.xx">Yandex-DNS - 77.88.8.8 - Not Support DoH</option>
                <option value="v7.xx">360 Secure DNS - 101.226.4.6</option>
                <option value="v7.xx">114DNS - 114.114.114.114 - Not Support DoH</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-t-lg my-16">
            <table className="table-auto w-full border-spacing-2 border-slate-600">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border-slate-700 p-2 border">Protocol</th>
                  <th className="border-slate-700 p-2 border">Server 1</th>
                  <th className="border-slate-700 p-2 border">Server 2</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border pl-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">DNS, IPv4</label>
                  </td>
                  <td className="border-slate-700 p-2 border pl-4">
                    <input
                      id="dnsIPv4Server1"
                      type="text"
                      value={formData.dnsIPv4Server1}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-600"
                    />
                  </td>
                  <td className="border-slate-700 p-2 border pl-4">
                    <input
                      id="dnsIPv4Server2"
                      type="text"
                      value={formData.dnsIPv4Server2}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-600"
                    />
                  </td>
                </tr>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border pl-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">DNS, IPv6</label>
                  </td>
                  <td className="border-slate-700 p-2 border pl-4">
                    <input
                      id="dnsIPv6Server1"
                      type="text"
                      value={formData.dnsIPv6Server1}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-600"
                    />
                  </td>
                  <td className="border-slate-700 p-2 border pl-4">
                    <input
                      id="dnsIPv6Server2"
                      type="text"
                      value={formData.dnsIPv6Server2}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-600"
                    />
                  </td>
                </tr>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border pl-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">DNS over HTTPS, DoH</label>
                  </td>
                  <td colSpan={2} className="border-slate-700 p-2 border pl-4">
                    <input
                      id="dohServer"
                      type="text"
                      value={formData.dohServer}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-600"
                    />
                  </td>
                </tr>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border pl-4">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">DoH Hostname</label>
                  </td>
                  <td colSpan={2} className="border-slate-700 p-2 border pl-4">
                    <input
                      id="dohHostname"
                      type="text"
                      value={formData.dohHostname}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-600 rounded bg-gray-600"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={handleGenerate}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Clear All
            </button>
          </div>

          <div className="overflow-x-auto rounded-t-lg my-4">
            <table className="table-auto w-full border-spacing-2 border-slate-600">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border-slate-700 p-2 border">DNS or DoH, IPv4 - Mikrotik Script</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border pl-4">
                    <label className="block text-base mb-2 text-gray-300 font-sans md:ui-serif">
                      /ip dns set <span className="text-sky-400">allow-remote-requests</span>=yes <span className="text-sky-400">cache-max-ttl</span>=1d <span className="text-sky-400">servers</span>={formData.dnsIPv4Server1},{formData.dnsIPv4Server2} <span className="text-sky-400">use-doh-server</span>={formData.dohServer}<br />
                      /ip dns static <br />
                      add address=<span className="text-sky-400">{formData.dnsIPv4Server1}</span> name={formData.dohHostname}<br />
                      add address=<span className="text-sky-400">{formData.dnsIPv4Server2}</span> name={formData.dohHostname}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto rounded-t-lg my-4">
            <table className="table-auto w-full border-spacing-2 border-slate-600">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border-slate-700 p-2 border">DNS or DoH, IPv6 - Mikrotik Script</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border pl-4">
                    <label className="block text-base mb-2 text-gray-300 font-sans md:ui-serif">
                      /ip dns set <span className="text-sky-400">allow-remote-requests</span>=yes <span className="text-sky-400">cache-max-ttl</span>=1d <span className="text-sky-400">servers</span>={formData.dnsIPv6Server1}, {formData.dnsIPv6Server2} <span className="text-sky-400">use-doh-server</span>={formData.dohServer}<br />
                      /ip dns static <br />
                      add address=<span className="text-sky-400">{formData.dnsIPv6Server1}</span> name={formData.dohHostname}<br />
                      add address=<span className="text-sky-400">{formData.dnsIPv6Server2}</span> name={formData.dohHostname}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto rounded-t-lg my-2">
            <table className="table-auto w-full border-spacing-2 border-slate-600">
              <thead>
                <tr className="bg-gray-700 text-gray-200">
                  <th className="border-slate-700 p-2 border">Verify DoH Certificate - Mikrotik Script (Optional)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-800">
                  <td className="border-slate-700 p-2 border pl-4">
                    <label className="block text-base mb-2 text-gray-300 font-sans md:ui-serif">
                      Step1: /tool fetch url=<span className="text-sky-400">https://cacerts.digicert.com/DigiCertGlobalRootCA.crt.pem</span><br />
                      Step2: /certificate import file-name=<span className="text-sky-400">DigiCertGlobalRootCA.crt.pem passphrase=""</span><br />
                      Step3: /ip dns set verify-doh-cert=yes<br />
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            onClick={handleCopyScript}
          >
            Copy Script
          </button>
        </div>
      </div>
    
   
  );

};


export default FormulariomikrotikDnsOverHttpsDoh;
