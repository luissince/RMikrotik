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

const FormularioVPNremoteSstpL2tpPptpOvpn = () => {
    // const [version, setVersion] = useState<string>("");
    // const [gateway, setGateway] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para la búsqueda de juegos
    const [selectedCategory, setSelectedCategory] = useState<Category>("mobile"); // Estado para la categoría seleccionada
    const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set()); // Estado para los juegos seleccionados
    // const [isGatewayValid, setIsGatewayValid] = useState<boolean>(true); // Estado para la validez del gateway
    // const [result, setResult] = useState<string>(""); // Estado para almacenar el resultado de la API

    // Expresión regular para validar una dirección IP
    // const isValidIP = (ip: string): boolean => {
    //     const regex =
    //         /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    //     return regex.test(ip);
    // };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value as Category);
        setSearchQuery(""); // Limpiar la búsqueda al cambiar de categoría
    };

    // const handleGatewayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     // setGateway(value);

    //     // Validar si el valor ingresado es una dirección IP válida
    //     if (isValidIP(value) || value === "") {
    //         setIsGatewayValid(true); // Es válida
    //     } else {
    //         setIsGatewayValid(false); // No válida
    //     }
    // };

    const handleGamesChange = (_: React.ChangeEvent<HTMLInputElement>, game: string) => {
        const updatedSelectedGames = new Set(selectedGames);
        if (updatedSelectedGames.has(game)) {
            updatedSelectedGames.delete(game);
        } else {
            updatedSelectedGames.add(game);
        }
        setSelectedGames(updatedSelectedGames);
    };

    // // Función para enviar los datos a la API
    // const onClickGenerate = async (form: { version: string, gateway: string, games: string[] }) => {
    //     console.log("Enviando datos a la API...", form);

    //     try {
    //         const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/balanceo-carga`, {
    //             method: "POST", // Método POST
    //             headers: {
    //                 "Content-Type": "application/json", // Asegúrate de enviar JSON
    //             },
    //             body: JSON.stringify(form), // Convertir datos a formato JSON
    //         });
    //         const data = await response.json();
    //         // setResult(data.message);
    //         console.log(data);
    //     } catch (error) {
    //         console.error("Error al obtener datos:", error);
    //     }
    // };

    // Filtrar los juegos en función de la búsqueda
    const filteredGames = gamesData[selectedCategory].filter((game) =>
        game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <form onSubmit={(e) => { e.preventDefault(); }}>
            {/* <!-- Selección de Versión de RouterOS --> */}




            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500">

                    <div>
                        <label
                            htmlFor="routeros"
                            className="block font-semibold text-gray-300 mb-2"
                        >VPN Conexión</label>
                        <select
                            id="routeros"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="v6.xx"
                            >PPTP - Point to Point Tunneling Protocol</option>
                            <option value="v7.xx">RouterOS v7.xx</option>
                        </select>
                    </div>


                    <div>
                        <label
                            htmlFor="gateway"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >VPN Nombre o Interface
                        </label>
                        <input
                            id="gateway"
                            type="text"
                            placeholder="VPN-Juegos"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>


                    <div>
                        <label
                            htmlFor="gateway"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >VPN IP Address</label>
                        <input
                            id="gateway"
                            type="text"
                            placeholder="Ej.: 180.128.63.89"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="gateway"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >VPN Usuario</label>
                        <input
                            id="gateway"
                            type="text"
                            placeholder="usuarioVPN"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="gateway"
                            className="block font-semibold text-gray-300 mb-2 mt-4"
                        >VPN Contraseña</label>
                        <input
                            id="gateway"
                            type="text"
                            placeholder="VPNContraseña or pppoe-out"
                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>

                        <input
                            type="checkbox"
                            id="game1"
                            className="mr-2 mt-4"
                        /><label htmlFor="game1" className="text-white"
                        >IP Gateway ISP Juegos (Opcional)</label><input
                            id="gateway"
                            type="text"
                            placeholder="Ej. 192.168.10.1"
                            className="mt-2 w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                            {/* <!-- Selección de Categoría de Juegos --> */}
        <div>
          <label htmlFor="category" className="block font-semibold text-gray-300 mb-2">
            Selecciona la Categoría
          </label>
          <select
            id="category"
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
          Seleccione los Juegos (Mangle)
          </label>
          <input
            id="games"
            type="text"
            placeholder="Buscar juegos..."
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
                  
               

        {/* <!-- Lista de Juegos Filtrados por Categoría y Búsqueda --> */}
        <div className="h-48 overflow-y-scroll bg-gray-800 p-4 rounded">
          <h3 className="font-semibold text-gray-300 mb-2">
            Juegos ({selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)})
          </h3>
          <div className="h-48  bg-gray-700 p-4 rounded mt-4 space-y-2">
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


             
                
            <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
                <label
                    className="block text-sm font-semibold mb-2 text-gray-300"
                >Script Generator Result</label >
                <textarea
                    className="flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                    placeholder="Please Login and Subscribe .."
                    readOnly></textarea>
                <div className="flex mt-4 space-x-4">
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                    >Generar</button>
                    <button
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >Borrar Todo</button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >Copiar Script</button>
                </div>
            </div>
            </div>








        </form>
    );
};

export default FormularioVPNremoteSstpL2tpPptpOvpn;
