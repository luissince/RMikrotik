import React, { useEffect, useState } from "react";

type LineInterfacesType = {
    wan: string;
    wanInput: string;
    gateway: string;
    gatewayInput: string;
    distancia: string;
    distanciaInput: string;
    dns: string;
    dnsPlaceholder: string;
    dnsInput: string;
}

const dnsPlaceholder = ["8.8.8.8", "8.8.4.4" , "8.8.8.1", "8.8.8.2", "8.8.8.3", "8.8.8..4", "8.8.8.6"];

const Formulario = () => {

    const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);

    useEffect(() => {
        generateLines(2);
    }, []);

    const generateLines = (numbers: number) => {
        const list: LineInterfacesType[] = Array.from({ length: numbers }).map((_, i) => {
            const dnsPh = dnsPlaceholder[i];
            const index = i += 1;
            const line: LineInterfacesType = {
                "wan": "wan isp" + (index),
                "wanInput": "",
                "gateway": "Gateway ISP-" + (index),
                "gatewayInput": "",
                "distancia": "distancia",
                "distanciaInput": index.toString(),
                "dns": "dns",
                "dnsPlaceholder": dnsPh,
                "dnsInput": ""
            }
            return line;
        });
        setLineInterfaces(list);
    }

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        generateLines(Number(event.target.value) ?? 0);
    }

    return (
        <form className="grid grid-cols-1 lg:grid-cols-2 gap-6">


            <div>
                <label className="block mb-1 text-gray-400"
                >Seleccione el método de conmutación</label>
                <select
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    <option>Failover - Check Gateway</option>
                    <option>Failover - Recursive Gateway</option>
                </select>

                {
                    lineInterfaces.map((_, index) => {
                        const position = ++index;
                        return (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div>
                                    <label
                                        htmlFor="wan1"
                                        className="block text-sm font-semibold text-gray-300"
                                    >WAN ISP-{position}</label>
                                    <input
                                        id="wan1"
                                        type="text"
                                        placeholder={"Ej: ether"+position}
                                        className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="gateway1"
                                        className="block text-sm font-semibold text-gray-300"
                                    >Gateway ISP-{position}</label>
                                    <input
                                        id="gateway1"
                                        type="text"
                                        placeholder={"Ej: 192.168."+position+".1"}
                                        className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>


            <div>
                <label className="block mb-1 text-gray-400"
                >Seleccione el número de su línea ISP</label>
                <select
                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={onChangeSelect}
                >
                    <option value={2}>2 Lineas ISP</option>
                    <option value={3}>3 Lineas ISP</option>
                    <option value={4}>4 Lineas ISP</option>
                    <option value={5}>5 Lineas ISP</option>
                    <option value={6}>6 Lineas ISP</option>
                    <option value={7}>7 Lineas ISP</option>
                </select>

                {
                    lineInterfaces.map((line, index) => {
                        const position = ++index;
                        return (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                <div>
                                    <label
                                        htmlFor="wan1"
                                        className="block text-sm font-semibold text-gray-300"
                                    >Distancia</label>

                                    <input
                                        id="wan1"
                                        type="text"
                                        placeholder={position.toString()}
                                        className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="gateway1"
                                        className="block text-sm font-semibold text-gray-300"
                                    >DNS Publico</label>
                                    <input
                                        id="gateway1"
                                        type="text"
                                        placeholder={line.dnsPlaceholder}
                                        className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>



        </form>
    );
}

export default Formulario;