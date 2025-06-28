import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
type ScriptResult = {
    html1: string;
    html2: string;
    text1: string;
    text2: string;
};

interface FormData {
    blockOption: string;
}

const FormulariomikrotikAccessBlock = ({ session, subscription }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        blockOption: "",

    });
    const [error, setError] = useState<string | null>(null);
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);

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
        try {
            // Simulate API call
            const response = await fetch(
                `${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-access-block`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "application/json",
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
            setError("Error generating script: " + (error as Error).message);
        }
    };

    const handleCopyScript = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="flex flex-col gap-4 p-4 bg-gray-900 text-white">
            <div className="bg-gray-800 p-4 rounded-lg">
                <div className="mb-4">
                    <label
                        htmlFor="blockOptions"
                        className="block text-sm font-medium text-gray-300 mb-1"
                    >
                        Block Options
                    </label>
                    <select
                        id="blockOptions"
                        value={formData.blockOption}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-700"
                    >
                        <option value="Youtube">Youtube</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Twitter">Twitter</option>
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleGenerate}
                    className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
                >
                    Generate Script
                </button>
  <SocialTooltipButton />

                {scriptResult && (
                    <div className="mt-6">
                        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-orange-400 mb-2">
                                    STEP 1 - Copy Paste to Terminal
                                </h3>
                                <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                                    <div dangerouslySetInnerHTML={{ __html: scriptResult.html1 }} />
                                    <button
                                        type="button"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 mt-2"
                                        onClick={() => handleCopyScript(scriptResult.text1)}
                                    >
                                        Copy STEP 1
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                            <div className="bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-sm font-semibold text-orange-400 mb-2">
                                    STEP 2 - Copy Paste to Terminal
                                </h3>
                                <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
                                    <div dangerouslySetInnerHTML={{ __html: scriptResult.html2 }} />
                                    <button
                                        type="button"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-bold transition-all duration-300 mt-2"
                                        onClick={() => handleCopyScript(scriptResult.text2)}
                                    >
                                        Copy STEP 2
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {error && <p className="text-red-500 mt-4">{error}</p>}


            </div>
        </div>
    );
};






export default FormulariomikrotikAccessBlock;
