import React, { useEffect, useState } from "react";

type LineInterfacesType = {
  id: number;
  wan: string;
  wanInput: string;
  gateway: string;
  gatewayInput: string;
  addressList: string;
};

type FormError = {
  router?: string;
  interfaceTarget?: string;
  lineInterfaces?: {
    [key: number]: {
      wanInput?: string;
      gatewayInput?: string;
    };
  };
};

const FormularioBalanceoPbr = () => {
  const [linea, setLinea] = useState<number>(2);
  const [router, setRouter] = useState<string>("");
  const [local, setLocal] = useState<string>(""); // Ahora se puede modificar
  const [interfaceTarget, setInterfaceTarget] = useState<string>("");
  const [groupName1, setGroupName1] = useState<string>("");
  const [groupName2, setGroupName2] = useState<string>("");
  const [lineInterfaces, setLineInterfaces] = useState<LineInterfacesType[]>(
    []
  );
  const [result, setResult] = useState<string>("");
  const [errors, setErrors] = useState<FormError>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    generateLines(2);
  }, []);

  const generateLines = (numbers: number) => {
    const list: LineInterfacesType[] = Array.from({ length: numbers }).map(
      (_, i) => {
        const index = i + 1; // Corregido: no modifica i
        return {
          id: index,
          wan: "wan isp" + index,
          wanInput: "",
          gateway: "Gateway ISP-" + index,
          gatewayInput: "",
          addressList: "",
        };
      }
    );
    setLineInterfaces(list);
  };

  const onChangeSelectLine = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value) || 2;
    generateLines(value);
    setLinea(value);
  };

  const onChangeSelectRouter = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRouter(event.target.value);
    if (errors.router) {
      const { router, ...rest } = errors;
      setErrors(rest);
    }
  };

  const onChangeInputInterfaceTarget = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInterfaceTarget(event.target.value);
    if (errors.interfaceTarget) {
      const { interfaceTarget, ...rest } = errors;
      setErrors(rest);
    }
  };

  const onChangeSelectLocal = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocal(event.target.value);
  };

  const onChangeGroupName1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName1(event.target.value);
  };

  const onChangeGroupName2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName2(event.target.value);
  };

  const onChangeInputInterfaceWan = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const items = lineInterfaces.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          wanInput: event.target.value,
        };
      }
      return item;
    });
    setLineInterfaces(items);

    // Limpiar errores para este campo
    if (errors.lineInterfaces && errors.lineInterfaces[id]?.wanInput) {
      const newErrors = { ...errors };
      if (newErrors.lineInterfaces && newErrors.lineInterfaces[id]) {
        delete newErrors.lineInterfaces[id].wanInput;
      }
      setErrors(newErrors);
    }
  };

  const onChangeInputInterfaceGateway = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const items = lineInterfaces.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          gatewayInput: event.target.value,
        };
      }
      return item;
    });
    setLineInterfaces(items);

    if (errors.lineInterfaces && errors.lineInterfaces[id]?.gatewayInput) {
      const newErrors = { ...errors };
      if (newErrors.lineInterfaces && newErrors.lineInterfaces[id]) {
        delete newErrors.lineInterfaces[id].gatewayInput;
      }
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormError = {};

    // Validar RouterOS version
    if (!router) {
      newErrors.router = "RouterOS Version es requerido";
    }

    // Validar interfaces de línea
    const interfaceErrors: {
      [key: number]: { wanInput?: string; gatewayInput?: string };
    } = {};

    lineInterfaces.forEach((line) => {
      if (!line.wanInput) {
        if (!interfaceErrors[line.id]) interfaceErrors[line.id] = {};
        interfaceErrors[line.id].wanInput = "Interfaz WAN es requerida";
      }

      if (!line.gatewayInput) {
        if (!interfaceErrors[line.id]) interfaceErrors[line.id] = {};
        interfaceErrors[line.id].gatewayInput = "Gateway es requerido";
      } else if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(line.gatewayInput)) {
        if (!interfaceErrors[line.id]) interfaceErrors[line.id] = {};
        interfaceErrors[line.id].gatewayInput = "Formato de IP inválido";
      }
    });

    if (Object.keys(interfaceErrors).length > 0) {
      newErrors.lineInterfaces = interfaceErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onClickGenerate = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const form = {
      linea,
      router,
      local,
      interfaceTarget,
      groupName1,
      groupName2,
      lineInterfaces: lineInterfaces.map(({ id, wanInput, gatewayInput }) => ({
        id,
        wanInput,
        gatewayInput,
      })),
    };

    try {
      const response = await fetch(
        `${import.meta.env.PUBLIC_BASE_URL_API}/balanceo-carga`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status}`);
      }

      const data = await response.json();
      setResult(data.message);
    } catch (error) {
      console.error("Error al enviar datos:", error);
      setResult("Error generando script. Inténtelo de nuevo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onClickReset = () => {
    setRouter("");
    setLocal("");
    setInterfaceTarget("");
    setGroupName1("");
    setGroupName2("");
    setResult("");
    generateLines(linea);
    setErrors({});
  };

  const onClickCopyScript = () => {
    if (result) {
      navigator.clipboard
        .writeText(result)
        .then(() => alert("Script copiado al portapapeles!"))
        .catch((err) => console.error("Error al copiar: ", err));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-700 p-4 rounded-lg">
        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="wan-type"
              className="block text-sm font-semibold text-gray-300"
            >
              Your Line WAN ISP
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

          <div className="space-y-2">
            <label
              htmlFor="routeros-version"
              className="block text-sm font-semibold text-gray-300"
            >
              RouterOS Version
            </label>
            <select
              id="routeros-version"
              className={`w-full bg-gray-800 border ${errors.router ? "border-red-500" : "border-gray-600"} rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400`}
              value={router}
              onChange={onChangeSelectRouter}
            >
              <option value="">- Seleccionar -</option>
              <option value="6.x">RouterOS v6.xx</option>
              <option value="v7">RouterOS v7.xx</option>
            </select>
            {errors.router && (
              <p className="mt-1 text-sm text-red-500">{errors.router}</p>
            )}
          </div>

          <div className="text-gray-950 shadow-2xl rounded-lg p-2 w-full ring-2 ring-slate-600 mt-4">
            <label
              htmlFor="gateway"
              className="block font-semibold text-gray-800 mb-2 mt-4 bg-orange-500 rounded-t-lg pl-2"
            >
              Crear Grupos de Clientes
            </label>

            <div className="grid grid-cols-2 gap-4 items-center mb-2 pr-2">
              <div className="space-y-2">
                <label
                  htmlFor="group1"
                  className="w-full border-gray-600 rounded p-1 focus:outline-none focus:ring-2 text-gray-300"
                >
                  Ingrese Nombre del Grupo 1
                </label>
              </div>
              <div>
                <input
                  id="group1"
                  type="text"
                  placeholder={"Grupo 1 - Clientes"}
                  className="text-sky-400 font-semibold w-full m-1 bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={groupName1}
                  onChange={onChangeGroupName1}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center mb-2 pr-2">
              <label
                htmlFor="group2"
                className="w-full border-gray-600 rounded p-1 focus:outline-none focus:ring-2 text-gray-300"
              >
                Ingrese Nombre del Grupo 2
              </label>
              <div>
                <input
                  id="group2"
                  type="text"
                  placeholder={"Grupo 2 - Clientes"}
                  className="text-sky-400 font-semibold w-full bg-gray-800 border border-gray-600 rounded p-2 m-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={groupName2}
                  onChange={onChangeGroupName2}
                />
              </div>
            </div>
          </div>

          {lineInterfaces.map((lineInter, index) => (
            <div
              key={lineInter.id}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <div className="space-y-2">
                <label
                  htmlFor={`wan-${lineInter.id}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {lineInter.wan}
                </label>
                <input
                  id={`wan-${lineInter.id}`}
                  type="text"
                  placeholder={`Ex: ether${lineInter.id}`}
                  className={`text-sky-400 font-semibold w-full bg-gray-800 border ${
                    errors.lineInterfaces &&
                    errors.lineInterfaces[lineInter.id]?.wanInput
                      ? "border-red-500"
                      : "border-gray-600"
                  } rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  value={lineInter.wanInput}
                  onChange={(event) =>
                    onChangeInputInterfaceWan(event, lineInter.id)
                  }
                />
                {errors.lineInterfaces &&
                  errors.lineInterfaces[lineInter.id]?.wanInput && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lineInterfaces[lineInter.id]?.wanInput}
                    </p>
                  )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`gateway-${lineInter.id}`}
                  className="block text-sm font-semibold text-gray-300"
                >
                  {lineInter.gateway}
                </label>
                <input
                  id={`gateway-${lineInter.id}`}
                  type="text"
                  placeholder={`Ex: 192.168.${lineInter.id}.1`}
                  className={`w-full bg-gray-800 text-amber-600 border font-semibold ${
                    errors.lineInterfaces &&
                    errors.lineInterfaces[lineInter.id]?.gatewayInput
                      ? "border-red-500"
                      : "border-gray-600"
                  } rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  value={lineInter.gatewayInput}
                  onChange={(event) =>
                    onChangeInputInterfaceGateway(event, lineInter.id)
                  }
                />
                {errors.lineInterfaces &&
                  errors.lineInterfaces[lineInter.id]?.gatewayInput && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lineInterfaces[lineInter.id]?.gatewayInput}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-400">
            Cambie el nombre de su interfaz WAN con la condición de su
            enrutador...
          </p>
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg flex flex-col">
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Script Generator Result
        </label>

        <textarea
          className="flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
          placeholder="Please Login and Subscribe .."
          value={result}
          readOnly
        ></textarea>

        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
            onClick={onClickGenerate}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Generando..." : "Generar"}
          </button>

          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={onClickReset}
          >
            Borrar Todo
          </button>

          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:bg-green-300 disabled:cursor-not-allowed"
            onClick={onClickCopyScript}
            disabled={!result}
          >
            Copiar Script
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormularioBalanceoPbr;
