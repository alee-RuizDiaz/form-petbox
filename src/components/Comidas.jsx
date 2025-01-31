import React, { useState } from "react";
import SelectivoImg from "../assets/img/Selectivo.png";
import GourmetImg from "../assets/img/Gourmet.png";
import GlotonImg from "../assets/img/Gloton.svg";

const Comidas = ({ nombre, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(2); // Valor inicial

  const options = [
    {
      value: 1,
      label: "Selectivo",
      description:
        "Es de paladar exigente, suele costarle terminar su ración y se cansa de la comida (verás qué cambio cuando pruebe PetBox 😉)",
      image: SelectivoImg,
    },
    {
      value: 2,
      label: "Gourmet",
      description:
        "Le encanta probar nuevos sabores, pero no se conforma con cualquier cosa 😜",
      image: GourmetImg,
    },
    {
      value: 3,
      label: "Glotón",
      description:
        "Devora todo tipo de comida como si no fuera a probar bocado nunca más 😵",
      image: GlotonImg,
    },
  ];

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10); // Convertir el valor a número
    setSelectedValue(value);
  
    const selectOption = options.find((option) => option.value === value); // Encontrar el nivel actual
    if (selectOption && selectOption.label) {
      if (onChange) {
        onChange(selectOption); // Enviar el objeto completo
      }
    } else {
      console.error('Error: La opción seleccionada es nula o no tiene la propiedad label.');
    }
  };

  const currentOption = options.find(option => option.value === selectedValue) || options[0];

  return (
    <div className="flex flex-col items-center pb-5">
      <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[18px] pb-[15px]">
        ¿Qué crítico gastronómico es {nombre}? 🍽️
      </h2>
      <p className="text-gray-600 mb-4">
        Elige la opción que mejor lo describa
      </p>
      <div className="relative lg:w-full w-[300px] max-w-md">
        <input
          type="range"
          min="1"
          max="3"
          step="1" // Solo valores enteros
          value={selectedValue}
          onChange={handleChange}
          className="font-quicksand w-full appearance-none bg-gray-300 h-2 rounded-full outline-none cursor-pointer accent-[#E66C55] mt-5"
        />
        <div className="flex justify-between text-sm font-quicksand mt-2">
          {options.map((option) => (
            <span key={option.value} className="text-center">
              {option.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <img
          src={currentOption.image}
          alt={currentOption.label}
          className="w-[150px] h-[150px] mr-4 my-5"
        />
        <div className="bg-[#EDF8F8] p-4 rounded-lg shadow-md lg:w-[450px] w-[300px] text-center">
          <p className="font-quicksand text-sm">
            <span className="font-bold">{currentOption.label}:</span> {currentOption.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comidas;