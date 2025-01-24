import React, { useState, useEffect } from "react";
import Hembra from "./Hembra";
import SeleccionarRaza from "../components/SelecRaza";
import Perro from "../assets/img/perro.svg";
import Nombre from "../assets/img/nombre.png";
import Edad from "../assets/img/edad.png";

const Form = () => {
  const [currentStep, setCurrentStep] = useState(-1); // Inicia con -1 para la introducción
  const [formData, setFormData] = useState({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [currentStep]: value });
    setIsNextEnabled(value.trim() !== ""); // Habilitar el botón solo si hay texto
  };

  const handleOptionSelect = (step, option) => {
    setFormData({ ...formData, [step]: option });
    setIsNextEnabled(true);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    setIsNextEnabled(false); // Reinicia el estado del botón
  };

  const handleRazaSelection = (raza) => {
    setFormData({ ...formData, 0: raza }); // Guardamos la raza en el paso 0
    handleNext();
  };

  useEffect(() => {
    // Activar el botón automáticamente si ya hay datos guardados en un paso
    if (formData[currentStep]) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [currentStep, formData]);

  // Renderizar la introducción
  if (currentStep === -1) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-5">
          <img src={Perro} alt="Perro" className="w-[90px] h-[90px]" />
        </div>
        <h1 className="font-quicksand font-semibold text-[35px] pb-[15px] text-font">
          Arma el plan personalizado para tu Perro
        </h1>
        <p className="font-quicksand font-normal pb-[25px] text-[16px] text-center text-font">
          Completa las preguntas para que podamos recomendar el mejor plan para tu mascota.
        </p>
        <div className="text-center">
          <button
            className="font-quicksand p-[10px] px-[25px] bg-[#E66C55] text-white text-[20px] rounded-[20px] hover:bg-[#FFEB88] hover:text-[#3d3d3d] transition"
            onClick={handleNext}
          >
            Comenzar
          </button>
        </div>
      </div>
    );
  }

  // Paso de selección de raza
  if (currentStep === 0) {
    return <SeleccionarRaza onContinue={handleRazaSelection} />;
  }

  // Paso de nombre
  if (currentStep === 1) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={Nombre} alt="Perro" className="w-[60px] h-[60px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">
          ¿Cómo se llama tu perro?
        </h2>
        <input
          type="text"
          value={formData[1] || ""}
          onChange={handleInputChange}
          placeholder="Mi perrhijo se llama..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg text-center placeholder-gray-400"
        />
        <div className="text-center mt-[50px]">
          <button
            className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold ${
              isNextEnabled
                ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isNextEnabled}
            onClick={handleNext}
          >
            Continuar
          </button>
        </div>
        <span className="p-4 mt-[50px] bg-[#EDF8F8] rounded-[10px] font-quicksand text-[14px]">
          ¡Qué emoción! 🥰 Estás a punto de mejorar la vida de tu perro a través de una alimentación 100% natural.
        </span>
      </div>
    );
  }

  // Paso de selección de género
  if (currentStep === 2) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={Edad} alt="Emoji" className="w-[60px] h-[60px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">
          ¡Queremos conocer a {formData[1]}!
        </h2>
        <div className="flex space-x-4 mt-6">
          <button
            className={`px-6 py-3 text-[18px] font-quicksand rounded-full border-2 ${
              formData[2] === "Macho"
                ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
            onClick={() => handleOptionSelect(2, "Macho")}
          >
            Macho
          </button>
          <button
            className={`px-6 py-3 text-[18px] font-quicksand rounded-full border-2 ${
              formData[2] === "Hembra"
                ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
            onClick={() => handleOptionSelect(2, "Hembra")}
          >
            Hembra
          </button>
        </div>
        <div className="text-center mt-[50px]">
          <button
            className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold ${
              isNextEnabled
                ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isNextEnabled}
            onClick={handleNext}
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  // Renderizar componente Hembra si se selecciona "Hembra"
  if (formData[2] === "Hembra") {
    return <Hembra nombre={formData[1]} />;
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">
        Gracias por completar el formulario
      </h2>
    </div>
  );
};

export default Form;
















