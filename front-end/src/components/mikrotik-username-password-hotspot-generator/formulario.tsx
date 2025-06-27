import React, { useState } from "react";
import { useApiCall, useAuthValidation, useScriptOperations } from "../forms/BaseForm";
import type { Session } from "@auth/core/types";
import type { Subscription } from "../../types/subscription/subscription";
import { alertKit } from "alert-kit";

interface Props {
  session: Session | null;
  subscription: Subscription | null;
}

interface FormData {
  qtyUserHotspot: number;
  profileHotspot: string;
  rateLimit: string;
  limitUptime: string;
  limitQuota: string;
  typeUsername: string;
  typePassword: string;
}

const FormulariomikrotikUsernamePasswordHotspotGenerator = ({ session, subscription }: Props) => {
  const [formData, setFormData] = useState<FormData>({
    qtyUserHotspot: 10,
    profileHotspot: "default",
    rateLimit: "1M/2M",
    limitUptime: "0h",
    limitQuota: "0G",
    typeUsername: "user-",
    typePassword: "01",
  });

  // Usar hooks personalizados
  const { validateAuth } = useAuthValidation(session, subscription);
  const { makeApiCall, isLoading } = useApiCall(session);
  const { scriptResult, setScriptResult, handleCopyScript } = useScriptOperations(session, subscription);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!validateAuth()) return;

    const result = await makeApiCall("/mikrotik-username-password-hotspot-generator", formData);
    if (result) {
      setScriptResult(result);
    }
  };

  const handleClear = () => {
    if (!validateAuth()) return;

    setScriptResult(null);
  };

  const handleDownload = async () => {
    if (!validateAuth()) return;

    try {

      alertKit.loading({ message: 'Generando...' });

      // Opciones de la solicitud fetch
      const options = {
        method: 'POST', // Especifica el método POST
        headers: {
          'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
          // Puedes agregar otros encabezados aquí, como autorización, si es necesario
        },
        body: JSON.stringify({
          content: scriptResult?.pdf,
          css: "\n@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');\n\n/* @page {\n    margin: 0;\n    padding: 0;\n} */\n\n* {\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nhtml {\n    -webkit-text-size-adjust: 100%;\n    font-size: 100%;\n}\n\nbody {\n    font-family: \"Roboto\", serif;\n    font-weight: normal;\n    background-color: white;\n    color: #000;\n    padding: 0mm;\n}\n\nh1 {\n    color: #2c3e50;\n    font-size: 22pt;\n    padding: 5mm 0mm;\n    border-bottom: 0.5mm solid #eee;\n    font-weight: bold;\n}\n\nh2 {\n    color: #34495e;\n    font-size: 18pt;\n     padding: 3mm 0mm;\n    font-weight: bold;\n}\n\nh3 {\n    color: #445566;\n    font-size: 14pt;\n    padding: 3mm 0mm;\n    font-weight: bold;\n}\n\nh4 {\n    color: #445566;\n    font-size: 10pt;\n    padding: 3mm 0mm;\n    font-weight: bold;\n}\n\np {\n    padding: 3mm 0mm;\n    color: #333;\n    font-size: 10pt;\n    font-weight: normal;\n}\n\nul, ol {\n    padding: 3mm 0mm;\n    padding-left: 10mm;\n}\n\nli {\n    padding: 2mm 0mm;\n}\n\ncode {\n    background-color: #f7f9fa;\n    padding: 1mm 2mm;\n    border-radius: 1mm;\n    font-family: monospace;\n}\n\npre {\n    background-color: #f7f9fa;\n    padding: 5mm;\n    border-radius: 2mm;\n    overflow-x: auto;\n    font-size: 10pt;\n}\n\nblockquote {\n    border-left: 1mm solid #ccc;\n    margin: 5mm 0;\n    padding-left: 5mm;\n    font-style: italic;\n    color: #666;\n}\n\ntable {\n    border-collapse: collapse;\n    width: 100%;\n    margin-bottom: 5mm;\n}\n\nth, td {\n    border: 0.5mm solid #ddd;\n    padding: 2mm 0mm;\n    text-align: left;\n    font-size: 10pt;\n}\n\nth {\n    background-color: #f5f5f5;\n}\n\nstrong, b {\n    font-weight: bold;\n}\n\nem, i {\n    font-style: italic;\n}\n\na {\n    color: #2980b9;\n    text-decoration: underline;\n    word-break: break-word;\n}\n\nimg {\n    max-width: 100%;\n    height: auto;\n    display: block;\n    margin: 5mm auto;\n}\n\n.product {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    margin-bottom: 10mm;\n    border: 0.5mm solid #ccc;\n    padding: 5mm;\n    border-radius: 2mm;\n}\n\n.product img {\n    width: 50mm;\n    height: 50mm;\n    object-fit: cover;\n    border-radius: 2mm;\n}",
          height: "297",
          margin: { top: 10, right: 10, bottom: 10, left: 10 },
          size: "A4",
          title: "document",
          url: scriptResult?.pdf,
          width: "210"
        }), // Convierte los datos a una cadena JSON
        next: { revalidate: 0 }
      };

      // Realizar la solicitud HTTP
      const response = await fetch(`https://mdhtmltopdf-fastapi.xanderls.dev/html/pdf`, options);

      // Verificar si la respuesta es correcta
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Obtiene la respuesta en formato blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // retorna la URL del PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `document.pdf`;
      document.body.appendChild(link);
      link.click();

      // Limpia el objeto URL después de la descarga
      window.URL.revokeObjectURL(url);
      link.remove();
      alertKit.close();
    } catch (error) {
      alertKit.error({
        title: 'Error',
        message: (error as Error).message,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 bg-gray-900 text-white">
      {/* Panel izquierdo - Formulario */}
      <div className="w-full lg:w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Qty User Hotspot
            </label>
            <input
              id="qtyUserHotspot"
              type="text"
              value={formData.qtyUserHotspot}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Profile Hotspot
            </label>
            <input
              id="profileHotspot"
              type="text"
              value={formData.profileHotspot}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Rate Limit [up/down]
            </label>
            <input
              id="rateLimit"
              type="text"
              value={formData.rateLimit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Limit Uptime [duration]
            </label>
            <input
              id="limitUptime"
              type="text"
              value={formData.limitUptime}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Limit Quota [total Bytes]
            </label>
            <input
              id="limitQuota"
              type="text"
              value={formData.limitQuota}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type Username
            </label>
            <input
              id="typeUsername"
              type="text"
              value={formData.typeUsername}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Type Password
            </label>
            <select
              id="typePassword"
              value={formData.typePassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700"
            >
              <option value="01">Password = Username</option>
              <option value="02">Username = Password</option>
              <option value="03">Type Username = Password</option>
              <option value="04">Random 3 Character</option>
              <option value="05">Random 4 Character</option>
              <option value="06">Random 5 Character</option>
            </select>
          </div>
        </div>


        {/* Tienes dudas */}
        <div className="mt-4">
          <div className="relative flex justify-end group">
            <button
              className="shadow-xl/30 text-white text-sm font-medium py-1.5 px-4 rounded-md transition duration-200"
            >
              ¿Tienes dudas?
            </button>

            {/* Tooltip flotante con redes sociales */}
            <div
              className="absolute bottom-full right-0 mb-2 w-100 bg-gray-900 bg-opacity-90 text-white
               text-sm rounded-lg p-4 shadow-lg opacity-0 scale-0 transition-all duration-200
               group-hover:opacity-100 group-hover:scale-100 z-10 pointer-events-auto"
            >
              <p className="mb-3">Aprende cómo usar la herramienta con nuestro video explicativo</p>

              {/* Botones de redes */}
              <div className="flex justify-around">
                <a
                  href="https://x.com/RMikrotik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-400 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
                >
                  Twitter
                </a>
                <a
                  href="https://www.youtube.com/channel/UCq3nYbC1ceUwoZqYiESFb7g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs"
                >
                  YouTube
                </a>
                <a
                  href="https://www.tiktok.com/@rmikrotik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-full text-xs"
                >
                  TikTok
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61577406418771"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-xs"
                >
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/rmikrotik/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1 rounded-full text-xs"
                >
                  Instagram
                </a>
              </div>

              {/* Triángulo */}
              <div className="absolute -bottom-1.5 right-3 w-3 h-3 rotate-45 bg-gray-900 bg-opacity-90"></div>
            </div>
          </div>
        </div>

        {/* Tienes dudas Fin*/}
      </div>

      {/* Panel derecho - Resultado */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">
            Copy-Paste the Script to the Terminal
          </label>
          <div className="h-60 overflow-y-auto flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400 text-sm">
            {scriptResult ? (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            ) : (
              <p className="text-gray-500">
                {isLoading ? "Generating script..." : "The generated script will appear here"}
              </p>
            )}
          </div>
        </div>

        <div className="flex mt-4 space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
            disabled={isLoading || !session}
          >
            {isLoading ? "Generando..." : " Generar"}
          </button>

          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={handleClear}
            disabled={!session}
          >
            Borrar Todo
          </button>

          <button
            type="button"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-indigo-500 disabled:cursor-not-allowed"
            onClick={handleCopyScript}
            disabled={!scriptResult?.html || !session}
          >
            Copiar Script
          </button>

          <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:bg-green-500 disabled:cursor-not-allowed"
            onClick={handleDownload}
            disabled={!scriptResult?.html || !session}
          >
            Descarga
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormulariomikrotikUsernamePasswordHotspotGenerator;
