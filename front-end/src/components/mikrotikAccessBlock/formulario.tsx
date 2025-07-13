import React, { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

interface Props {
    session: Session | null;
    subscription: Subscription | null;
}

interface FormData {
    blockOption: string;
}

const FormulariomikrotikAccessBlock = ({ session, subscription }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        blockOption: "",
    });

    // Usar hooks personalizados
    const { validateAuth } = useAuthValidation(session, subscription);
    const { makeApiCall, isLoading } = useApiCall(session);
    const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    const handleSubmit = async () => {
        if (!validateAuth()) return;

        const result = await makeApiCall("/mikrotik-access-block", formData);
        if (result) {
            setScriptResult(result);
        }
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
                    onClick={handleSubmit}
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
                                    <div dangerouslySetInnerHTML={{ __html: scriptResult.html1! }} />
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
                                    <div dangerouslySetInnerHTML={{ __html: scriptResult.html2! }} />
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
            </div>
        </div>
    );
};






export default FormulariomikrotikAccessBlock;
