import { useState } from "react";
import type React from "react";

// Definimos los tipos para los juegos y las categorías
interface Game {
  id: string;
  name: string;
}

type Category = "mobile" | "web" | "desktop";

interface GamesData {
  mobile: Game[];
  web: Game[];
  desktop: Game[];
}

// Juegos por categorías
const gamesData: GamesData = {
  mobile: [
    { id: "game1", name: "Arena Of Valor (AOV) - Mobile" },
    { id: "game2", name: "Among Us - Mobile" },
    { id: "game3", name: "Call of Duty (COD) - Mobile" },
    { id: "game4", name: "PUBG Mobile" },
    { id: "game5", name: "Minecraft - Mobile" }
  ],
  web: [
    { id: "game6", name: "League of Legends - Web" },
    { id: "game7", name: "Agar.io - Web" },
    { id: "game8", name: "Slither.io - Web" }
  ],
  desktop: [
    { id: "game9", name: "Fortnite - PC" },
    { id: "game10", name: "Minecraft - PC" },
    { id: "game11", name: "Counter-Strike: Global Offensive (CS:GO) - PC" }
  ]
};

const FormularioStaticRoutingGamesManglePort = () => {
  const [version, setVersion] = useState<string>("");
  const [gateway, setGateway] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para la búsqueda de juegos
  const [selectedCategory, setSelectedCategory] = useState<Category>("mobile"); // Estado para la categoría seleccionada
  const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set()); // Estado para los juegos seleccionados
  const [isGatewayValid, setIsGatewayValid] = useState<boolean>(true); // Estado para la validez del gateway
  const [result, setResult] = useState<string>(""); // Estado para almacenar el resultado de la API

  // Expresión regular para validar una dirección IP
  const isValidIP = (ip: string): boolean => {
    const regex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value as Category);
    setSearchQuery(""); // Limpiar la búsqueda al cambiar de categoría
  };

  const handleGatewayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGateway(value);

    // Validar si el valor ingresado es una dirección IP válida
    if (isValidIP(value) || value === "") {
      setIsGatewayValid(true); // Es válida
    } else {
      setIsGatewayValid(false); // No válida
    }
  };

  const handleGamesChange = (event: React.ChangeEvent<HTMLInputElement>, game: string) => {
    const updatedSelectedGames = new Set(selectedGames);
    if (updatedSelectedGames.has(game)) {
      updatedSelectedGames.delete(game);
    } else {
      updatedSelectedGames.add(game);
    }
    setSelectedGames(updatedSelectedGames);
  };

  // Función para enviar los datos a la API
  const onClickGenerate = async (form: { version: string, gateway: string, games: string[] }) => {
    console.log("Enviando datos a la API...", form);

    try {
      const response = await fetch("http://localhost:8080/balanceo-carga", {
        method: "POST", // Método POST
        headers: {
          "Content-Type": "application/json", // Asegúrate de enviar JSON
        },
        body: JSON.stringify(form), // Convertir datos a formato JSON
      });
      const data = await response.json();
      setResult(data.message); // Suponiendo que la respuesta contiene un campo "message"
      console.log(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // Filtrar los juegos en función de la búsqueda
  const filteredGames = gamesData[selectedCategory].filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      {/* <!-- Selección de Versión de RouterOS --> */}
     


    <div className="flex">
      {/* Columna 1: 1/4 del ancho */}
      <div className="w-1/3 mt-2 bg-gray-700 p-4  rounded-lg flex flex-col text-white">
      <div className="space-y-6">
        <div>
          <label htmlFor="routeros" className="block font-semibold text-gray-300 mb-2">
            RouterOS Version
          </label>
          <select
            id="routeros"
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={version}
            onChange={(e) => setVersion(e.target.value)}
          >
            <option value="">- Seleccione -</option>
            <option value="v6.xx">RouterOS v6.xx</option>
            <option value="v7.xx">RouterOS v7.xx</option>
          </select>
        </div>

        {/* <!-- Gateway del ISP --> */}
        <div>
          <label htmlFor="gateway" className="block font-semibold text-gray-300 mb-2 mt-4">
            Gateway to WAN or ISP Game
          </label>
          <input
            id="gateway"
            type="text"
            placeholder="e.g.: 192.168.2.1 or pppoe-out"
            className={`w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 ${!isGatewayValid ? 'border-2 border-red-500' : ''}`}
            value={gateway}
            onChange={handleGatewayChange}
          />
          {!isGatewayValid && <p className="text-red-500 text-sm">Por favor, ingresa una dirección IP válida.</p>}
        </div>

        {/* <!-- Selección de Categoría de Juegos --> */}
        <div>
          <label htmlFor="category" className="block font-semibold text-gray-300 mb-2">
            Selecciona la Categoría
          </label>
          <select
            id="category"
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="mobile">Mobile</option>
            <option value="web">Web</option>
            <option value="desktop">Desktop</option>
          </select>
        </div>

        {/* <!-- Campo de Búsqueda de Juegos --> */}
        <div>
          <label htmlFor="games" className="block font-semibold text-gray-300 mb-2 mt-4">
            Buscar Juegos
          </label>
          <input
            id="games"
            type="text"
            placeholder="Buscar juegos..."
            className="w-full p-2 mb-4 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* <!-- Lista de Juegos Filtrados por Categoría y Búsqueda --> */}
        <div className="h-48 overflow-y-scroll bg-gray-800 p-4 rounded">
          <h3 className="font-semibold text-gray-300 mb-2">
            Juegos ({selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)})
          </h3>
          <div className="space-y-2">
            {filteredGames.map((game) => (
              <div key={game.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={game.id}
                  checked={selectedGames.has(game.id)}
                  onChange={(e) => handleGamesChange(e, game.id)}
                  className="mr-2"
                />
                <label htmlFor={game.id} className="text-gray-300">{game.name}</label>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      </div>
      {/* Columna 2: 3/4 del ancho */}
      <div className="w-3/4 bg-gray-800 p-2 text-white">
      <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
      <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Script Generator Result
                </label>    
        <textarea 
          className="w-full p-2 mt-2 text-black flex-grow bg-gray-800 border border-gray-600 rounded  focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={5} 
          placeholder="Escribe aquí..."
        />
      </div>
     
        
      </div>
    </div>





      {/* <!-- Botones para Generar Script --> */}
      <div className="flex mt-4 space-x-4">
        
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
          onClick={() => {
            const form = {
              version,
              gateway,
              games: Array.from(selectedGames),
            };
            onClickGenerate(form);
          }}
        >
          Generar
        </button>
        <button
          type="button"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Borrar Todo
        </button>
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Copiar Script
        </button>
      </div>
    </form>
  );
};

export default FormularioStaticRoutingGamesManglePort;
