import React from 'react';

const SocialTooltipButton = () => {
  return (
    <div className="mt-4">
      <div className="relative flex justify-end group">
        <button className="shadow-xl/30 text-white text-sm font-medium py-1.5 px-4 rounded-md transition duration-200">
          ¿Tienes dudas?
        </button>

        {/* Tooltip flotante con redes sociales */}
        <div className="absolute bottom-full right-0 mb-2 w-100 bg-gray-900 bg-opacity-90 text-white text-sm rounded-lg p-4 shadow-lg opacity-0 scale-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100 z-10 pointer-events-auto">
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
  );
};

export default SocialTooltipButton;
