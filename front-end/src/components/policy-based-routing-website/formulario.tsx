import React, { useState } from "react";

interface FormData {
    ipGatewayIsp: string;
    routingMark: string;
    idRosVersion: string;
    idRoutingOption: string;
    firstRegexp: string;
    lastRegexp: string;
}

interface ScriptResult {
    html: string;
    text: string;
}

interface Domain {
    name: string
}

const FormularioPolicyBasedRoutingWebsite = () => {
    const [formData, setFormData] = useState<FormData>({
        ipGatewayIsp: '',
        routingMark: '',
        idRosVersion: 'ros6',
        idRoutingOption: '02',
        firstRegexp: '',
        lastRegexp: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [domains, setDomains] = useState<Domain[]>([{ name: "youtube.com" }]);
    const [newDomain, setNewDomain] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleAddDomain = () => {
        // valida cuando el input es vacío
        if (newDomain.trim() === "") return;

        // valida si existe un duplicado
        const valid = domains.some((value) => value.name === newDomain);
        if(valid) return;

        // agrega un nuevo dominio
        const data = {
            name: newDomain
        }
        setDomains([...domains, data]);
        setNewDomain("");
    };

    const handleRemoveDomain = (name: string) => {
        const updatedDomains = domains.filter((value) => value.name !== name);
        setDomains(updatedDomains);
    };

    const handleGenerate = async () => {
        try {
            // Simulate API call
            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/policy-based-routing-website`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify({ ...formData, domains }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const resultData: ScriptResult = await response.json();
            setScriptResult(resultData);
        } catch (error) {
            setError('Error generating script: ' + (error as Error).message);
        }
    };

    const handleClear = () => {
        setFormData({
            ipGatewayIsp: '',
            routingMark: '',
            idRosVersion: 'ros6',
            idRoutingOption: '02',
            firstRegexp: '',
            lastRegexp: '',
        });
        setScriptResult(null);
    };

    return (
        <form className="bg-gray-900 p-6 rounded-lg shadow-lg min-h-[70vh]">
            {/* Formulario */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="ipGatewayIsp" className="block font-semibold text-orange-400 mb-2">IP Gateway ISP</label>
                        <input
                            id="ipGatewayIsp"
                            type="text"
                            placeholder="192.168.2.1"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.ipGatewayIsp}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="routingMark" className="block font-semibold text-orange-400 mb-2">Routing Mark</label>
                        <input
                            id="routingMark"
                            type="text"
                            placeholder="Streaming"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.routingMark}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="idRosVersion" className="block font-semibold text-orange-400 mb-2">ROS Version</label>
                        <select
                            id="idRosVersion"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.idRosVersion}
                            onChange={handleChange}
                        >
                            <option value="ros6">ROS v6.xx</option>
                            <option value="ros7">ROS v7.xx</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="idRoutingOption" className="block font-semibold text-orange-400 mb-2">Routing Option</label>
                        <select
                            id="idRoutingOption"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.idRoutingOption}
                            onChange={handleChange}
                        >
                            <option value="01">Get IP Use RAW TLS-Host</option>
                            <option value="03">Get IP Use RAW Content</option>
                            <option value="03">Get IP Use Filter TLS-Host</option>
                            <option value="04">Get IP Use Filter Content</option>
                            <option value="05">Get IP Use Layer-7</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="firstRegexp" className="block font-semibold text-orange-400 mb-2">First Regexp</label>
                        <input
                            id="firstRegexp"
                            type="text"
                            placeholder="First Regexp"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.firstRegexp}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="lastRegexp" className="block font-semibold text-orange-400 mb-2">Last Regexp</label>
                        <input
                            id="lastRegexp"
                            type="text"
                            placeholder="Last Regexp"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            value={formData.lastRegexp}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            {/* Dominios */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        placeholder="Try with 'domain.com' or use with Regex Function"
                        className="flex-grow p-2 rounded-l-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        type="button"
                        onClick={handleAddDomain}
                        className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600 transition"
                    >
                        Add New Domain Name
                    </button>
                </div>
                <div className="mt-2">
                    {domains.map((domain, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={domain.name}
                                readOnly
                                className="flex-grow p-2 rounded-l-md bg-gray-700 text-white"
                            />
                            <button
                                onClick={() => handleRemoveDomain(domain.name)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resultado */}
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold text-orange-400 mb-2">Copy-Paste to Terminal.</h3>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                        {scriptResult ? (
                            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
                        ) : (
                            <p className="text-gray-500 text-sm">
                                El script generado aparecerá aquí
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Botones */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    type="button"
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    onClick={handleClear}
                >
                    Borrar Todo
                </button>
                <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                    onClick={handleGenerate}
                >
                    Generate
                </button>
                <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                    disabled={!scriptResult}
                >
                    Copy Script
                </button>
            </div>
        </form>
    );
};

export default FormularioPolicyBasedRoutingWebsite;
