import React, { useState } from "react";
import Edad from "../assets/img/Edad.png";
import Cumple from "../assets/img/Cumple.png";

const Hembra = ({nombre}) => {
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(0); // Controla el paso actual

  const handleInputChange = (e, step) => {
    const value = e.target.value;
    setFormData({ ...formData, [step]: value });
  };

  const handleOptionSelect = (step, option) => {
    setFormData({ ...formData, [step]: option });
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div>
      {/* Pregunta 1 */}
      <div className={`${currentStep === 0 ? "block" : "hidden"} flex flex-col items-center`}>
        <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
            <img src={Edad} alt="Perro" className="w-[60px] h-[60px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">¿Está esterilizada?</h2>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => handleOptionSelect(0, "Esterilizada")}
            className={`px-6 py-3 text-[18px] font-quicksand rounded-full border-2 ${
              formData[0] === "Esterilizada" ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]" : "hover:bg-gray-200"
            }`}
          >
            Esterilizada
          </button>
          <button
            onClick={() => handleOptionSelect(0, "No esterilizada")}
            className={`px-6 py-3 text-[18px] font-quicksand rounded-full border-2 ${
              formData[0] === "No esterilizada" ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]" : "hover:bg-gray-200"
            }`}
          >
            No esterilizada
          </button>
        </div>
        <div className="mt-[50px]">
          <button
            onClick={handleNext}
            disabled={!formData[0]}
            className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold ${
              formData[0]
                ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continuar
          </button>
        </div>
        <span className="text-center p-4 mt-[50px] bg-[#EDF8F8] rounded-[10px] font-quicksand text-[14px]">
        ¿Por qué es importante? 👩‍⚕️<br />
        Después de la esterilización, se requieren ajustes en la ración, ya que el perro suele tener menor gasto calórico.
        </span>
      </div>

      {/* Pregunta 2 */}
      <div className={`${currentStep === 1 ? "block" : "hidden"} flex flex-col items-center`}>
        <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
            <img src={Cumple} alt="Perro" className="w-[60px] h-[60px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">¿Qué edad tiene {nombre}?</h2>
        <div className="space-y-2">
          {["Cachorro (menos de 1 año)", "Adulto (1-7 años)", "Senior (más de 7 años)"].map(
            (option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(1, option)}
                className={`w-full p-2 border rounded-lg text-left ${
                  formData[1] === option ? "bg-primary font-quicksand  text-font hover:bg-primary transition" : "font-quicksand hover:bg-gray-200 transition"
                }`}
              >
                {option}
              </button>
            )
          )}
        </div>
        <div className="mt-[50px]">
          <button
            onClick={handleNext}
            disabled={!formData[1]}
            className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold ${
              formData[1]
                ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continuar
          </button>
        </div>
        <span className="text-center p-4 mt-[50px] bg-[#EDF8F8] rounded-[10px] font-quicksand text-[14px]">
        ¿Por qué es importante? 👩‍⚕️<br />
        Las necesidades calóricas varían según la edad de tu perro, pero nos adaptaremos perfectamente a su momento vital 😊
        </span>
      </div>

      {/* Pregunta 3 */}
      <div className={`${currentStep === 2 ? "block" : "hidden"} p-6 rounded-lg shadow-md mb-4`}>
        <h2 className="text-xl font-bold mb-4">¿Qué silueta representa mejor a {nombre}?</h2>
        <div className="space-y-2">
          {["Delgado", "Peso ideal", "Sobrepeso", "Obeso"].map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleOptionSelect(2, option)}
              className={`w-full p-2 border rounded-lg text-left ${
                formData[2] === option ? "bg-blue-200" : "hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={handleNext}
            disabled={!formData[2]}
            className={`p-2 px-4 rounded-lg ${
              formData[2]
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hembra;



