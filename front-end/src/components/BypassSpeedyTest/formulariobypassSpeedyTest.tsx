import React, { useEffect, useState } from "react";

type LineInterfacesType = {
    id: number;
    wan: string;
    wanInput: string;
    gateway: string;
    gatewayInput: string;
}

const FormulariobypassSpeedyTest = () => {
    const [linea, setLinea] = useState<number>(0);
    const [router, setRouter] = useState<string>('');
    const [local, setLocal] = useState<string>('');
    const [interfaceTarget, setInterfaceTarget] = useState<string>('');
    const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);


    const [result, setResult] = useState<string>('');

    useEffect(() => {
        generateLines(2);
        setLinea(2);
    }, []);

    const generateLines = (numbers: number) => {
        const list: LineInterfacesType[] = Array.from({ length: numbers }).map((_, i) => {
            const index = i += 1;
            const line: LineInterfacesType = {
                "id": index,
                "wan": "wan isp" + (index),
                "wanInput": "",
                "gateway": "Gateway ISP-" + (index),
                "gatewayInput": ""
            }
            return line;
        });
        setLineInterfaces(list);
    }

    const onChangeSelectLine = (event: React.ChangeEvent<HTMLSelectElement>) => {
        generateLines(Number(event.target.value) ?? 0);
        setLinea(Number(event.target.value));
    }

    const onChangeSelectRouter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRouter(event.target.value);
    }

    const onChangeInputInterfaceTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterfaceTarget(event.target.value);
    }

    const onChangeSelectLocal = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLocal(event.target.value);
    }

    const onChangeInputInterfaceWan = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const items = lineInterfaces.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    wanInput: event.target.value
                }
            }

            return item;
        });
        setLineInterfaces(items);
    }

    const onChangeInputInterfaceGay = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const items = lineInterfaces.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    gatewayInput: event.target.value
                }
            }

            return item;
        });
        setLineInterfaces(items);
    }

    const onClickGenerate = async () => {
        const form = {
            linea,
            router,
            local,
            interfaceTarget,
            interfaces: lineInterfaces
        }

        console.log(form)

        try {
            const response = await fetch("http://localhost:8080/balanceo-nth", {
                method: "POST", // Método POST
                headers: {
                    "Content-Type": "application/json", // Asegúrate de enviar JSON
                },
                body: JSON.stringify(form), // Convertir datos a formato JSON
            });
            const data = await response.json();
            setResult(data.message);
            console.log(data)
        } catch (error) {
            console.error("Error al obtener datos:", error);
        }

    }

    return (
        <div>

            {/*  */}

            <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Columna Izquierda */}
                    <div className="space-y-6">
                        <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500">
                            {/* Sección Inputs */}
                            <div className="text-gray-950 shadow-2xl rounded-lg p-2 w-full ring-2 ring-slate-600 mt-4">
                                <label htmlFor="uptimeLimit" className="block font-semibold text-gray-900 mb-2 mt-2 bg-teal-500 rounded-t-lg pl-4">
                                    Ingrese Datos del Cliente
                                </label>
                                <div>
                                    <label htmlFor="qtyUser" className="block font-semibold text-gray-300 mb-2 mt-4">
                                        Nombre del Cliente
                                    </label>
                                    <input id="qtyUser" type="text" placeholder="Alexander"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-4  focus:ring-teal-500" />
                                </div>
                                <div>
                                    <label htmlFor="profileHotspot" className="block font-semibold text-gray-300 mb-2 mt-4">
                                        IP del Cliente
                                    </label>
                                    <input id="profileHotspot" type="text" placeholder="192.168.1.5"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500" />
                                </div>

                            </div>

                            <div className="text-gray-950 shadow-2xl rounded-lg p-2 w-full ring-2 ring-slate-600 mt-4">
                                <label htmlFor="uptimeLimit" className="block font-semibold text-gray-100 mb-2 mt-2 bg-blue-600 rounded-t-lg pl-2">
                                    Ingrese Velocidad Real del Cliente
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label htmlFor="uptimeLimit" className="block font-semibold text-gray-300 mb-2 pl-2">
                                            Velocidad Real - Descarga (Mbps)
                                        </label>
                                        <input id="uptimeLimit" type="text" placeholder="5m"
                                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>

                                        <label htmlFor="rateLimit" className="block font-semibold text-gray-300 mb-2 pl-2">
                                            Velocidad Real - Subida (Mbps)
                                        </label>
                                        <input id="rateLimit" type="text" placeholder="2m"
                                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>

                            
                            <div className="text-gray-950 shadow-2xl rounded-lg p-2 w-full ring-2 ring-slate-600 mt-4">
                                <label htmlFor="uptimeLimit" className="block font-semibold text-gray-100 mb-2 mt-2 bg-indigo-600 rounded-t-lg pl-2">
                                    Ingrese Velocidad Ficticia del Cliente
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label htmlFor="uptimeLimit" className="block font-semibold text-gray-300 mb-2 pl-2">
                                            Velocidad Ficticia - Descarga (Mbps)
                                        </label>
                                        <input id="uptimeLimit" type="text" placeholder="20m"
                                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                                    </div>
                                    <div>

                                        <label htmlFor="rateLimit" className="block font-semibold text-gray-300 mb-2 pl-2">
                                            Velocidad Ficticia - Subida (Mbps)
                                        </label>
                                        <input id="rateLimit" type="text" placeholder="10m"
                                            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                                    </div>
                                </div>
                            </div>

                  

                            <div>
                       

                            </div>




                        </div>

                        {/* Botones */}
                        <div className="w-auto flex flex-wrap justify-center gap-2 mb-2 mt-2">
                            <button type="reset"
                                className="w-1/2 text-white px-2 py-2 rounded-md transition ease-in-out delay-150 bg-gray-600 hover:-translate-y-1 hover:scale-110 hover:bg-slate-700 duration-300">
                                Limpiar
                            </button>
                            <button type="submit"
                                className="w-auto text-white px-2 py-2 rounded-md transition ease-in-out delay-150 bg-orange-500 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300">
                                Generar Script
                            </button>
                       
                        </div>
                    </div>

                    {/* Columna Derecha */}
                    <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
                        <label className="block text-sm font-semibold mb-2 text-gray-300">
                            Script Generator Result
                        </label>
                        <textarea
                            className="flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            placeholder="Please Login and Subscribe .."
                            readOnly
                        ></textarea>
                        <div className="flex mt-4 space-x-4"></div>
                        <button type="button"
                            className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-emerald-600 hover:-translate-y-1 hover:scale-110 hover:bg-teal-600 duration-300">
                            Copiar Scritpa
                        </button>
                    </div>
                </form>
            </div>



            {/*  */}

        </div>
    );
}

export default FormulariobypassSpeedyTest;