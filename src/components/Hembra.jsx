import React, { useState } from "react";
import Edad from "../assets/img/Edad.png";
import Cumple from "../assets/img/Cumple.png";
import Perro from "../assets/img/Perro.svg";
import Actividad from "./Actividad";
import SeleccionPatologia from "./Patologias";
import Comidas from "./Comidas";
import Humano from "./Humano";

const OptionButton = ({ option, selected, onSelect }) => (
  <button
    onClick={() => onSelect(option)}
    className={`p-3 border rounded-lg text-[18px] text-center ${selected === option ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]" : "hover:bg-gray-200"}`}
  >
    {option}
  </button>
);

const Hembra = ({ nombre, onContinue, onDataChange }) => {
  const [formData, setFormData] = useState({
    esterilizado: "",
    edad: "",
    silueta: "",
    peso: "",
    actividad: "",
    patologia: "",
    comida: "",
    contacto: { email: "", telefono: "" }
  });
  const [currentStep, setCurrentStep] = useState(0);

  const handleInputChange = (e, step) => {
    const value = e.target.value;
    const updatedData = { ...formData, [step]: value };
    setFormData(updatedData);
    onDataChange(updatedData); 
  };

  const handleOptionSelect = (step, option) => {
    const updatedData = { ...formData, [step]: option };
    setFormData(updatedData);
    onDataChange(updatedData);
  };

  const handleNext = (step) => {
    if (formData[step]) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const isNextButtonDisabled = (step) => {
    if (step === "comida") return !formData[step]?.value;
    if (step === "contacto") return !formData[step]?.email || !formData[step]?.telefono;
    return !formData[step];
  };
  

  const images = {
    edad: Edad,
    cumple: Cumple,
    perro: Perro
  };



  return (
    <div>
      {/* Pregunta 1 */}
      <div className={`${currentStep === 0 ? "block" : "hidden"} flex flex-col items-center`}>
        <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={images.edad} alt="Perro" className="w-[60px] h-[60px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">¿Está esterilizada?</h2>
        <div className="flex space-x-4 mt-6">
          <OptionButton option="Esterilizado" selected={formData.esterilizado} onSelect={(option) => handleOptionSelect("esterilizado", option)} />
          <OptionButton option="No esterilizado" selected={formData.esterilizado} onSelect={(option) => handleOptionSelect("esterilizado", option)} />
        </div>
        <button
          onClick={() => handleNext("esterilizado")}
          disabled={isNextButtonDisabled("esterilizado")}
          className={`mt-[30px] mb-[30px] font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold hover:bg-primary hover:text-[#3d3d3d] transition ${!isNextButtonDisabled("esterilizado") ? "bg-[#E66C55]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Continuar
        </button>
        <span className="text-center p-4 mt-[50px] bg-[#EDF8F8] rounded-[10px] font-quicksand text-[14px]">
        ¿Por qué es importante? 👩‍⚕️<br />
        Después de la esterilización, se requieren ajustes en la ración, ya que el perro suele tener menor gasto calórico.
        </span>
      </div>

      {/* Pregunta 2 */}
      <div className={`${currentStep === 1 ? "block" : "hidden"} flex flex-col items-center`}>
        <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={images.cumple} alt="Perro" className="w-[60px] h-[60px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">¿Qué edad tiene {nombre}?</h2>
        <div className="w-[450px] flex flex-col space-y-2">
          {["Cachorro (menos de 1 año)", "Adulto (1-7 años)", "Senior (más de 7 años)"].map((option, idx) => (
            <OptionButton key={idx} option={option} selected={formData.edad} onSelect={(option) => handleOptionSelect("edad", option)} />
          ))}
        </div>
        <button
          onClick={() => handleNext("edad")}
          disabled={isNextButtonDisabled("edad")}
          className={`mt-[30px] mb-[30px] font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold hover:bg-primary hover:text-[#3d3d3d] transition ${!isNextButtonDisabled("edad") ? "bg-[#E66C55]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Continuar
        </button>
      </div>

      {/* Pregunta 3 */}
      <div className={`${currentStep === 2 ? "block" : "hidden"} flex flex-col items-center`}>
        <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={images.perro} alt="Perro" className="w-[80px] h-[80px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">¿Qué silueta representa mejor a {nombre}?</h2>
        <div className="w-[450px] flex flex-col space-y-2">
          {["Delgada", "Peso ideal", "Sobrepeso", "Obesa"].map((option, idx) => (
            <OptionButton key={idx} option={option} selected={formData.silueta} onSelect={(option) => handleOptionSelect("silueta", option)} />
          ))}
        </div>
        <button
          onClick={() => handleNext("silueta")}
          disabled={isNextButtonDisabled("silueta")}
          className={`mt-[30px] mb-[30px] font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold hover:bg-primary hover:text-[#3d3d3d] transition ${!isNextButtonDisabled("silueta") ? "bg-[#E66C55]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Continuar
        </button>
      </div>

      {/* Pregunta 4 */}
      <div className={`${currentStep === 3 ? "block" : "hidden"} flex flex-col items-center`}>
      <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={images.perro} alt="Perro" className="w-[80px] h-[80px]" />
      </div>
      <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">El peso de {nombre} es más o menos de</h2>
      
      <div className="relative w-[200px]">
          <input
          type="number"
          value={formData.peso || ""}
          onChange={(e) => handleInputChange(e, "peso")}
          placeholder="Peso"
          maxLength="4"
          onInput={(e) => e.target.value = e.target.value.slice(0, 4)} // Limita el máximo de caracteres a 4
          className="w-full p-3 pr-10 border border-gray-300 rounded-lg text-center placeholder-gray-400"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">Kg</span>
      </div>
      
      <button
          onClick={() => handleNext("peso")}
          disabled={isNextButtonDisabled("peso")}
          className={`mt-[30px] mb-[30px] mb-[30px] font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold hover:bg-primary hover:text-[#3d3d3d] transition ${!isNextButtonDisabled("peso") ? "bg-[#E66C55]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
      >
          Continuar
      </button>
      </div>

      {/* Pregunta 5 */}
      <div className={`${currentStep === 4 ? "block" : "hidden"} flex flex-col items-center`}>
        <Actividad nombre={nombre} onChange={(actividad) => setFormData({ ...formData, actividad})} />
        <button
          onClick={() => handleNext("actividad")}
          disabled={isNextButtonDisabled("actividad")}
          className={`mt-[30px] mb-[30px] font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold hover:bg-primary hover:text-[#3d3d3d] transition ${!isNextButtonDisabled("actividad") ? "bg-[#E66C55]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Continuar
        </button>
      </div>

      {/* Pregunta 6 */}
      <div className={`${currentStep === 5 ? "block" : "hidden"} flex flex-col items-center`}>
        <SeleccionPatologia onPatologiaSeleccionada={(patologia) => {
          handleOptionSelect("patologia", patologia);
          setFormData({ ...formData, patologia });
        }} onContinue={() => handleNext("patologia")} />
      </div>

      {/* Pregunta 7 */}
      <div className={`${currentStep === 6 ? "block" : "hidden"} flex flex-col items-center`}>
        <Comidas nombre={nombre} onChange={(comida) => handleOptionSelect("comida", comida)} />
        <button
          onClick={() => handleNext("comida")}
          disabled={isNextButtonDisabled("comida")}
          className={`mb-[30px] font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold hover:bg-primary hover:text-[#3d3d3d] transition ${!isNextButtonDisabled("comida") ? "bg-[#E66C55]" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Continuar
        </button>
      </div>

      {/* Pregunta 8 */}
      <div className={`${currentStep === 7 ? "block" : "hidden"} flex flex-col items-center`}>
        <Humano nombre={nombre}  onSave={(data) => handleOptionSelect("contacto", data)} onContinue={onContinue} />    
      </div>
    </div>
  );
};

export default Hembra;



