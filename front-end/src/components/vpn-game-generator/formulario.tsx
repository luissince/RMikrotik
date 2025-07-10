import React, { useEffect, useState } from 'react';
import { keyIPAddress } from '../../utils/keyEvent';
import SocialTooltipButton from "../SocialTooltipButton";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from '../forms/BaseForm';

interface Props {
    session: Session | null;
    subscription: Subscription | null;
}

interface Game {
    id: string;
    name: string;
}

interface Category {
    id: number;
    name: string;
    games: Game[];
}

interface ApiResponse {
    categories: Category[];
}

interface FormData {
    vpnConnection: string;
    vpnNameOrInterface: string;
    vpnIpAddress: string;
    vpnUser: string;
    vpnPassword: string;
    ipGatewayIspGame: boolean;
    ipGatewayIspGameValue: string;
    games: Game[];
}

interface ScriptResult {
    html: string;
    text: string;
}

const FormularioVpnGameGenerator = ({ session, subscription }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        vpnConnection: 'pptp',
        vpnNameOrInterface: '',
        vpnIpAddress: '',
        vpnUser: '',
        vpnPassword: '',
        ipGatewayIspGame: false,
        ipGatewayIspGameValue: '',
        games: [],
    });
    const [error, setError] = useState<string | null>(null);

    const [selectedGames, setSelectedGames] = useState<Game[]>([]);
    // Usar hooks personalizados
    const { validateAuth } = useAuthValidation(session, subscription);
    const { makeApiCall, isLoading } = useApiCall(session);
    const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target;
            setFormData(prevData => ({
                ...prevData,
                [id]: checked,
                ipGatewayIspGameValue: checked ? prevData.ipGatewayIspGameValue : '',
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [id]: value,
            }));
        }
    };


    const handleSubmit = async () => {
        if (!validateAuth()) return;

        const result = await makeApiCall("/vpn-game-generator", formData);
        if (result) {
            setScriptResult(result);
        }
    };

    const handleClear = () => {
        if (!validateAuth()) return;

        setFormData(formData);
        setScriptResult(null);
    };

    const handleGameSelect = (game: Game) => {
        const newSelectedGames = [...selectedGames];

        if (newSelectedGames.some(selectedGame => selectedGame.id === game.id)) {
            newSelectedGames.splice(newSelectedGames.indexOf(game), 1);
        } else {
            newSelectedGames.push(game);
        }

        setSelectedGames(newSelectedGames);
    };

    const filteredGames = categories.map(category => ({
        ...category,
        games: category.games.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
    })).filter(category => category.games.length > 0);

    return (
        <form className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
            {/* Columna Izquierda */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                {/* Selección de RouterOS */}
                <div>
                    <label htmlFor="vpnConnection" className="block font-semibold text-gray-300 mb-2">VPN Connection</label>
                    <select
                        id="vpnConnection"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.vpnConnection}
                        onChange={handleChange}
                    >
                        <option value="pptp">PPTP - Point to Point Tunneling Protocol</option>
                        <option value="sstp">SSTP - Secure Socket Tunneling Protocol</option>
                        <option value="l2tp">L2TP - Layer Two Tunneling Protocol</option>
                        <option value="ovpn">OVPN - Open VPN (Virtual Private Network)</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="vpnNameOrInterface" className="block font-semibold text-gray-300 mb-2">VPN Name on Interface</label>
                    <input
                        id="vpnNameOrInterface"
                        type="text"
                        placeholder="VPN-GAME"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.vpnNameOrInterface}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="vpnIpAddress" className="block font-semibold text-gray-300 mb-2">VPN IP Address</label>
                    <input
                        id="vpnIpAddress"
                        type="text"
                        placeholder="example: 137.129.63.112"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.vpnIpAddress}
                        onChange={handleChange}
                        onKeyDown={(e) => keyIPAddress(e)}
                    />
                </div>

                <div>
                    <label htmlFor="vpnUser" className="block font-semibold text-gray-300 mb-2">VPN Username</label>
                    <input
                        id="vpnUser"
                        type="text"
                        placeholder="username"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.vpnUser}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="vpnPassword" className="block font-semibold text-gray-300 mb-2">VPN Password</label>
                    <input
                        id="vpnPassword"
                        type="password"
                        placeholder="password"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.vpnPassword}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="checkbox"
                        id="ipGatewayIspGame"
                        className="mr-2"
                        checked={formData.ipGatewayIspGame}
                        onChange={handleChange}
                    />
                    <label htmlFor="ipGatewayIspGame" className="text-white">IP Gateway ISP Game (optional)</label>
                    <input
                        id="ipGatewayIspGameValue"
                        type="text"
                        placeholder="example: 192.168.2.1"
                        className={`w-full p-2 rounded ${formData.ipGatewayIspGame ? "bg-gray-700" : "bg-gray-800"} text-white focus:outline-none focus:ring-2 focus:ring-orange-500`}
                        value={formData.ipGatewayIspGameValue}
                        onChange={handleChange}
                        disabled={!formData.ipGatewayIspGame}
                    />
                </div>

                {/* Selección de Juegos */}
                <div>
                    <label htmlFor="games" className="block font-semibold text-gray-300 mb-2">Select Mangle Games</label>
                    <input
                        id="games"
                        type="text"
                        placeholder="Find Game..."
                        className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex-grow overflow-y-auto bg-gray-700 p-4 rounded max-h-[50vh]">
                        {filteredGames.map(category => (
                            <div key={category.name} className="mb-4">
                                <h3 className="font-semibold text-orange-500 mb-2">{category.name}</h3>
                                <div className="space-y-2">
                                    {category.games.map(game => (
                                        <div key={game.id}>
                                            <input
                                                type="checkbox"
                                                id={game.id}
                                                className="mr-2"
                                                checked={selectedGames.some(selectedGame => selectedGame.id === game.id)}
                                                onChange={() => handleGameSelect(game)}
                                            />
                                            <label className='text-white' htmlFor={game.id}>{game.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <SocialTooltipButton />
            </div>

            {/* Columna Derecha */}
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
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={isLoading || !session}
                    >
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                        {isLoading ? "Generando..." : " Generar"}
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
                        disabled={!scriptResult?.html || !session}
                    >
                        Copiar Script
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormularioVpnGameGenerator;
