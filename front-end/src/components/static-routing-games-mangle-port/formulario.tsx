
import SocialTooltipButton from "../SocialTooltipButton";

import React, { useState, useEffect } from "react";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";

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

interface FormData {
  idRouterOsVersion: string;
  gatewayToWanOrIspGame: string;
}

const FormularioStaticRoutingGamesManglePort = ({ session, subscription }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [formData, setFormData] = useState<FormData>({
    idRouterOsVersion: 'ros6',
    gatewayToWanOrIspGame: '',
  });
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

  useEffect(() => {
    const fetchGames = async () => {
      const result = await makeApiCall("/games", null, "GET");
      if (result) {
        setCategories(result.categories);
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
    const result = await makeApiCall("/static-routing-games-mangle-port", { ...formData, games: selectedGames });
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    setFormData({
      idRouterOsVersion: 'ros6',
      gatewayToWanOrIspGame: '',
    });
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
    <form className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Columna Izquierda */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <div>
          <label htmlFor="idRouterOsVersion" className="block font-semibold text-gray-300 mb-2">RouterOS Version</label>
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
          <label htmlFor="gatewayToWanOrIspGame" className="block font-semibold text-gray-300 mb-2 mt-4">Gateway to WAN or ISP Game</label>
          <input
            id="gatewayToWanOrIspGame"
            type="text"
            placeholder="e.g.: 192.168.2.1 or pppoe-out"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={formData.gatewayToWanOrIspGame}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="games" className="block font-semibold text-gray-300 mb-2 mt-4">Buscar Juegos</label>
          <input
            id="games"
            type="text"
            placeholder="Buscar juegos..."
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

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

export default FormularioStaticRoutingGamesManglePort;
