
import React, { useState } from "react";

type ScriptResult = {
    html: string;
    text: string;
};

interface FormData {
    parentNameQueue: string;
    targetLocalIP: string;
    upTotal: string;
    downTotal: string;
    clientNameQueue: string;
    clientIdentity: string;
    startIPClient: string;
    endIPClient: string;
    upClient: string;
    downClient: string;
    bucketSizeUp: string;
    bucketSizeDown: string;
}

export default function FormularioScriptGenerator() {
    const [parentNameQueue, setParentNameQueue] = useState("Global-Connection");
    const [targetLocalIP, setTargetLocalIP] = useState("192.168.88.0/24");
    const [upTotal, setUpTotal] = useState("5M");
    const [downTotal, setDownTotal] = useState("10M");
    const [clientNameQueue, setClientNameQueue] = useState("Client-");
    const [clientIdentity, setClientIdentity] = useState("1");
    const [startIPClient, setStartIPClient] = useState("192.168.88.10");
    const [endIPClient, setEndIPClient] = useState("192.168.88.35");
    const [upClient, setUpClient] = useState("512K");
    const [downClient, setDownClient] = useState("1M");
    const [bucketSizeUp, setBucketSizeUp] = useState("0.1");
    const [bucketSizeDown, setBucketSizeDown] = useState("0.1");
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClear = () => {
        setParentNameQueue("");
        setTargetLocalIP("");
        setUpTotal("");
        setDownTotal("");
        setClientNameQueue("");
        setClientIdentity("");
        setStartIPClient("");
        setEndIPClient("");
        setUpClient("");
        setDownClient("");
        setBucketSizeUp("0.1");
        setBucketSizeDown("0.1");
        setScriptResult(null);
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const payload = {
                parentNameQueue: parentNameQueue,
                targetLocalIP: targetLocalIP,
                upTotal: upTotal,
                downTotal: downTotal,
                clientNameQueue: clientNameQueue,
                clientIdentity: clientIdentity,
                startIPClient: startIPClient,
                endIPClient: endIPClient,
                upClient: upClient,
                downClient: downClient,
                bucketSizeUp: bucketSizeUp,
                bucketSizeDown: bucketSizeDown,
            };

            // Simulate API call
            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/simple-queue-generator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: JSON.stringify(payload),
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

    return (
        <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
            {/* Form Section */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                <form className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="parentNameQueue"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            Parent Nombre Queue
                        </label>
                        <input
                            id="parentNameQueue"
                            type="text"
                            value={parentNameQueue}
                            onChange={(e) => setParentNameQueue(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            placeholder="Global-Connection"
                        />
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="targetLocalIP"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            Target Local IP / Interface
                        </label>
                        <input
                            id="targetLocalIP"
                            type="text"
                            value={targetLocalIP}
                            onChange={(e) => setTargetLocalIP(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            placeholder="192.168.88.0/24"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="upTotal"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Up Total (K/M)
                            </label>
                            <input
                                id="upTotal"
                                type="text"
                                value={upTotal}
                                onChange={(e) => setUpTotal(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="5M"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="downTotal"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Down Total (K/M)
                            </label>
                            <input
                                id="downTotal"
                                type="text"
                                value={downTotal}
                                onChange={(e) => setDownTotal(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="10M"
                            />
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-orange-400 mb-4">Sub Parent Queue / Child Queue</h2>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="clientNameQueue"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Client Name Queue
                            </label>
                            <input
                                id="clientNameQueue"
                                type="text"
                                value={clientNameQueue}
                                onChange={(e) => setClientNameQueue(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="Client-"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="clientIdentity"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Client Identity
                            </label>
                            <input
                                id="clientIdentity"
                                type="text"
                                value={clientIdentity}
                                onChange={(e) => setClientIdentity(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="1"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="startIPClient"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Start IP Client
                            </label>
                            <input
                                id="startIPClient"
                                type="text"
                                value={startIPClient}
                                onChange={(e) => setStartIPClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="192.168.88.10"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="endIPClient"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                End IP Client
                            </label>
                            <input
                                id="endIPClient"
                                type="text"
                                value={endIPClient}
                                onChange={(e) => setEndIPClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="192.168.88.35"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="upClient"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Up Client (K/M)
                            </label>
                            <input
                                id="upClient"
                                type="text"
                                value={upClient}
                                onChange={(e) => setUpClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="512K"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="downClient"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Down Client (K/M)
                            </label>
                            <input
                                id="downClient"
                                type="text"
                                value={downClient}
                                onChange={(e) => setDownClient(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                placeholder="1M"
                            />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="bucketSizeUp"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Bucket Size Up
                            </label>
                            <select
                                id="bucketSizeUp"
                                value={bucketSizeUp}
                                onChange={(e) => setBucketSizeUp(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            >
                                <option value="0.1">0.1 (default)</option>
                                <option value="0.2">0.2</option>
                                <option value="0.3">0.3</option>
                                <option value="0.4">0.4</option>
                                <option value="0.5">0.5</option>
                            </select>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label
                                htmlFor="bucketSizeDown"
                                className="block text-sm font-semibold text-gray-300"
                            >
                                Bucket Size Down
                            </label>
                            <select
                                id="bucketSizeDown"
                                value={bucketSizeDown}
                                onChange={(e) => setBucketSizeDown(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            >
                                <option value="0.1">0.1 (default)</option>
                                <option value="0.2">0.2</option>
                                <option value="0.3">0.3</option>
                                <option value="0.4">0.4</option>
                                <option value="0.5">0.5</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-orange-400 text-sm mb-2">
                            ANCHO DE BANDA CON CÁLCULO DE TOKEN BUCKET <br />
                            Bucket Capacity (BC) = bucket-size * max-limit <br />
                            Time = BC / (Parent Max-limit - Token Rate)
                        </p>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                            onClick={handleGenerate}
                        >
                            Generate
                        </button>
                        <button
                            type="button"
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                            onClick={handleClear}
                        >
                            Clear All
                        </button>
                    </div>
                </form>
            </div>

            {/* Result Section */}
            <div className="flex flex-col lg:w-1/2 min-h-0">
                <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">Script Generator Result</label>
                    <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                        {scriptResult && (
                            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
                        )}
                    </div>
                </div>

                <div className="flex mt-4 space-x-4">
                    <button
                        type="button"
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        onClick={handleGenerate}
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
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        onClick={() => scriptResult && navigator.clipboard.writeText(scriptResult.text)}
                    >
                        Copiar Script
                    </button>
                </div>
            </div>
        </div>
    );
};

