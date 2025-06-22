import { useState } from "react";
import SocialTooltipButton from "../SocialTooltipButton";
type ScriptResult = {
  html: string;
  text: string;
};
const FormularioQueueThreeGeneratorShared = () => {
  const [parentNameQueue, setParentNameQueue] = useState("Global-Connection");
  const [subQueueUpload, setSubQueueUpload] = useState("");
  const [subQueueDownload, setSubQueueDownload] = useState("");
  const [uploadMaxLimit, setUploadMaxLimit] = useState("5M");
  const [downloadMaxLimit, setDownloadMaxLimit] = useState("10M");
  const [clientNameQueue, setClientNameQueue] = useState("Client-");
  const [clientIdentity, setClientIdentity] = useState("1");
  const [startIPClient, setStartIPClient] = useState("192.168.88.10");
  const [endIPClient, setEndIPClient] = useState("192.168.88.20");
  const [subUploadMaxLimit, setSubUploadMaxLimit] = useState("512K");
  const [clientDownloadMaxLimit, setClientDownloadMaxLimit] = useState("1M");
  const [uploadLimitAt, setUploadLimitAt] = useState("0");
  const [downloadLimitAt, setDownloadLimitAt] = useState("0");
  const [autoSetBandwidth, setAutoSetBandwidth] = useState(false);
  const [scriptResult, setScriptResult] = useState<ScriptResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClear = () => {
    setParentNameQueue("");
    setSubQueueUpload("");
    setSubQueueDownload("");
    setUploadMaxLimit("");
    setDownloadMaxLimit("");
    setClientNameQueue("");
    setClientIdentity("");
    setStartIPClient("");
    setEndIPClient("");
    setSubUploadMaxLimit("");
    setClientDownloadMaxLimit("");
    setUploadLimitAt("0");
    setDownloadLimitAt("0");
    setAutoSetBandwidth(false);
  };
  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const payload = {

        parentNameQueue: parentNameQueue,
        subQueueUpload: subQueueUpload,
        subQueueDownload: subQueueDownload,
        uploadMaxLimit: uploadMaxLimit,
        downloadMaxLimit: downloadMaxLimit,
        clientNameQueue: clientNameQueue,
        clientIdentity: clientIdentity,
        startIPClient: startIPClient,
        endIPClient: endIPClient,
        clientDownloadMaxLimit: clientDownloadMaxLimit,
        uploadLimitAt: uploadLimitAt,
        downloadLimitAt: downloadLimitAt,
        subUploadMaxLimit: subUploadMaxLimit,

      };

      // Simulate API call
      const response = await fetch(`${import.meta.env.PUBLIC_BASE_URL_API}/queue-tree-generator-shared`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resultData: ScriptResult = await response.json();
      setScriptResult(resultData);
    } catch (error) {
      console.error('Error generating script:', error);
    } finally {
      setIsLoading(false);
    }
  };






  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-900 p-6 rounded-lg shadow-lg ">
      {/* Form Section */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="parentNameQueue" className="block text-sm font-semibold text-gray-300">
              Parent Name Queue
            </label>
            <input
              id="parentNameQueue"
              type="text"
              value={parentNameQueue}
              onChange={(e) => setParentNameQueue(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
              placeholder="Global-Connection"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="subQueueUpload" className="block text-sm font-semibold text-gray-300">
                Sub Queue Upload
              </label>
              <input
                id="subQueueUpload"
                type="text"
                value={subQueueUpload}
                onChange={(e) => setSubQueueUpload(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="Upload"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="subQueueDownload" className="block text-sm font-semibold text-gray-300">
                Sub Queue Download
              </label>
              <input
                id="subQueueDownload"
                type="text"
                value={subQueueDownload}
                onChange={(e) => setSubQueueDownload(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="Download"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="uploadMaxLimit" className="block text-sm font-semibold text-gray-300">
                Upload Max-Limit
              </label>
              <input
                id="uploadMaxLimit"
                type="text"
                value={uploadMaxLimit}
                onChange={(e) => setUploadMaxLimit(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="5M"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="downloadMaxLimit" className="block text-sm font-semibold text-gray-300">
                Download Max-Limit
              </label>
              <input
                id="downloadMaxLimit"
                type="text"
                value={downloadMaxLimit}
                onChange={(e) => setDownloadMaxLimit(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="10M"
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-orange-400 mb-4">Sub Parent Queue / Child Queue</h2>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="clientNameQueue" className="block text-sm font-semibold text-gray-300">
                Client Name Queue
              </label>
              <input
                id="clientNameQueue"
                type="text"
                value={clientNameQueue}
                onChange={(e) => setClientNameQueue(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="Client-"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="clientIdentity" className="block text-sm font-semibold text-gray-300">
                Client Identity
              </label>
              <input
                id="clientIdentity"
                type="text"
                value={clientIdentity}
                onChange={(e) => setClientIdentity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="1"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="startIPClient" className="block text-sm font-semibold text-gray-300">
                Start IP Client
              </label>
              <input
                id="startIPClient"
                type="text"
                value={startIPClient}
                onChange={(e) => setStartIPClient(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="192.168.88.10"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="endIPClient" className="block text-sm font-semibold text-gray-300">
                End IP Client
              </label>
              <input
                id="endIPClient"
                type="text"
                value={endIPClient}
                onChange={(e) => setEndIPClient(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="192.168.88.20"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="subUploadMaxLimit" className="block text-sm font-semibold text-gray-300">
                Upload Max-Limit  ----- 2
              </label>
              <input
                id="subUploadMaxLimit"
                type="text"
                value={subUploadMaxLimit}
                onChange={(e) => setSubUploadMaxLimit(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="512K"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="clientDownloadMaxLimit" className="block text-sm font-semibold text-gray-300">
                Download Max-Limit
              </label>
              <input
                id="clientDownloadMaxLimit"
                type="text"
                value={clientDownloadMaxLimit}
                onChange={(e) => setClientDownloadMaxLimit(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="1M"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="uploadLimitAt" className="block text-sm font-semibold text-gray-300">
                Upload Limit-At
              </label>
              <input
                id="uploadLimitAt"
                type="text"
                value={uploadLimitAt}
                onChange={(e) => setUploadLimitAt(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="0"
              />
            </div>
            <div className="flex-1 space-y-2">
              <label htmlFor="downloadLimitAt" className="block text-sm font-semibold text-gray-300">
                Download Limit-At
              </label>
              <input
                id="downloadLimitAt"
                type="text"
                value={downloadLimitAt}
                onChange={(e) => setDownloadLimitAt(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              id="autoSetBandwidth"
              type="checkbox"
              checked={autoSetBandwidth}
              onChange={(e) => setAutoSetBandwidth(e.target.checked)}
              className="h-4 w-4 text-orange-500 focus:ring-orange-400 border-gray-600 rounded"
            />
            <label htmlFor="autoSetBandwidth" className="text-sm text-gray-300">
              Auto Set For Bandwidth Shared (UP-TO)
            </label>
          </div>

          <div className="flex mt-4 space-x-4">
            <button
              type="button"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
              onClick={handleGenerate}
            >
              Generar
            </button>
            <button
              type="button"
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={handleClear}
            >
              Borrar Todo
            </button>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={() => scriptResult && navigator.clipboard.writeText(scriptResult.text)}                   >
              Copiar Script
            </button>
          </div>
           <SocialTooltipButton />
        </form>
         
      </div>

      {/* Result Section */}
      <div className="flex flex-col lg:w-1/2 min-h-0">
        <div className="flex-grow bg-gray-700 p-4 rounded-lg flex flex-col min-h-0">
          <label className="block text-sm font-semibold mb-2 text-gray-300">Script Generator Result</label>
          <div className="flex-grow overflow-y-auto bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400">
            {scriptResult && (
              <div dangerouslySetInnerHTML={{ __html: scriptResult.html }} />
            )}
          </div>
        </div>


      </div>
    </div>
  );
};

export default FormularioQueueThreeGeneratorShared;
