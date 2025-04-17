import { useState } from 'react';
import { marked } from 'marked';

interface ContentDataBase {
    id: number;
    title: string;
    description: string;
}

const MarkdownViewer = ({ initialData }: { initialData: ContentDataBase[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContent, setSelectedContent] = useState(
        initialData.length > 0 ? marked.parse(initialData[0].description) : ''
    );

    const handleContentSelect = (description: string) => {
        setSelectedContent(marked.parse(description));
    };

    const filteredData = initialData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="bg-gray-800 shadow-lg p-8">
                <div className="text-center mb-6">
                    <h1 className="text-2xl lg:text-4xl font-bold text-orange-500">
                        MIKROTIK SCRIPT ROUTER-OS DATABASE
                    </h1>
                    <p className="text-gray-300">
                        Static Routes and Firewall Mangle Rules for Games
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-8 bg-slate-800">
                <div className="flex flex-col lg:flex-row bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    {/* Panel izquierdo */}
                    <div className="w-full lg:w-1/3 bg-slate-900 p-4 rounded-md">
                        <div className="text-gray-950 shadow-2xl rounded-lg p-6 w-full ring-2 ring-blue-500">
                            <h2 className="text-lg font-bold mb-4 text-gray-200">
                                Base de Datos Scripts
                            </h2>

                            <input
                                type="text"
                                placeholder="Buscar Scripts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 mb-4 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />

                            <div className="h-screen overflow-y-scroll bg-gray-700 p-4 rounded">
                                <h3 className="font-semibold text-gray-300 mb-2">
                                    Mobile Games
                                </h3>
                                <div className="space-y-2 text-white">
                                    {filteredData.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleContentSelect(item.description)}
                                            className="cursor-pointer transition-transform duration-300 hover:scale-110 p-1 hover:bg-orange-500 rounded font-normal"
                                        >
                                            {item.title}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={scrollToTop}
                                className="text-white px-4 py-2 rounded-md transition ease-in-out delay-150 bg-sky-700 hover:-translate-y-1 hover:scale-110 hover:bg-orange-600 duration-300 mt-4 w-full"
                            >
                                Volver Arriba
                            </button>
                        </div>
                    </div>

                    {/* Panel derecho */}
                    <div className="w-full lg:w-2/3 flex items-start justify-center p-2 rounded-lg bg-white ml-1">
                    
                        <article
                            className="prose dark:prose-invert p-4 "
                            dangerouslySetInnerHTML={{ __html: selectedContent }}
                        />
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarkdownViewer;