import SocialTooltipButton from "../SocialTooltipButton";
import React, { useState } from "react";


type ScriptResult = {
    html: string;
    text: string;
};

interface FormData {
    idVpnConnection: string;
    vpnNameOnInterface: string;
    vpnIpAddress: string;
    vpnUsername: string;
    vpnPassword: string;
}

const FormularioVpnRemoteGenerator = () => {
    const [formData, setFormData] = useState<FormData>({
        idVpnConnection: 'sstpl',
        vpnNameOnInterface: 'VPN-REMOTE',
        vpnIpAddress: '137.129.63.112',
        vpnUsername: 'username',
        vpnPassword: 'password',
    });

    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/vpn-remote-generator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resultData: ScriptResult = await response.json();
            setScriptResult(resultData);
        } catch (error) {
            console.error('Error generating script:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setFormData({
            idVpnConnection: 'sstp',
            vpnNameOnInterface: 'VPN-REMOTE',
            vpnIpAddress: '137.129.63.112',
            vpnUsername: 'username',
            vpnPassword: 'password',
        });
        setScriptResult(null);
    };

    const handleCopyScript = () => {
        if (scriptResult) {
            navigator.clipboard.writeText(scriptResult.text);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg h-[70vh]">
            {/* Form Section */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="idVpnConnection"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            Select VPN Connection
                        </label>
                        <select
                            id="idVpnConnection"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            value={formData.idVpnConnection}
                            onChange={handleChange}
                        >
                            <option value="sstp">Seleccione la VPN de conexion</option>
                            <option value="sstp">SSTP - Secure Socket Tunneling Protocol</option>
                            <option value="pptp">PPTP - Point to Point Tunneling Protocol</option>
                            <option value="l2tp">L2TP - Layer Two Tunneling Protocol</option>
                            <option value="ovpn">OVPN - Open VPN (Virtual Private Network)</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="vpnNameOnInterface"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            VPN Name on Interface
                        </label>
                        <input
                            id="vpnNameOnInterface" 
                            type="text"
                            placeholder="VPN-REMOTE"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            value={formData.vpnNameOnInterface}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="vpnIpAddress"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            VPN IP Address or Host Name
                        </label>
                        <input
                            id="vpnIpAddress"
                            type="text"
                            placeholder="example: 137.129.63.112"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            value={formData.vpnIpAddress}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="vpnUsername"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            VPN Username
                        </label>
                        <input
                            id="vpnUsername"
                            type="text"
                            placeholder="username"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            value={formData.vpnUsername}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="vpnPassword"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            VPN Password
                        </label>
                        <input
                            id="vpnPassword"
                            type="password"
                            placeholder="password"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            value={formData.vpnPassword}
                            onChange={handleChange}
                        />
                    </div>
                      <SocialTooltipButton />
                </form>
             
            </div>
   
            {/* Result Section */}
            <div className="flex flex-col lg:w-1/2 min-h-0">
                <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                        Resultado del Generador de Script
                    </label>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
                        {scriptResult ? (
                            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
                        ) : (
                            <p className="text-gray-500">
                                {isLoading
                                    ? "Generando script..."
                                    : "El script generado aparecerá aquí"}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex mt-4 space-x-4">
                    <button
                        type="button"
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
                        onClick={handleGenerate}
                        disabled={isLoading}
                    >
                        Generar
                    </button>

                    <button
                        type="button"
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                        onClick={handleClear}
                    >
                        Borrar Todo
                    </button>

                    <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:bg-green-300 disabled:cursor-not-allowed"
                        onClick={handleCopyScript}
                        disabled={!scriptResult}
                    >
                        Copiar Script
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormularioVpnRemoteGenerator;
