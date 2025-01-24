import React, { useState } from "react";
import PerroIcon from "../assets/img/lupa.png";

const SeleccionarRaza = ({ onContinue }) => {
  const [raza, setRaza] = useState("");
  const isNextEnabled = raza.trim() !== "";

  const handleChange = (e) => {
    setRaza(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-5">
        <img
          src={PerroIcon}
          alt="Lupa"
          className="w-[50px] h-[50px]" // Ajusta según tu ícono
        />
      </div>
      <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">
        ¿Cuál es la raza de tu perrete?
      </h2>
      <input
        type="text"
        value={raza}
        onChange={handleChange}
        placeholder="En el caso de no ser de raza pon Mestizo 🐶"
        className="w-full max-w-md p-3 border border-gray-300 rounded-lg text-center placeholder-gray-400"
      />
      <button 
        className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold mt-[50px] ${
          isNextEnabled
            ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!isNextEnabled}
        onClick={() => onContinue(raza)}
      >
        Continuar
      </button>
    </div>
  );
};

export default SeleccionarRaza;
