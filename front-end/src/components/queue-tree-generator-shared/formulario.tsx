import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const FormularioQueueThreeGeneratorShared = () => {
  const { control: parentControl, handleSubmit: handleParentSubmit } = useForm({
    defaultValues: {
      parentNameQueue: "Global-Connection",
      subQueueUpload: "Upload",
      subQueueDownload: "Download",
      uploadMaxLimit: "5M",
      downloadMaxLimit: "10M",
    },
  });

  const { control: childControl, handleSubmit: handleChildSubmit, reset } = useForm({
    defaultValues: {
      clientNameQueue: "Client-",
      clientIdentity: "1",
      startIpClient: "192.168.88.10",
      endIpClient: "192.168.88.20",
      uploadMaxLimit: "512K",
      downloadMaxLimit: "1M",
      uploadLimitAt: "0",
      downloadLimitAt: "0",
      autoSetForBandwidthShared: false,
    },
  });

  const [scriptResult, setScriptResult] = useState("");

  const onParentSubmit = (data) => {
    console.log("Parent Form Data:", data);
    // Aquí puedes manejar el envío del formulario, como enviar los datos a un servidor
  };

  const onChildSubmit = (data) => {
    console.log("Child Form Data:", data);
    // Aquí puedes manejar el envío del formulario, como enviar los datos a un servidor
    // Simulamos un script generado
    const generatedScript = `
      ############################################################
      # Queue Tree Script Generator For Mikrotik + Bandwidth Shared (UpTo)
      # Date/Time: ${new Date().toISOString()}
      # Created By: buananet.com - fb.me/buananet.pbun
      ############################################################
    `;
    setScriptResult(generatedScript);
  };

  const handleClearAll = () => {
    reset({
      clientNameQueue: "Client-",
      clientIdentity: "1",
      startIpClient: "192.168.88.10",
      endIpClient: "192.168.88.20",
      uploadMaxLimit: "512K",
      downloadMaxLimit: "1M",
      uploadLimitAt: "0",
      downloadLimitAt: "0",
      autoSetForBandwidthShared: false,
    });
    setScriptResult("");
  };

  const handleCopyScript = () => {
    if (scriptResult) {
      navigator.clipboard
        .writeText(scriptResult)
        .then(() => alert("Script copiado al portapapeles!"))
        .catch((err) => console.error("Error al copiar: ", err));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg">
      {/* Parent Queue Form Section */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <form className="space-y-4" onSubmit={handleParentSubmit(onParentSubmit)}>
          <div className="space-y-2">
            <label htmlFor="parentNameQueue" className="block text-sm font-medium text-gray-200">
              Parent Name Queue
            </label>
            <Controller
              name="parentNameQueue"
              control={parentControl}
              render={({ field }) => (
                <input
                  id="parentNameQueue"
                  type="text"
                  className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                  {...field}
                />
              )}
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="subQueueUpload" className="block text-sm font-medium text-gray-200">
                Sub Queue Upload
              </label>
              <Controller
                name="subQueueUpload"
                control={parentControl}
                render={({ field }) => (
                  <input
                    id="subQueueUpload"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="subQueueDownload" className="block text-sm font-medium text-gray-200">
                Sub Queue Download
              </label>
              <Controller
                name="subQueueDownload"
                control={parentControl}
                render={({ field }) => (
                  <input
                    id="subQueueDownload"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="uploadMaxLimit" className="block text-sm font-medium text-gray-200">
                Upload Max-Limit
              </label>
              <Controller
                name="uploadMaxLimit"
                control={parentControl}
                render={({ field }) => (
                  <input
                    id="uploadMaxLimit"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="downloadMaxLimit" className="block text-sm font-medium text-gray-200">
                Download Max-Limit
              </label>
              <Controller
                name="downloadMaxLimit"
                control={parentControl}
                render={({ field }) => (
                  <input
                    id="downloadMaxLimit"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </form>

        {/* Child Queue Form Section */}
        <form className="space-y-4" onSubmit={handleChildSubmit(onChildSubmit)}>
          <h2 className="text-lg font-semibold text-gray-200">Sub Parent Queue / Child Queue</h2>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="clientNameQueue" className="block text-sm font-medium text-gray-200">
                Client Name Queue
              </label>
              <Controller
                name="clientNameQueue"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="clientNameQueue"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="clientIdentity" className="block text-sm font-medium text-gray-200">
                Client Identity
              </label>
              <Controller
                name="clientIdentity"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="clientIdentity"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="startIpClient" className="block text-sm font-medium text-gray-200">
                Start IP Client
              </label>
              <Controller
                name="startIpClient"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="startIpClient"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="endIpClient" className="block text-sm font-medium text-gray-200">
                End IP Client
              </label>
              <Controller
                name="endIpClient"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="endIpClient"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="uploadMaxLimit" className="block text-sm font-medium text-gray-200">
                Upload Max-Limit
              </label>
              <Controller
                name="uploadMaxLimit"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="uploadMaxLimit"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="downloadMaxLimit" className="block text-sm font-medium text-gray-200">
                Download Max-Limit
              </label>
              <Controller
                name="downloadMaxLimit"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="downloadMaxLimit"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="uploadLimitAt" className="block text-sm font-medium text-gray-200">
                Upload Limit-At
              </label>
              <Controller
                name="uploadLimitAt"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="uploadLimitAt"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="flex-1 space-y-2">
              <label htmlFor="downloadLimitAt" className="block text-sm font-medium text-gray-200">
                Download Limit-At
              </label>
              <Controller
                name="downloadLimitAt"
                control={childControl}
                render={({ field }) => (
                  <input
                    id="downloadLimitAt"
                    type="text"
                    className="w-full p-2 border border-gray-600 rounded-md bg-gray-800 text-gray-200"
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="autoSetForBandwidthShared"
              control={childControl}
              render={({ field }) => (
                <input
                  id="autoSetForBandwidthShared"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  {...field}
                />
              )}
            />
            <label htmlFor="autoSetForBandwidthShared" className="text-sm font-medium text-gray-200">
              Auto Set For Bandwidth Shared (UP-TO)
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
            >
              Generate
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Clear All
            </button>
          </div>
        </form>
      </div>

      {/* Result Section */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-200">
            Resultado del Generador de Script
          </label>
          <div className="h-60 overflow-y-auto flex-grow bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-200 text-sm">
            {scriptResult ? (
              <pre>{scriptResult}</pre>
            ) : (
              <p className="text-gray-500">
                El script generado aparecerá aquí
              </p>
            )}
          </div>
        </div>

        <button
          type="button"
          className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
          onClick={handleCopyScript}
          disabled={!scriptResult}
        >
          Copiar Script
        </button>
      </div>
    </div>
  );
};


export default FormularioQueueThreeGeneratorShared  ;
