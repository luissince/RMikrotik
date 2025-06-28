import SocialTooltipButton from "../SocialTooltipButton";
import { useState } from "react";
import { keyIPAddress, keyNumberInteger } from "../../utils/keyEvent";
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

interface FirewallRule {
    id: number;
    idProtocol: string;
    targetPort: string;
    description: string;
}

const FormularioMikrotikPortStaticRouting = ({ session, subscription }: Props) => {
    // Estados para la configuración general
    const [idRoutingOption, setIdRoutingOption] = useState<string>("01");
    const [idRouterOsVersion, setIdRouterOsVersion] = useState<string>("ros6");
    const [ipGatewayIspVpn, setIpGatewayIspVpn] = useState<string>("");
    const [routingMarkTable, setRoutingMarkTable] = useState<string>("");

    // Estado para las reglas de firewall
    const [firewalls, setFirewalls] = useState<FirewallRule[]>([
        {
            id: 1,
            idProtocol: "TCP",
            targetPort: "",
            description: ""
        }
    ]);

    // Estado para el resultado
    const [result, setResult] = useState<ScriptResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Función para manejar cambios en los campos de entrada
    const handleInputChange = (field: string, value: string) => {
        switch (field) {
            case 'idRoutingOption':
                setIdRoutingOption(value);
                break;
            case 'idRouterOsVersion':
                setIdRouterOsVersion(value);
                break;
            case 'ipGatewayIspVpn':
                setIpGatewayIspVpn(value);
                break;
            case 'routingMarkTable':
                setRoutingMarkTable(value);
                break;
            default:
                break;
        }
    };

    // Función para manejar cambios en las reglas de firewall
    const handleFirewallChange = (id: number, field: string, value: string) => {
        setFirewalls(prevFirewalls =>
            prevFirewalls.map(firewall =>
                firewall.id === id ? { ...firewall, [field]: value } : firewall
            )
        );
    };

    // Función para agregar una nueva regla de firewall
    const addFirewallRule = () => {
        const newId = firewalls.length > 0 ? Math.max(...firewalls.map(f => f.id)) + 1 : 1;
        setFirewalls([
            ...firewalls,
            {
                id: newId,
                idProtocol: "TCP",
                targetPort: "",
                description: ""
            }
        ]);
    };

    // Función para eliminar una regla de firewall
    const removeFirewallRule = (id: number) => {
        setFirewalls(firewalls.filter(firewall => firewall.id !== id));
    };

    // Función para generar el script
    const handleGenerate = async () => {
        try {
            // Validar que todos los campos requeridos estén completos
            if (!ipGatewayIspVpn) {
                setError("IP Gateway ISP/VPN is required");
                return;
            }

            if (firewalls.some(f => !f.targetPort)) {
                setError("All firewall rules must have a target port");
                return;
            }

            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-port-static-routing`, {
                method: 'POST',
                headers: {
                    'accept': 'application/hal+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idRoutingOption,
                    idRouterOsVersion,
                    ipGatewayIspVpn,
                    routingMarkTable,
                    firewalls: firewalls.map(f => ({
                        idProtocol: f.idProtocol,
                        targetPort: f.targetPort,
                        description: f.description
                    }))
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resultData: ScriptResult = await response.json();
            setResult(resultData);
            setError(null);
        } catch (error) {
            setError('Error generating script: ' + (error as Error).message);
        }
    };

    // Función para limpiar el formulario
    const handleClear = () => {
        setIdRoutingOption("01");
        setIdRouterOsVersion("ros6");
        setIpGatewayIspVpn("");
        setRoutingMarkTable("");
        setFirewalls([
            {
                id: 1,
                idProtocol: "TCP",
                targetPort: "",
                description: ""
            }
        ]);
        setResult(null);
        setError(null);
    };

    // Función para copiar el script
    const handleCopy = () => {
        if (result) {
            navigator.clipboard.writeText(result.text);
        }
    };

    return (
        <>
            <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg ">
                <div className="text-center mb-6"></div>

                <div className="flex justify-center mb-8">
                    <img
                        src="/images/protocolo-puertos.png"
                        alt="Routing Diagram"
                        className="rounded-lg"
                    />
                </div>

                <form className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="routing-mark"
                                className="block font-semibold text-orange-400 mb-2"
                            >
                                Routing Option
                            </label>
                            <select
                                id="routing-option"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={idRoutingOption}
                                onChange={(e) => handleInputChange('idRoutingOption', e.target.value)}
                            >
                                <option value="01">Only Port Mangle Routing</option>
                                <option value="02">Port To IP Routing Use RAW</option>
                                <option value="03">Port To IP Routing Use Filter</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="gateway"
                                className="block font-semibold text-orange-400 mb-2"
                            >
                                IP Gateway ISP / VPN
                            </label>
                            <input
                                id="gateway"
                                type="text"
                                placeholder="e.g.: 192.168.1.1"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={ipGatewayIspVpn}
                                onChange={(e) => handleInputChange('ipGatewayIspVpn', e.target.value)}
                                onKeyDown={(e) => keyIPAddress(e)}
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="ros-version"
                                className="block font-semibold text-orange-400 mb-2"
                            >
                                RouterOS Version
                            </label>
                            <select
                                id="ros-version"
                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                value={idRouterOsVersion}
                                onChange={(e) => handleInputChange('idRouterOsVersion', e.target.value)}
                            >
                                <option value="ros6">RouterOS v6.xx</option>
                                <option value="ros7">RouterOS v7.xx</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="regexp"
                                className="block font-semibold text-orange-400 mb-2"
                            >
                                Routing Mark / Table
                            </label>
                            <div className="grid grid-cols-1 gap-4">
                                <input
                                    type="text"
                                    id="routing-mark-table"
                                    placeholder="Routing Mark/Table"
                                    className="p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    value={routingMarkTable}
                                    onChange={(e) => handleInputChange('routingMarkTable', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </form>

                <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500 mt-8">
                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="table-auto w-full border-spacing-2 border-slate-600">
                            <thead>
                                <tr className="bg-gray-700 text-gray-200">
                                    <th className="border-slate-700 p-2 border">Protocol</th>
                                    <th className="border-slate-700 p-2 border">Target Port</th>
                                    <th className="border-slate-700 p-2 border">Description</th>
                                    <th className="border-slate-700 p-2 border">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {firewalls.map((firewall) => (
                                    <tr key={firewall.id} className="text-gray-800">                                        
                                        <td className="border-slate-700 p-2 border">
                                            <select
                                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                value={firewall.idProtocol}
                                                onChange={(e) => handleFirewallChange(firewall.id, 'idProtocol', e.target.value)}
                                            >
                                                <option value="TCP">TCP</option>
                                                <option value="UDP">UDP</option>
                                            </select>
                                        </td>
                                        <td className="border-slate-700 p-2 border">
                                            <input
                                                type="text"
                                                placeholder="80,443"
                                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                value={firewall.targetPort}
                                                onChange={(e) => handleFirewallChange(firewall.id, 'targetPort', e.target.value)}
                                                onKeyDown={(e) => keyNumberInteger(e)}
                                            />
                                        </td>
                                        <td className="border-slate-700 p-2 border">
                                            <input
                                                type="text"
                                                placeholder="Browsing HTTP/s"
                                                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                value={firewall.description}
                                                onChange={(e) => handleFirewallChange(firewall.id, 'description', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-slate-700 text-center">
                                            <button
                                                type="button"
                                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                                onClick={() => removeFirewallRule(firewall.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                            onClick={addFirewallRule}
                        >
                            Add Firewall Rule
                        </button>
                    </div>
                    

                </div>
  <SocialTooltipButton />
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <div className="flex flex-wrap justify-center gap-4 mb-6 mt-7">
                    <button
                        className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-gray-600 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 duration-300"
                        onClick={handleClear}
                    >
                        Clear All
                    </button>
                    <button
                        className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300"
                        onClick={handleGenerate}
                    >
                        Generate Script
                    </button>

                    <button
                        className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-teal-600 duration-300"
                        onClick={handleCopy}
                    >
                        Copy Script
                    </button>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                        Script Generator Result
                    </label>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                        {result && (
                            <div dangerouslySetInnerHTML={{ __html: result.html }} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormularioMikrotikPortStaticRouting;
