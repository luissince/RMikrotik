import { useEffect, useState } from "react";

type LineInterfacesType = {
  id: number;
  wan: string;
  wanInput: string;
  gateway: string;
  gatewayInput: string;
}

const FormularioPortForwardingWithNat = () => {
  // const [linea, setLinea] = useState<number>(0);
  // const [router, setRouter] = useState<string>('');
  // const [local, setLocal] = useState<string>('');
  // const [interfaceTarget, setInterfaceTarget] = useState<string>('');
  const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>([]);


  // const [result, setResult] = useState<string>('');

  useEffect(() => {
    generateLines(2);
    // setLinea(2);
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
    console.log(lineInterfaces);
    setLineInterfaces(list);
  }

  // const onChangeSelectLine = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   generateLines(Number(event.target.value) ?? 0);
  //   setLinea(Number(event.target.value));
  // }

  // const onChangeSelectRouter = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setRouter(event.target.value);
  // }

  // const onChangeInputInterfaceTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setInterfaceTarget(event.target.value);
  // }

  // const onChangeSelectLocal = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setLocal(event.target.value);
  // }

  // const onChangeInputInterfaceWan = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
  //   const items = lineInterfaces.map((item) => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         wanInput: event.target.value
  //       }
  //     }

  //     return item;
  //   });
  //   setLineInterfaces(items);
  // }

  // const onChangeInputInterfaceGay = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
  //   const items = lineInterfaces.map((item) => {
  //     if (item.id === id) {
  //       return {
  //         ...item,
  //         gatewayInput: event.target.value
  //       }
  //     }

  //     return item;
  //   });
  //   setLineInterfaces(items);
  // }

  // const onClickGenerate = async () => {
  //   const form = {
  //     linea,
  //     router,
  //     local,
  //     interfaceTarget,
  //     interfaces: lineInterfaces
  //   }

  //   console.log(form)

  //   try {
  //     const response = await fetch(`${import.meta.env.BASE_URL_API}/Port-Forwarding-with-NAT`, {
  //       method: "POST", // Método POST
  //       headers: {
  //         "Content-Type": "application/json", // Asegúrate de enviar JSON
  //       },
  //       body: JSON.stringify(form), // Convertir datos a formato JSON
  //     });
  //     const data = await response.json();
  //     setResult(data.message);
  //     console.log(data)
  //   } catch (error) {
  //     console.error("Error al obtener datos:", error);
  //   }

  // }

  return (


    <div
      className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500"
    >

      <div className="overflow-x-auto rounded-t-lg">
        <table className="table-auto w-full border-spacing-2 border-slate-600">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="border-slate-700 p-2 border">Protocolo</th>
              <th className="border-slate-700 p-2 border">IP Remota</th>
              <th className="border-slate-700 p-2 border">Puerto Remoto</th>
              <th className="border-slate-700 p-2 border">IP de Destino</th>
              <th className="border-slate-700 p-2 border">Puerto Destino</th>
              <th className="border-slate-700 p-2 border">Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800">
              <td className="p-2 border border-slate-700">
                <select
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="TCP">TCP</option>
                  <option value="UDP">UDP</option>
                </select>
              </td>
              <td className="border-slate-700 p-2 border">
                <input
                  id="textbox2"
                  type="text"
                  placeholder="0.0.0.0/0"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </td>
              <td className="border-slate-700 p-2 border">
                <input
                  type="number"

                  placeholder="0.0.0.0/0"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </td>
              <td className="border-slate-700 p-2 border">
                <input
                  type="text"
                  placeholder="192.168.50.1"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </td>
              <td className="border-slate-700 p-2 border">
                <input
                  type="number"
                  placeholder="8291"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </td>
              <td className="border-slate-700 p-2 border">
                <input
                  type="text"
                  placeholder="Ej.: winbox"
                  className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default FormularioPortForwardingWithNat;
