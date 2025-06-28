import React, { useState } from 'react';
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
interface FormData {
    uploadMaxLimit: string;
    uploadBurstLimit: string;
    uploadBurstTime: string;
    downloadMaxLimit: string;
    downloadBurstLimit: string;
    downloadBurstTime: string;
}

interface ApiResponse {
    data: {
        "upload-max-limit": string;
        "download-actual-burst-duration": string;
        "upload-threshold": string;
        "upload-actual-burst-duration": string;
        "upload-limit-at": string;
        "download-limit-at": string;
        "upload-burst-time-value": string;
        "upload-burst-limit": string;
        "download-max-limit": string;
        "download-burst-limit": string;
        "download-threshold": string;
        "download-burst-time-value": string;
    };
    "reate-limit": string;
}

const FormularioMikrotikBurstLimitCalculator: React.FC = ({ session, subscription }: Props) => {
    const [formData, setFormData] = useState<FormData>({
        uploadMaxLimit: '512K',
        uploadBurstLimit: '1M',
        uploadBurstTime: '6',
        downloadMaxLimit: '1M',
        downloadBurstLimit: '2M',
        downloadBurstTime: '6',
    });

    const [apiData, setApiData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleGenerate = async () => {
        setError(null); // Reset error state
        try {
            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/mikrotik-burst-limit-calculator`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/hal+json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result: ApiResponse = await response.json();
            setApiData(result);
        } catch (error) {
            setError('Error calling API: ' + (error as Error).message);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg min-h-[70vh]">
            <div className="flex flex-col gap-6 lg:w-1/2">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="table-auto w-full border-spacing-2 border-slate-600">
                        <thead>
                            <tr className="bg-gray-700 text-gray-200">
                                <th className="border-slate-700 p-2 border">TARGET UPLOAD</th>
                                <th className="border-slate-700 p-2 border">TARGET DOWNLOAD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-gray-800">
                                <td className="border-slate-700 p-2 border">
                                    <label htmlFor="uploadMaxLimit" className="block text-sm font-semibold text-gray-300 mt-1">
                                        Max Limit (K/M)
                                    </label>
                                    <div className="rounded-t-lg">
                                        <input
                                            id="uploadMaxLimit"
                                            type="text"
                                            placeholder="512K"
                                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            value={formData.uploadMaxLimit}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </td>
                                <td className="border-slate-700 p-2 border">
                                    <label htmlFor="downloadMaxLimit" className="block text-sm font-semibold text-gray-300 mt-1">
                                        Max Limit (K/M)
                                    </label>
                                    <input
                                        id="downloadMaxLimit"
                                        type="text"
                                        placeholder="1M"
                                        className="w-full p-2 rounded bg-slate-600 text-white placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.downloadMaxLimit}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="text-gray-800">
                                <td className="border-slate-700 p-2 border">
                                    <label htmlFor="uploadBurstLimit" className="block text-sm font-semibold text-gray-300 mt-1">
                                        Burst Limit (K/M)
                                    </label>
                                    <input
                                        id="uploadBurstLimit"
                                        type="text"
                                        placeholder="1M"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.uploadBurstLimit}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td className="border-slate-700 p-2 border">
                                    <label htmlFor="downloadBurstLimit" className="block text-sm font-semibold text-gray-300 mt-1">
                                        Burst Limit (K/M)
                                    </label>
                                    <input
                                        id="downloadBurstLimit"
                                        type="text"
                                        placeholder="2M"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.downloadBurstLimit}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr className="text-gray-800">
                                <td className="border-slate-700 p-2 border">
                                    <label htmlFor="uploadBurstTime" className="block text-sm font-semibold text-gray-300 mt-1">
                                        Actual Burst Time (s)
                                    </label>
                                    <input
                                        id="uploadBurstTime"
                                        type="text"
                                        placeholder="6"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.uploadBurstTime}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td className="border-slate-700 p-2 border">
                                    <label htmlFor="downloadBurstTime" className="block text-sm font-semibold text-gray-300 mt-1">
                                        Actual Burst Time (s)
                                    </label>
                                    <input
                                        id="downloadBurstTime"
                                        type="text"
                                        placeholder="6"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={formData.downloadBurstTime}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                  
                     <SocialTooltipButton />
                    <div className="flex justify-center mb-8 mt-8">
                        <img src="/images/NAT.png" alt="Routing Diagram" className="rounded-lg" />
                        
                    </div>
                   
                </div>
            </div>

            <div className="flex flex-col lg:w-1/2 min-h-0">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-100 mb-4">BURST LIMIT FOR QUEUE</h3>
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="overflow-x-auto rounded-t-lg">
                        <table className="table-auto w-full border-spacing-2 mb-6">
                            <thead>
                                <tr className="bg-gray-100 text-gray-200">
                                    <th className="bg-gray-800 text-gray-200 p-2 border-separate">Tab</th>
                                    <th className="bg-gray-800 text-gray-200 p-2 border-separate">Upload</th>
                                    <th className="bg-gray-800 text-gray-200 p-2 border-separate">Download</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border text-slate-300">Max Limit</td>
                                    <td className="p-2 border text-green-500 font-bold">{apiData && apiData.data["upload-max-limit"]}</td>
                                    <td className="p-2 border text-green-500 font-bold">{apiData && apiData.data["download-max-limit"]}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border text-slate-300">Burst Limit</td>
                                    <td className="p-2 border text-blue-500 font-bold">{apiData && apiData.data["upload-burst-limit"]}</td>
                                    <td className="p-2 border text-blue-500 font-bold">{apiData && apiData.data["download-burst-limit"]}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border text-slate-300">Burst Threshold</td>
                                    <td className="p-2 border text-purple-500 font-bold">{apiData && apiData.data["upload-threshold"]}</td>
                                    <td className="p-2 border text-purple-500 font-bold">{apiData && apiData.data["download-threshold"]}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border text-slate-300">Burst Time</td>
                                    <td className="p-2 border text-red-500 font-bold">{apiData && apiData.data["upload-burst-time-value"]}</td>
                                    <td className="p-2 border text-red-500 font-bold">{apiData && apiData.data["download-burst-time-value"]}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border text-slate-300">Limit At</td>
                                    <td className="p-2 border text-orange-500 font-bold">{apiData && apiData.data["upload-limit-at"]}</td>
                                    <td className="p-2 border text-orange-500 font-bold">{apiData && apiData.data["download-limit-at"]}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table-auto w-full border-spacing-2 mb-6">
                            <thead>
                                <tr className="bg-gray-100 text-gray-200">
                                    <th className="bg-gray-800 text-gray-200 p-2 border-separate">TAB ADVANCED</th>
                                    <th className="bg-gray-800 text-gray-200 p-2 border-separate">UPLOAD</th>
                                    <th className="bg-gray-800 text-gray-200 p-2 border-separate">DOWNLOAD</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="p-2 border text-slate-300">Limit At</td>
                                    <td className="p-2 border text-violet-400 font-bold">{apiData && apiData.data["upload-limit-at"]}</td>
                                    <td className="p-2 border text-violet-400 font-bold">{apiData && apiData.data["download-limit-at"]}</td>
                                </tr>
                                <tr>
                                    <td className="p-2 border text-slate-300">Priority</td>
                                    <td className="p-2 border text-sky-400 font-bold">{apiData && apiData.data["upload-actual-burst-duration"]}</td>
                                    <td className="p-2 border text-sky-400 font-bold">{apiData && apiData.data["download-actual-burst-duration"]}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="table-auto w-full border-spacing-2">
                            <thead>
                                <tr className="bg-gray-100 text-gray-200">
                                    <th className="bg-gray-800 text-gray-200 p-2 border-separate">RATE LIMIT FOR HOTSPOT OR PPPOE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-gray-100 text-gray-200">
                                    <td className="bg-red-600 text-gray-200 p-2 border-separate text-center">
                                        {apiData && apiData["reate-limit"] || "0K/0M 0M/0M 0K/0K 0/0 0 0K/0K"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-6 mt-7">
                        <button
                            type="button"
                            onClick={handleGenerate}
                            className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300"
                        >
                            Generar
                        </button>
                        <button
                            type="button"
                            className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-600 duration-300"
                        >
                            Copiar Script Generado
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormularioMikrotikBurstLimitCalculator;
