import React from "react";

interface SelectCustomProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    id: string; // El ID del select debe ser un string
    title: string; // El título también debe ser un string
    children: React.ReactNode; // Los hijos pueden ser cualquier nodo de React
}

const SelectCustom: React.FC<SelectCustomProps> = ({ id, title, children, ...rest }) => {
    return (
        <div>
            <label htmlFor={id} className="block font-semibold text-orange-400 mb-2">
                {title}
            </label>
            <select
                id={id}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-400"
                {...rest}
            >
                {children}
            </select>
        </div>
    );
};

export default SelectCustom;
