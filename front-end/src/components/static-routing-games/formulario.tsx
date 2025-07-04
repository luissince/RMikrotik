
import SocialTooltipButton from "../SocialTooltipButton";
import React, { useEffect, useState } from 'react';
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";

interface Props {
    session: Session | null;
    subscription: Subscription | null;
}
interface Game {
    name: string;
    id: string;
}

interface Category {
    name: string;
    games: Game[];
}

interface ApiResponse {
    categories: Category[];
}

interface FormData {
    idRouterOsVersion: string;
    gatewayToWanOrIspGame: string;
}

interface ScriptResult {
    html: string;
    text: string;
}

const FormularioStaticRoutingGames = ({ session, subscription }: Props) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [formData, setFormData] = useState<FormData>({
        idRouterOsVersion: 'ros6',
        gatewayToWanOrIspGame: ''
    });
    const [error, setError] = useState<string | null>(null);
    const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
    const [selectedGames, setSelectedGames] = useState<Game[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/games`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/hal+json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result: ApiResponse = await response.json();
                setCategories(result.categories);
            } catch (error) {
                setError('Error fetching games: ' + (error as Error).message);
            }
        };

        fetchGames();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleGenerate = async () => {
        try {
            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/static-routing-games`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/hal+json',
                },
                body: JSON.stringify({ ...formData, games: selectedGames }),
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
        setFormData({ idRouterOsVersion: 'ros6', gatewayToWanOrIspGame: '' });
        setSelectedGames([]);
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
        <form className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg h-[70vh]">
            {/* Panel izquierdo - Controles */}
            <div className="flex flex-col gap-6 lg:w-1/2">
                <div>
                    <label htmlFor="routeros" className="block font-semibold text-gray-300 mb-2">RouterOS Version</label>
                    <select
                        id="idRouterOsVersion"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.idRouterOsVersion}
                        onChange={handleChange}
                    >
                        <option value="ros6">RouterOS v6.xx</option>
                        <option value="ros7">RouterOS v7.xx</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="gateway" className="block font-semibold text-gray-300 mb-2">Gateway to WAN or ISP Game</label>
                    <input
                        id="gatewayToWanOrIspGame"
                        type="text"
                        placeholder="e.g.: 192.168.2.1 or pppoe-out"
                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={formData.gatewayToWanOrIspGame}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col flex-grow min-h-0">
                    <label htmlFor="games" className="block font-semibold text-gray-300 mb-2">Seleccione los Juegos</label>
                    <input
                        id="games"
                        type="text"
                        placeholder="Find Games..."
                        className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex-grow overflow-y-auto bg-gray-700 p-4 rounded ">
                        {filteredGames.map(category => (
                            <div key={category.name} className="mb-4">
                                <h3 className="font-semibold text-gray-300 mb-2">{category.name}</h3>
                                <div className="space-y-2">
                                    {category.games.map(game => (
                                        <div key={game.id} className="flex items-center">
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
                    {/* Tienes dudas */}
                    <SocialTooltipButton />

                </div>
            </div>

            {/* Panel derecho - Resultado */}
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
        </form>
    );
};

export default FormularioStaticRoutingGames;