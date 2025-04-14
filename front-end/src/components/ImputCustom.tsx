import React from "react";

interface InputCustomProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string; // ID requerido para el input y el label
    title: string; // Etiqueta que describe el input
}

const InputCustom: React.FC<InputCustomProps> = ({ id, title, ...rest }) => {
    return (
        <div>
            <label
                htmlFor={id}
                className="block font-semibold text-orange-400 mb-2"
            >
                {title}
            </label>
            <input
                id={id}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                {...rest} // Pasar propiedades adicionales al input
            />
        </div>
    );
};

export default InputCustom;
