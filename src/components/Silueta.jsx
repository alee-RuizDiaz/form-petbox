import React, { useState } from "react";
import Delgada from "../assets/img/delgado.png";
import Ideal from "../assets/img/pesoideal.png";
import Sobrepeso from "../assets/img/sobrepeso.png";

const Silueta = ({ nombre, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(2);

  const levels = [
    {
      value: 1,
      label: "Delgada",
      description: "Un poco flaquito: Cintura estrecha y se le ven claramente las costillas.",
      image: Delgada,
      nivel: 2.5,
    },
    {
      value: 2,
      label: "Peso ideal",
      description: "En forma y saludable: La cintura se nota bien definida y se pueden sentir las costillas sin dificultad.",
      image: Ideal,
      nivel: 2.25,
    },
    {
      value: 3,
      label: "Sobrepeso",
      description: "Un poco rellenito: La cintura no es visible y sus costillas son difíciles de palpar.",
      image: Sobrepeso,
      nivel: 2,
    },
  ];

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedValue(value);
    const selectedLevel = levels.find((level) => level.value === value);
    onChange(selectedLevel);
  };

  const handleSelectedLevel = (level) => {
    setSelectedValue(level.value);
  };

  const currentLevel = levels.find((level) => level.value === selectedValue) || levels[0];

  return (
    <div className="flex flex-col items-center pb-5">
      <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[18px] text-center pb-[15px]">
        ¿Cuál es la silueta de {nombre}? 
      </h2>
      <p className="text-gray-600 mb-4 text-[14px] lg:text-[16px] text-center">
        Elige la silueta que mejor le describa.
      </p>
      <div className="relative lg:w-full w-[300px] max-w-md">
        <input
          type="range"
          min="1"
          max="3"
          step="1" // Solo valores enteros
          value={selectedValue}
          onChange={handleChange}
          className="w-full appearance-none bg-gray-300 h-2 rounded-full outline-none cursor-pointer accent-[#E66C55] mt-5"
        />
        <div className="flex justify-between text-sm font-quicksand mt-2">
          {levels.map((level) => (
            <div key={level.value} onClick={() => handleSelectedLevel(level)}>
              <span className="text-center font-quicksand">{level.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <img
          src={currentLevel.image}
          alt={currentLevel.label}
          className="lg:w-[180px] lg:h-[180px] w-[150px] h-[150px] mt-[-15px]"
        />
        <div className="bg-[#EDF8F8] p-4 rounded-lg shadow-md lg:w-[450px] w-[300px]">
          <p className="font-quicksand text-sm text-center lg:text-start">
            <span className="font-bold">{currentLevel.label}:</span>{" "}
            {currentLevel.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Silueta;