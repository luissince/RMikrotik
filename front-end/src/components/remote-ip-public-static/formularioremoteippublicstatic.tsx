
// Definimos los tipos para los juegos y las categorías
// interface Game {
//   id: string;
//   name: string;
// }

// type Category = "mobile" | "web" | "desktop";

// interface GamesData {
//   mobile: Game[];
//   web: Game[];
//   desktop: Game[];
// }

// // Juegos por categorías
// const gamesData: GamesData = {
//   mobile: [
//     { id: "game1", name: "Arena Of Valor (AOV) - Mobile" },
//     { id: "game2", name: "Among Us - Mobile" },
//     { id: "game3", name: "Call of Duty (COD) - Mobile" },
//     { id: "game4", name: "PUBG Mobile" },
//     { id: "game5", name: "Minecraft - Mobile" }
//   ],
//   web: [
//     { id: "game6", name: "League of Legends - Web" },
//     { id: "game7", name: "Agar.io - Web" },
//     { id: "game8", name: "Slither.io - Web" }
//   ],
//   desktop: [
//     { id: "game9", name: "Fortnite - PC" },
//     { id: "game10", name: "Minecraft - PC" },
//     { id: "game11", name: "Counter-Strike: Global Offensive (CS:GO) - PC" }
//   ]
// };

const Formularioremoteippublicstatic = () => {
  // const [version, setVersion] = useState<string>("");
  // const [gateway, setGateway] = useState<string>("");
  // const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para la búsqueda de juegos
  // const [selectedCategory, setSelectedCategory] = useState<Category>("mobile"); // Estado para la categoría seleccionada
  // const [selectedGames, setSelectedGames] = useState<Set<string>>(new Set()); // Estado para los juegos seleccionados
  // const [isGatewayValid, setIsGatewayValid] = useState<boolean>(true); // Estado para la validez del gateway
  // const [result, setResult] = useState<string>(""); // Estado para almacenar el resultado de la API

  // // Expresión regular para validar una dirección IP
  // const isValidIP = (ip: string): boolean => {
  //   const regex =
  //     /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  //   return regex.test(ip);
  // };

  // const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCategory(event.target.value as Category);
  //   setSearchQuery(""); // Limpiar la búsqueda al cambiar de categoría
  // };

  // const handleGatewayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setGateway(value);

  //   // Validar si el valor ingresado es una dirección IP válida
  //   if (isValidIP(value) || value === "") {
  //     setIsGatewayValid(true); // Es válida
  //   } else {
  //     setIsGatewayValid(false); // No válida
  //   }
  // };

  // const handleGamesChange = (event: React.ChangeEvent<HTMLInputElement>, game: string) => {
  //   const updatedSelectedGames = new Set(selectedGames);
  //   if (updatedSelectedGames.has(game)) {
  //     updatedSelectedGames.delete(game);
  //   } else {
  //     updatedSelectedGames.add(game);
  //   }
  //   setSelectedGames(updatedSelectedGames);
  // };

  // // Función para enviar los datos a la API
  // const onClickGenerate = async (form: { version: string, gateway: string, games: string[] }) => {
  //   console.log("Enviando datos a la API...", form);

  //   try {
  //     const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/balanceo-carga`, {
  //       method: "POST", // Método POST
  //       headers: {
  //         "Content-Type": "application/json", // Asegúrate de enviar JSON
  //       },
  //       body: JSON.stringify(form), // Convertir datos a formato JSON
  //     });
  //     const data = await response.json();
  //     setResult(data.message); // Suponiendo que la respuesta contiene un campo "message"
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error al obtener datos:", error);
  //   }
  // };

  // // Filtrar los juegos en función de la búsqueda
  // const filteredGames = gamesData[selectedCategory].filter((game) =>
  //   game.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <form onSubmit={(e) => { e.preventDefault(); }}>
      {/* <!-- Selección de Versión de RouterOS --> */}
     

  
          <div
            className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500"
          >

            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
             
              <div>
                <label className="block font-semibold text-orange-400 mb-2"
                  >Interface ISP - WAN </label>
                <input
                  id="textbox1"
                  type="text"
                  placeholder="ether1"
                  className="w-full bg-gray-700 text-gray-300 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-orange-400 mb-2"
                  >IP Gateway ISP</label>
                <input
                  id="textbox2"
                  type="text"
                  placeholder="192.168.1.1"
                  className="w-full bg-gray-700 text-gray-300 rounded-lg p-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-orange-400 mb-2"
                  >Router Versión</label>
                <select
                  id="wan-type"
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                >
                  <option value="2">RouterOS v6.xx</option>
                  <option value="3">RouterOS v7.xx</option>
                </select>
              </div>
           
            </form>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-6 mt-7">
            <button
              className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-gray-600 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 duration-300"
            >
              Borrar Todo
            </button>
            <button
              className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300"
            >
              Generar Script
            </button>

            <button
              className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-green-500 hover:-translate-y-1 hover:scale-110 hover:bg-teal-600 duration-300"
            >
              Copiar Todo
            </button>
          </div>



    </form>
  );
};

export default Formularioremoteippublicstatic;
