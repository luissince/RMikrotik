import SocialTooltipButton from "../SocialTooltipButton";
import { useState } from "react";
import { keyIPAddress } from "../../utils/keyEvent";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
interface ScriptResult {
  html: string;
  text: string;
}

interface FormData {
  idSelectVpnConnection: string;
  createVpnNameOnInterfaceVpn: string;
  vpnIpAddress: string;
  vpnUsername: string;
  vpnPassword: string;
  targetIpGatewayYourIsp: string;
}

const FormularioVpnTunnelAllTrafficScriptGenerator = ({ session, subscription }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    idSelectVpnConnection: "pptp",
    createVpnNameOnInterfaceVpn: "VPN-Tunnel",
    vpnIpAddress: "",
    vpnUsername: "",
    vpnPassword: "",
    targetIpGatewayYourIsp: ""
  });

  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validación básica
      if (!formData.vpnIpAddress) {
        setError("VPN IP Address is required");
        return;
      }

      if (!formData.vpnUsername) {
        setError("VPN Username is required");
        return;
      }

      if (!formData.vpnPassword) {
        setError("VPN Password is required");
        return;
      }

      if (!formData.targetIpGatewayYourIsp) {
        setError("Target IP Gateway is required");
        return;
      }

      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/vpn-tunnel-all-traffic-script-generator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept": "application/hal+json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ScriptResult = await response.json();
      setScriptResult(result);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error generating script. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({
      idSelectVpnConnection: "pptp",
      createVpnNameOnInterfaceVpn: "VPN-Tunnel",
      vpnIpAddress: "",
      vpnUsername: "",
      vpnPassword: "",
      targetIpGatewayYourIsp: ""
    });
    setScriptResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (scriptResult) {
      navigator.clipboard.writeText(scriptResult.text)
        .then(() => alert("Script copied to clipboard!"))
        .catch(err => console.error("Failed to copy: ", err));
    }
  };

  return (
    <form className="grid grid-cols-1 lg:grid-cols-2 gap-6 " onSubmit={handleSubmit}>
      {/* Form Section */}
      <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="idSelectVpnConnection"
              className="block font-semibold text-gray-300 mb-2"
            >
              VPN Connection Type
            </label>
            <select
              id="idSelectVpnConnection"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.idSelectVpnConnection}
              onChange={handleInputChange}
            >
              <option value="pptp">PPTP - Point to Point Tunneling Protocol</option>
              <option value="sstp">SSTP - Secure Socket Tunneling Protocol</option>
              <option value="l2tp">L2TP - Layer Two Tunneling Protocol</option>
              <option value="ovpn">OVPN - Open VPN (Virtual Private Network)</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="createVpnNameOnInterfaceVpn"
              className="block font-semibold text-gray-300 mb-2 mt-4"
            >
              Create VPN Name on Interface VPN
            </label>
            <input
              id="createVpnNameOnInterfaceVpn"
              type="text"
              placeholder="Ej: VPN-Tunnel"
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={formData.createVpnNameOnInterfaceVpn}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label
              htmlFor="vpnIpAddress"
              className="block font-semibold text-gray-300 mb-2 mt-4"
            >
              VPN IP Address (No uses el nombre de host)
            </label>
            <input
              id="vpnIpAddress"
              type="text"
              placeholder="Ej: 137.129.63.112"
              className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 ${error && !formData.vpnIpAddress ? "ring-2 ring-red-500" : "focus:ring-orange-500"}`}
              value={formData.vpnIpAddress}
              onChange={handleInputChange}
              onKeyDown={keyIPAddress}
            />
            {error && !formData.vpnIpAddress && (
              <p className="mt-1 text-sm text-red-500">VPN IP Address is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="vpnUsername"
              className="block font-semibold text-gray-300 mb-2 mt-4"
            >
              VPN Username
            </label>
            <input
              id="vpnUsername"
              type="text"
              placeholder="Nombre de usuario"
              className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 ${error && !formData.vpnUsername ? "ring-2 ring-red-500" : "focus:ring-orange-500"}`}
              value={formData.vpnUsername}
              onChange={handleInputChange}
            />
            {error && !formData.vpnUsername && (
              <p className="mt-1 text-sm text-red-500">VPN Username is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="vpnPassword"
              className="block font-semibold text-gray-300 mb-2 mt-4"
            >
              VPN Password
            </label>
            <input
              id="vpnPassword"
              type="password"
              placeholder="Contraseña"
              className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 ${error && !formData.vpnPassword ? "ring-2 ring-red-500" : "focus:ring-orange-500"}`}
              value={formData.vpnPassword}
              onChange={handleInputChange}
            />
            {error && !formData.vpnPassword && (
              <p className="mt-1 text-sm text-red-500">VPN Password is required</p>
            )}
          </div>

          <div>
            <label
              htmlFor="targetIpGatewayYourIsp"
              className="block font-semibold text-gray-300 mb-2 mt-4"
            >
              Puerta de enlace IP de destino su ISP
            </label>
            <input
              id="targetIpGatewayYourIsp"
              type="text"
              placeholder="Ej: 192.168.1.1"
              className={`w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 ${error && !formData.targetIpGatewayYourIsp ? "ring-2 ring-red-500" : "focus:ring-orange-500"}`}
              value={formData.targetIpGatewayYourIsp}
              onChange={handleInputChange}
              onKeyDown={keyIPAddress}
            />
            {error && !formData.targetIpGatewayYourIsp && (
              <p className="mt-1 text-sm text-red-500">Target IP Gateway is required</p>
            )}
          </div>
        </div>
          <SocialTooltipButton />
      </div>

      {/* Result Section */}
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Script Generator Result
        </label>
        <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
          {scriptResult ? (
            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
          ) : (
            <p className="text-gray-500">
              {isSubmitting ? "Generando script..." : "El script generado aparecerá aquí"}
            </p>
          )}
        </div>

        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-gray-600 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 duration-300"
            onClick={handleClear}
          >
            Borrar Todo
          </button>
          <button
            type="submit"
            className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 disabled:bg-orange-300 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generando..." : "Generar Script"}
          </button>
          <button
            type="button"
            className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-teal-600 duration-300 disabled:bg-green-300 disabled:cursor-not-allowed"
            onClick={handleCopy}
            disabled={!scriptResult}
          >
            Copiar Script
          </button>
        </div>
      </div>
    </form>
  );
}

export default FormularioVpnTunnelAllTrafficScriptGenerator;
