import React, { useState } from "react";
import HumanoImg from "../assets/img/Humano.png";

const Humano = ({ nombre, onSave, onContinue }) => {
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Por favor, ingresa un correo válido.");
    } else {
      setEmailError("");
    }
  };

  const validateTelefono = (value) => {
    const telefonoRegex = /^[0-9]*$/; // Solo números
    if (!telefonoRegex.test(value)) {
      setTelefonoError("Por favor, ingresa solo números.");
    } else {
      setTelefonoError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleTelefonoChange = (e) => {
    const value = e.target.value;
    setTelefono(value);
    validateTelefono(value);
  };

  const handleSubmit = () => {
    if (email.trim() && telefono.trim() && !emailError && !telefonoError) {
      if (onSave) {
        onSave({ email, telefono }); // Enviar datos al padre
      }
      if (onContinue) {
        onContinue(); // Llamar a la función onContinue
      }
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    telefono.trim() !== "" &&
    !emailError &&
    !telefonoError;

  return (
    <div className="flex flex-col items-center">
      <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
        <img src={HumanoImg} alt="Humano" className="w-[50px] h-[50px]" />
      </div>
      <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[20px] pb-[15px] px-[20px] w-[300px] lg:w-[450px] text-center">
        ¡El menú especial para {nombre} está casi listo!
      </h2>
      <div className="space-y-4 lg:w-full w-[300px] max-w-md">
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Correo electrónico"
          className="w-full p-2 border rounded-lg font-quicksand outline-none focus:ring-2 focus:ring-primary"
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        <input
          type="tel"
          value={telefono}
          onChange={handleTelefonoChange}
          placeholder="Teléfono"
          className="w-full p-2 border rounded-lg font-quicksand outline-none focus:ring-2 focus:ring-primary"
        />
        {telefonoError && <p className="text-red-500 text-sm">{telefonoError}</p>}
      </div>
      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold mt-[30px] ${
          isFormValid
            ? "bg-[#E66C55] hover:bg-primary hover:text-[#3d3d3d] transition"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        Ver menú de {nombre}
      </button>
      <span className="mb-[30px] text-center p-4 mt-[50px] bg-[#EDF8F8] rounded-[10px] font-quicksand text-[14px] lg:w-[650px] w-[300px]">
        Al continuar, se guardará tu proceso y estarás aceptando recibir las
        mejores recomendaciones sobre la alimentación de {nombre} 🧡
      </span>
    </div>
  );
};

export default Humano;

