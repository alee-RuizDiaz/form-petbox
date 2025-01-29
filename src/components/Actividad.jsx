import React, { useState } from "react";
import Zen from "../assets/img/Perrito zen.png";
import Alfombra from "../assets/img/Perrito alfombra.png";
import Terremoto from "../assets/img/Perrito terremoto.png";
import Deportista from "../assets/img/Perrito deportista.png";

const Actividad = ({ nombre, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(2); // Valor inicial

  const levels = [
    {
      value: 1,
      label: "Alfombra",
      description: "Perro alfombra: paseos diarios de menos de 1h. Lo que más le gusta es echarse una buena siesta 😴 y estar bien tranquilita.",
      image: Alfombra,
    },
    {
      value: 2,
      label: "Zen",
      description: "Perro zen: paseos diarios de 1 a 2h. Sabe disfrutar de buenas caminatas, pero también sabe cuándo descansar 😴",
      image: Zen,
    },
    {
      value: 3,
      label: "Terremoto",
      description: "Perro terremoto: paseos diarios de más de 2h. ¡Un torbellino de energía! 💪",
      image: Terremoto,
    },
    {
      value: 4,
      label: "Deportista",
      description: "Perro deportista: paseos diarios intensos y sesiones de ejercicio extra. ¡Ama correr, saltar y estar en movimiento todo el día! 🏃‍♀️💨",
      image: Deportista,
    },
  ];

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10); // Convertir el valor a número
    setSelectedValue(value);
  
    const selectedLevel = levels.find((level) => level.value === value); // Encontrar el nivel actual
    if (onChange && selectedLevel) {
      onChange({ value: selectedLevel.value, label: selectedLevel.label }); // Enviar ambos datos al padre
    }
  };
  
  

  const currentLevel = levels.find(level => level.value === selectedValue) || levels[0];

  return (
    <div className="flex flex-col items-center pb-5">
      <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[17px] text-center pb-[15px]">
        ¿Cuál es el nivel de actividad de {nombre}? 🏃‍♀️
      </h2>
      <p className="text-gray-600 mb-4 text-[14px] lg:text-[16px] text-center">
        Elige el nivel de actividad que mejor le describa.
      </p>
      <div className="relative lg:w-full w-[300px] max-w-md">
        <input
          type="range"
          min="1"
          max="4"
          step="1" // Solo valores enteros
          value={selectedValue}
          onChange={handleChange}
          className="w-full appearance-none bg-gray-300 h-2 rounded-full outline-none cursor-pointer accent-[#E66C55] mt-5"
        />
        <div className="flex justify-between text-sm font-quicksand mt-2">
          {levels.map((level) => (
            <span key={level.value} className="text-center font-quicksand">
              {level.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        <img
          src={currentLevel.image}
          alt={currentLevel.label}
          className="lg:w-[120px] lg:h-[120px] w-[100px] h-[100px] mr-4 my-5"
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

export default Actividad;


