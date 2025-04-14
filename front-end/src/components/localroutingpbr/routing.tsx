import React, { useEffect, useState } from "react";
import SelectCustom from "../SelectCustom";
import InputCustom from "../ImputCustom";

type LineInterfacesType = {
    wan: string;
    wanInput: string;
    target: string;
    targetInput: string;
    routingmark: string;
    routingmarkInput: string;

}

const routingPlaceholder = ["To-ISP-Linea1", "To-ISP-Linea2", "To-ISP-Linea3", "To-ISP-Linea4", "To-ISP-Linea5"];


const Formulario = () => {

    const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);

    useEffect(() => {
        generateLines(2);
    }, []);

    const generateLines = (numbers: number) => {
        const list: LineInterfacesType[] = Array.from({ length: numbers }).map((_, i) => {
            const dnsPh = routingPlaceholder[i];
            const index = i += 1;
            const line: LineInterfacesType = {
                "wan": "wan isp" + (index),
                "wanInput": "",
                "target": "",
                "targetInput": "",
                "routingmark": "",
                "routingmarkInput": dnsPh

            }
            return line;
        });
        setLineInterfaces(list);
    }

    const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        generateLines(Number(event.target.value) ?? 0);
    }


    return (

        <form className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-5">
                {/*  */}
                <SelectCustom
                    id={"Routing Opciones"}
                    title={"wan-type"} >
                    <option value="2">Route Mangle</option>
                    <option value="3">Route Routes</option>
                </SelectCustom>

                {/*  */}
                <SelectCustom
                    id={"IP Opciones"}
                    title={"wan-type"}
                    onChange={onChangeSelect}>
                    <option value="2">2 Lineas WAN</option>
                    <option value="3">3 Lineas WAN</option>
                    <option value="4">4 Lineas WAN</option>
                    <option value="5">5 Lineas WAN</option>
                </SelectCustom>

                {/*  */}
                <SelectCustom
                    id={"Versión de Router Mikrotik"}
                    title={"wan-type"} >
                    <option value="2">RouterOS v6.xx</option>
                    <option value="3">RouterOS v7.xx</option>
                </SelectCustom>
            </div>

            {
                lineInterfaces.map((line, index) => {
                    const position = ++index;
                    return (
                        <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                            <InputCustom
                                id={"wan1"}
                                title={"ISP Gateway"}
                                placeholder={position.toString()}
                            />

                            <InputCustom
                                id={"target"}
                                title={"Target Client IP"}
                                placeholder={position.toString()}
                            />

                            <InputCustom
                                id={"routingmarkInput"}
                                title={"Routing Mark"}
                                placeholder={line.routingmarkInput}
                            />

                         
                         
                        </div>

                    );
                })
            }
        </form>

    );
}

export default Formulario;
