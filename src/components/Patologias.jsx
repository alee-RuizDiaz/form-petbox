import React, { useState } from "react";
import Patologia from "../assets/img/patologia.png"; // Asegúrate de la ruta correcta

const SeleccionPatologia = ({ onPatologiaSeleccionada, onContinue }) => {
  const [tienePatologia, setTienePatologia] = useState(null); // Sí o No
  const [patologias, setPatologias] = useState([]); // Patologías seleccionadas
  const [isOpen, setIsOpen] = useState(false); // Para manejar el estado del desplegable
  

  const patologiasList = [
    "Alergias o Intolerancias Alimentarias",
    "Digestiones Sensibles",
    "Problemas de Piel",
    "Problemas Articulares",
    "Problemas Dentales",
    "Diabetes",
    "Epilepsia",
    "Cáncer",
    "Otitis",
    "Síndrome de Cushing (HAC)",
    "Hipotiroidismo",
    "Otro",
  ];

  const handleTienePatologia = (respuesta) => {
    setTienePatologia(respuesta);
    setPatologias([]); // Resetear si cambia la respuesta a "No"
    onPatologiaSeleccionada(respuesta); // Enviar al padre
  };

  const handleSelectPatologia = (patologia) => {
    if (patologias.includes(patologia)) {
      setPatologias(patologias.filter((p) => p !== patologia));
    } else {
      setPatologias([...patologias, patologia]);
    }
    onPatologiaSeleccionada(patologias.join(', '));
  };

  const isContinueEnabled = tienePatologia === "No" || (tienePatologia === "Sí" && patologias.length > 0);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
        <img src={Patologia} alt="Perro" className="w-[50px] h-[50px]" />
      </div>
      <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[20px] pb-[15px]">
        ¿Tiene tu perro alguna patología?
      </h2>
      <div className="flex space-x-4 mt-3">
        <button
          onClick={() => handleTienePatologia("Sí")}
          className={`px-6 py-3 text-[18px] font-quicksand rounded-full border-2 ${tienePatologia === "Sí" ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]" : "hover:bg-gray-200"}`}
        >
          Sí
        </button>
        <button
          onClick={() => handleTienePatologia("No")}
          className={`px-6 py-3 text-[18px] font-quicksand rounded-full border-2 ${tienePatologia === "No" ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]" : "hover:bg-gray-200"}`}
        >
          No
        </button>
      </div>

      {tienePatologia === "Sí" && (
        <div className="relative mt-4 w-full max-w-md">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full text-left p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
          >
            {patologias.length === 0 ? "Selecciona una patología" : patologias.join(", ")}
          </button>

          {isOpen && (
            <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
              {patologiasList.map((patologia) => (
                <li key={patologia} className="p-3 text-[16px] font-quicksand text-font hover:bg-[#edf8f8] hover:text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    id={patologia}
                    checked={patologias.includes(patologia)}
                    onChange={() => handleSelectPatologia(patologia)}
                    className="accent-[#E66C55]"
                  />
                  <label htmlFor={patologia} className="ml-2">
                    {patologia}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

     <span className="text-center p-4 mt-[30px] bg-[#EDF8F8] rounded-[10px] font-quicksand text-[14px] lg:w-[450px] w-[300px]">
        Cada perro es un mundo 🌎 ¡No te preocupes! 🧡<br /> Adaptaremos nuestro
        menú a su caso, siempre que sea posible. Si la patología de tu perro no
        aparece en el formulario, envía un correo a{" "}
        <a href="mailto:holapetbox.ar@gmail.com" className="text-secondary">
          holapetbox.ar@gmail.com
        </a>
      </span>

      <div className="mt-6">
        <button
          onClick={onContinue}
          disabled={!isContinueEnabled}
          className={`mb-[30px] font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold ${isContinueEnabled ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SeleccionPatologia;



