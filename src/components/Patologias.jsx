import React, { useState } from "react";
import Patologia from "../assets/img/patologia.png"; // Cambia a la ruta correcta del icono

const SeleccionPatologia = ({ onPatologiaSeleccionada, onContinue }) => {
  const [tienePatologia, setTienePatologia] = useState(null); // Sí o No
  const [patologia, setPatologia] = useState(""); // Patología seleccionada
  const [isOpen, setIsOpen] = useState(false); // Para manejar el estado del desplegable

  const patologias = [
    "Alergias o Intolerancias Alimentarias",
    "Digestiones Sensibles",
    "Problemas de Piel",
    "Problemas Articulares",
    "Problemas Dentales",
    "Diabetes",
    "Epilepsia",
    "Cancer",
    "Otitis",
    "Sindrome de Cushing (HAC)",
    "Hipotiroidismo",
    "Otro", 
  ]; // Lista de patologías

  const handleTienePatologia = (respuesta) => {
    setTienePatologia(respuesta);
    setPatologia(""); // Resetear la patología seleccionada si se cambia a "No"
    if (respuesta === "No") onPatologiaSeleccionada(respuesta, ""); // Notificar al padre
  };

  const handleSelectPatologia = (value) => {
    setPatologia(value);
    onPatologiaSeleccionada("Sí", value); // Notificar al padre con la selección
    setIsOpen(false); // Cerrar el desplegable al seleccionar una patología
  };

  const isContinueEnabled =
    tienePatologia === "No" || (tienePatologia === "Sí" && patologia);

  return (
    <div className="flex flex-col items-center">
      <div className="w-[110px] h-[110px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
        <img src={Patologia} alt="Perro" className="w-[80px] h-[80px]" />
      </div>
      <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">
        ¿Tiene tu perro alguna patología?
      </h2>
      <div className="flex space-x-4 mt-6">
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
            onClick={() => setIsOpen(!isOpen)} // Alternar la visibilidad del desplegable
            className="w-full text-left p-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
          >
            {patologia || "Selecciona una patología"}
          </button>

          {isOpen && (
            <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
              {patologias.map((p, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectPatologia(p)}
                  className="p-3 text-[16px] font-quicksand text-font hover:bg-[#edf8f8] hover:text-secondary cursor-pointer"
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <span className="text-center p-4 mt-[50px] bg-[#EDF8F8] rounded-[10px] font-quicksand text-[14px] w-[650px]">
        Cada perro es un mundo 🌎 ¡No te preocupes! 🧡<br /> Adaptaremos nuestro
        menú a su caso, siempre que sea posible. Si la patología de tu perro no
        aparece en el formulario, envía un correo a{" "}
        <a href="mailto:holapetbox.ar@gmail.com" className="text-secondary">
          holapetbox.ar@gmail.com
        </a>
      </span>

      <div className="mt-6">
        <button
          onClick={() => onContinue()}
          disabled={!isContinueEnabled}
          className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold ${isContinueEnabled ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SeleccionPatologia;


