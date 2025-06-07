import React, { useState } from "react";

type FormData = {
  dnsIPv4Server1: string;
  dnsIPv4Server2: string;
  dnsIPv6Server1: string;
  dnsIPv6Server2: string;
  dohServer: string;
  dohHostname: string;
};

type ScriptResult = {
  data: FormData;
  html1: string;
  html2: string;
  html3: string;
  text: string;
};

type DnsOptions = {
  id: string;
  name: string;
};

interface Props {
  dnsOptions: DnsOptions[];
}

const ScriptTable = ({ title, htmlContent }: { title: string; htmlContent: string }) => (
  <div className="overflow-x-auto rounded-t-lg my-4">
    <table className="table-auto w-full border-spacing-2 border-slate-600">
      <thead>
        <tr className="bg-gray-700 text-gray-200">
          <th className="border-slate-700 p-2 border">{title}</th>
        </tr>
      </thead>
      <tbody>
        <tr className="text-gray-800">
          <td className="border-slate-700 p-2 border pl-4 text-white">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const FormulariomikrotikDnsOverHttpsDoh = ({ dnsOptions: initialDnsOptions }: Props) => {
  const [selectedDnsOption, setSelectedDnsOption] = useState<string>("");
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedDnsOption(selectedOption);
    handleGenerate(selectedOption);
  };

  const handleGenerate = async (type: string) => {
    setIsLoading(true);
    try {
      const payload = { type };

      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-dns-over-https-doh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
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
              value={selectedDnsOption}
              onChange={handleSelectChange}
            >
              <option value="">- Seleccionar -</option>
              {initialDnsOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {scriptResult && (
          <>
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
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        DNS, IPv4
                      </label>
                    </td>
                    <td className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data.dnsIPv4Server1}
                    </td>
                    <td className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data.dnsIPv4Server2}
                    </td>
                  </tr>
                  <tr className="text-gray-800">
                    <td className="border-slate-700 p-2 border pl-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        DNS, IPv6
                      </label>
                    </td>
                    <td className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data.dnsIPv6Server1}
                    </td>
                    <td className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data.dnsIPv6Server2}
                    </td>
                  </tr>
                  <tr className="text-gray-800">
                    <td className="border-slate-700 p-2 border pl-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        DNS over HTTPS, DoH
                      </label>
                    </td>
                    <td colSpan={2} className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data.dohServer}
                    </td>
                  </tr>
                  <tr className="text-gray-800">
                    <td className="border-slate-700 p-2 border pl-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        DoH Hostname
                      </label>
                    </td>
                    <td colSpan={2} className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data.dohHostname}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ScriptTable title="DNS or DoH, IPv4 - Mikrotik Script" htmlContent={scriptResult.html1} />
            <ScriptTable title="DNS or DoH, IPv6 - Mikrotik Script" htmlContent={scriptResult.html2} />
            <ScriptTable title="Verify DoH Certificate - Mikrotik Script (Optional)" htmlContent={scriptResult.html3} />

            <button
              type="button"
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              onClick={handleCopyScript}
            >
              Copy Script
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormulariomikrotikDnsOverHttpsDoh;
