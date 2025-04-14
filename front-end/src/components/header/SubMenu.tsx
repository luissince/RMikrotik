import { useState } from 'react';

const NavigationMenu = ({ type }: { type: string }) => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  if (type === "sign-in" || type === "sign-up") {
    return null;
  }

  return (
    <div className="h-full">
      <ul>
        <li>
          <button
            onClick={toggleSubmenu}
            className="flex justify-between w-full text-white font-normal px-5 py-3 hover:bg-[#383838] text-left"
          >
            <span>Todas las categorías</span>
            <svg 
              className={`w-6 h-6 text-white transition-transform duration-200 ${isSubmenuOpen ? 'rotate-0' : '-rotate-90'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          <ul 
            className={`bg-[#383838] overflow-hidden transition-all duration-200 ${
              isSubmenuOpen ? 'h-auto' : 'h-0'
            }`}
          >
            <li>
              <button className="w-full text-white font-normal px-5 py-3 hover:bg-[#383838] text-left">
                Precios
              </button>
            </li>
            <li>
              <button className="w-full text-white font-normal px-5 py-3 hover:bg-[#383838] text-left">
                Soporte
              </button>
            </li>
            <li>
              <button className="w-full text-white font-normal px-5 py-3 hover:bg-[#383838] text-left">
                Contacto
              </button>
            </li>
          </ul>
        </li>
        <li>
          <button className="w-full text-white font-normal px-5 py-3 hover:bg-[#383838] text-left">
            Precios
          </button>
        </li>
        <li>
          <button className="w-full text-white font-normal px-5 py-3 hover:bg-[#383838] text-left">
            Licencia
          </button>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;