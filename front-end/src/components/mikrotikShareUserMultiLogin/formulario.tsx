import React, { useState } from "react";

type ScriptResult = {
    html: string;
    text: string;
};

interface FormData {
    parentNameQueue: string;
    maxLimit: string;
    targetIPAddress: string;
    profileName: string;
    sharedUser: string;
    rateLimit: string;
    userName: string;
    password: string;
    autoSetForBandwidthShared: boolean;
}

const FormularioMikrotikShareUserMultiLogin = () => {
    const [formData, setFormData] = useState<FormData>({
        parentNameQueue: "Jack Home",
        maxLimit: "2M/5M",
        targetIPAddress: "10.5.50.0/24",
        profileName: "Shared-Jack-Home",
        sharedUser: "5",
        rateLimit: "1M/2M",
        userName: "jack",
        password: "jack123",
        autoSetForBandwidthShared: false,
    });

    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };


    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            const response = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-share-user-multi-login`,
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
            parentNameQueue: "",
            maxLimit: "",
            targetIPAddress: "",
            profileName: "",
            sharedUser: "",
            rateLimit: "",
            userName: "",
            password: "",
            autoSetForBandwidthShared: false,
        });
        setScriptResult(null);
    };

    const handleCopyScript = () => {
        if (scriptResult) {
            navigator.clipboard.writeText(scriptResult.text);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
            <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
                <h2 className="text-xl font-bold text-orange-500">SIMPLE QUEUE</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna 1 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Parent Name Queue
                        </label>
                        <input
                            id="parentNameQueue"
                            type="text"
                            value={formData.parentNameQueue}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                        />
                    </div>

                    {/* Columna 2 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Max Limit (up/down)
                        </label>
                        <input
                            id="maxLimit"
                            type="text"
                            value={formData.maxLimit}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                        />
                    </div>
                </div>

                <div className="space-y-4 ">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">


                    </div>




                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Target IP Address - Match With Your Hotspot IP Address
                        </label>
                        <input
                            id="targetIPAddress"
                            type="text"
                            value={formData.targetIPAddress}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                        />
                    </div>

                    <h2 className="text-xl font-bold text-orange-500">HOTSPOT PROFILE</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Profile Name
                        </label>
                        <input
                            id="profileName"
                            type="text"
                            value={formData.profileName}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Columna 1 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Shared User
                            </label>
                            <input
                                id="sharedUser"
                                type="text"
                                value={formData.sharedUser}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                            />
                        </div>

                        {/* Columna 2 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Rate Limit (up/down)
                            </label>
                            <input
                                id="rateLimit"
                                type="text"
                                value={formData.rateLimit}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                            />
                        </div>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Columna 1 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                User Name
                            </label>
                            <input
                                id="userName"
                                type="text"
                                value={formData.userName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                            />
                        </div>

                        {/* Columna 2 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="text"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                            />
                        </div>
                    </div>





                    <div className="flex items-center">
                        <input
                            id="autoSetForBandwidthShared"
                            type="checkbox"
                            checked={formData.autoSetForBandwidthShared}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="text-sm font-medium text-gray-300">
                            Auto Set For Bandwidth Shared (UP-TO)
                        </label>
                    </div>

                    <div className="flex space-x-4">
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
                </div>
            </div>

            <div className="flex flex-col lg:w-1/2 min-h-0">
                <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                        Script Generator Result
                    </label>
                    <div className="h-60 overflow-y-auto flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
                        {scriptResult ? (
                            <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
                        ) : (
                            <p className="text-gray-500">
                                {isLoading ? "Generating script..." : "Script will appear here"}
                            </p>
                        )}
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
        </div>
    );
};




export default FormularioMikrotikShareUserMultiLogin;
