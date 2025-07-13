import React, { useEffect, useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

type DnsOptions = {
  code: string;
  name: string;
};

interface Props {
  session: Session | null;
  subscription: Subscription | null;
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

const FormulariomikrotikDnsOverHttpsDoh = ({ session, subscription, dnsOptions }: Props) => {
  const [selectedDnsOption, setSelectedDnsOption] = useState<string>("");

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedDnsOption(selectedOption);
    handleSubmit(selectedOption);
  };

  const handleSubmit = async (type: string) => {
    if (!validateAuth()) return;

    const result = await makeApiCall("/mikrotik-dns-over-https-doh", { type });
    if (result) {
      setScriptResult(result);
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
              {dnsOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

        </div>
        <SocialTooltipButton />

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
                      {scriptResult.data?.dnsIPv4Server1 ?? "-"}
                    </td>
                    <td className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data?.dnsIPv4Server2 || "-"}
                    </td>
                  </tr>
                  <tr className="text-gray-800">
                    <td className="border-slate-700 p-2 border pl-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        DNS, IPv6
                      </label>
                    </td>
                    <td className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data?.dnsIPv6Server1 ?? "-"}
                    </td>
                    <td className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data?.dnsIPv6Server2 ?? "-"}
                    </td>
                  </tr>
                  <tr className="text-gray-800">
                    <td className="border-slate-700 p-2 border pl-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        DNS over HTTPS, DoH
                      </label>
                    </td>
                    <td colSpan={2} className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data?.dohServer ?? "-"}
                    </td>
                  </tr>
                  <tr className="text-gray-800">
                    <td className="border-slate-700 p-2 border pl-4">
                      <label className="block text-sm font-semibold mb-2 text-gray-300">
                        DoH Hostname
                      </label>
                    </td>
                    <td colSpan={2} className="border-slate-700 p-2 border pl-4 text-white">
                      {scriptResult.data?.dohHostname ?? "-"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ScriptTable title="DNS or DoH, IPv4 - Mikrotik Script" htmlContent={scriptResult.html1!} />
            <ScriptTable title="DNS or DoH, IPv6 - Mikrotik Script" htmlContent={scriptResult.html2!} />
            <ScriptTable title="Verify DoH Certificate - Mikrotik Script (Optional)" htmlContent={scriptResult.html3!} />

            <button
              type="button"
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              onClick={() => handleCopyScript()}
              disabled={isLoading}
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
