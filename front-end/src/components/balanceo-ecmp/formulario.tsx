import React, { useEffect, useState } from "react";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";
interface Props {
  session: Session | null;
  subscription: Subscription | null;
}
type LineInterfacesType = {
    id: number;
    wan: string;
    wanInput: string;
    gateway: string;
    gatewayInput: string;
}

const Formulario = ({ session, subscription }: Props) => {
    const [linea, setLinea] = useState<number>(0);
    const [router, setRouter] = useState<string>('');
    const [local, setLocal] = useState<string>('');
    const [interfaceTarget, setInterfaceTarget] = useState<string>('');
    const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);


    const [result, setResult] = useState<string>('');

 // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);

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
            const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/balanceo-ecmp`, {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/*  */}
            <div className="bg-gray-700 p-4 rounded-lg">
                <form className="space-y-4">

                    <div>
                        <label
                            htmlFor="wan-type"
                            className="block text-sm font-semibold text-gray-300"
                        >Your Line WAN ISP 
                        </label>
                        <select
                            id="wan-type"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            value={linea}
                            onChange={onChangeSelectLine}
                        >
                            <option value="2">2 Lineas WAN</option>
                            <option value="3">3 Lineas WAN</option>
                            <option value="4">4 Lineas WAN</option>
                            <option value="5">5 Lineas WAN</option>
                            <option value="6">6 Lineas WAN</option>
                            <option value="7">7 Lineas WAN</option>
                            <option value="8">8 Lineas WAN</option>
                            <option value="9">9 Lineas WAN</option>
                        </select>
                    </div>

                    <div>
                        <label
                            htmlFor="routeros-version"
                            className="block text-sm font-semibold text-gray-300"
                        >RouterOS Version
                        </label>
                        <select
                            id="routeros-version"
                            className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                            value={router}
                            onChange={onChangeSelectRouter}
                        >
                            <option value="">- Seleccionar -</option>
                            <option value="6.x">RouterOS v6.xx</option>
                            <option value="v7">RouterOS v7.xx</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="wan1"
                                className="block text-sm font-semibold text-gray-300">
                                Local Target
                            </label>
                            <select

                                id="local-target"
                                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                                value={local}
                                onChange={onChangeSelectLocal}
                            >
                                <option value="">- Seleccionar -</option>

                                <option value="local-ip">IP Address List</option>
                                <option value="local-ip1">in_interface</option>
                                <option value="local-ip2">in_interface_List</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="wan1"
                                className="  block text-sm font-semibold text-gray-300"
                            >Interface Target</label>
                            <input
                                id="wan1"
                                type="text"
                                disabled={local === "local-ip"}
                                placeholder={"Indicar Puerto LAN"}
                                className={`${local === "local-ip" ? "disabled:bg-slate-900" : null}  text-sky-400 font-semibold w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                                value={interfaceTarget}
                                onChange={onChangeInputInterfaceTarget}
                            />
                        </div>
                    </div>


                    {
                        lineInterfaces.map((lineInter, index) => {
                            const position = ++index;
                            return (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="wan1"
                                            className="block text-sm font-semibold text-gray-300"
                                        >{lineInter.wan}</label>
                                        <input
                                            id="wan1"
                                            type="text"
                                            placeholder={"Ex:  ether" + (position)}
                                            className="text-sky-400 font-semibold w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            value={lineInter.wanInput}
                                            onChange={(event) => onChangeInputInterfaceWan(event, lineInter.id)}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="gateway1"
                                            className="block text-sm font-semibold  text-gray-300"
                                        >{lineInter.gateway}</label>
                                        <input
                                            id="gateway1"
                                            type="text"
                                            placeholder={"Ex: 192.168." + (position) + ".1"}
                                            className="w-full bg-gray-800 text-amber-600 border font-semibold border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            value={lineInter.gatewayInput}
                                            onChange={(event) => onChangeInputInterfaceGay(event, lineInter.id)}
                                        />
                                    </div>
                                </div>
                            );
                        })
                    }

                </form>
                <div className="mt-4">
                    <p className="text-sm text-gray-400">
                        Cambie el nombre de su interfaz WAN con la condición de su
                        enrutador...
                    </p>
                </div>
            </div>

            {/*  */}
            <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Script Generator Result
                </label>

                <textarea
                    className="flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                    placeholder="Please Login and Subscribe .."
                    value={result} readOnly>

                </textarea>

                <div className="flex mt-4 space-x-4">
                    <button
                        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                        onClick={onClickGenerate}>
                        Generar
                    </button>

                    <button
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
                        Borrar Todo
                    </button>

                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                        Copiar Script
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Formulario;
