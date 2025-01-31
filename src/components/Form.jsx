import React, { useState, useEffect } from "react";
import Hembra from "./Hembra";
import SeleccionarRaza from "../components/SelecRaza";
import Perro from "../assets/img/perro.svg";
import Nombre from "../assets/img/nombre.png";
import Edad from "../assets/img/edad.png";
import Macho from "./Macho"; 
import Result from "./Result";

const Form = () => {
  const [currentStep, setCurrentStep] = useState(-1); // Inicia con -1 para la introducción
  const [formData, setFormData] = useState({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [selectedRaza, setSelectedRaza] = useState({raza: "", porcentaje: 0});
  const [totalPorcentaje, setTotalPorcentaje] = useState(0);
  const [porcentajeHembra, setPorcentajeHembra] = useState(0);
  const [comida, setComida] = useState(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [currentStep]: value });
    setIsNextEnabled(value.trim() !== ""); // Habilitar el botón solo si hay texto
  };

  const handleRazaSeleccionada = (raza, porcentaje) => {
    setSelectedRaza({ raza, porcentaje: Number(porcentaje) || 0 });
  };

  const handleOptionSelect = (step, option) => {
    setFormData({ ...formData, [step]: option });
    setIsNextEnabled(true);
  };

  const handleMachoDataChange = (data) => {
    setFormData((prev) => ({
      ...prev,
      macho: { ...prev.macho, ...data },
    }));
  };

  const handleHembraDataChange = (data) => {
    setFormData((prev) => ({
      ...prev,
      hembra: { ...prev.hembra, ...data },
    }));
  };
  

  const handleNext = () => {
    if (currentStep === 3) {
      // Si estamos en Macho o Hembra, avanzar al paso final
      setCurrentStep(4);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
    setIsNextEnabled(false); // Reinicia el estado del botón
  };
  

  const handleRazaSelection = (raza, porcentaje) => {
    setFormData({ ...formData, 0: raza }); // Guardamos la raza en el paso 0
    setTotalPorcentaje(porcentaje); // Actualizamos la puntuación
    handleNext();
  };

  useEffect(() => {
    setTotalPorcentaje(selectedRaza.porcentaje + porcentajeHembra);
  }, [selectedRaza.porcentaje, porcentajeHembra]);

  useEffect(() => {
    if (formData[currentStep]) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [currentStep, formData]);

  //Cuenta
  function redondearRacion(racionDiaria) {
    if (racionDiaria <= 124) {
      return Math.floor(racionDiaria);
    } else if (racionDiaria >= 125 && racionDiaria <= 165) {
      return 150;
    } else if (racionDiaria >= 166 && racionDiaria <= 199) {
      return 200;
    } else {
      const base = Math.floor(racionDiaria / 100) * 100;
      if (racionDiaria <= base + 25) {
        return base;
      } else if (racionDiaria <= base + 65) {
        return base + 50;
      } else {
        return base + 100;
      }
    }
  }

  const porcentaje = totalPorcentaje / 3;
  const promedio = porcentaje * formData.hembra?.peso;
  const ajuste = promedio * 10;

  const racionDiaria = ajuste; // reemplaza con tu valor
  const racionRedondeada = redondearRacion(racionDiaria);

  // Renderizar la introducción
  if (currentStep === -1) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-5">
          <img src={Perro} alt="Perro" className="w-[90px] h-[90px]" />
        </div>
        <h1 className="font-quicksand font-semibold lg:text-[35px] text-[25px] px-[20px] lg:text-start text-center pb-[15px] text-font">
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
    return <SeleccionarRaza onContinue={handleRazaSelection} onRazaSeleccionada={handleRazaSeleccionada} />;
  }
  // Paso de nombre
  if (currentStep === 1) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[80px] h-[80px] lg:w-[80px] lg:h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={Nombre} alt="Perro" className="lg:w-[50px] lg:h-[50px] w-[50px] h-[50px]"/>
        </div>
        <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[20px] pb-[15px]">
          ¿Cómo se llama tu perro?
        </h2>
        <input
          type="text"
          value={formData[1] || ""}
          onChange={handleInputChange}
          placeholder="Mi perrhijo se llama..."
          className="lg:w-[370px] w-[300px] max-w-md p-3 border border-gray-300 rounded-lg text-center placeholder-gray-400"
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
        <span className="p-4 mt-[50px] bg-[#EDF8F8] rounded-[10px] font-quicksand lg:text-[14px] text-center text-[13px] px-[20px] lg:w-[370px] w-[320px]">
          ¡Qué emoción! 🥰 Estás a punto de mejorar la vida de tu {selectedRaza.raza} a través de una alimentación 100% natural.
        </span>
      </div>
    );
  }

  // Paso de selección de género
  if (currentStep === 2) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-6">
          <img src={Edad} alt="Emoji" className="w-[50px] h-[50px]" />
        </div>
        <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[20px] pb-[15px]">
          ¡Queremos conocer a {formData[1]}!
        </h2>
        <div className="flex space-x-4 lg:mt-6 mt-2">
          <button
            className={`px-6 py-3 lg:text-[18px] text-[16px] font-quicksand rounded-full border-2 ${
              formData[2] === "Macho"
                ? "bg-[#fe9] text-[#3d3d3d] border-[#ffc800]"
                : "bg-white text-gray-600 border-gray-300"
            }`}
            onClick={() => handleOptionSelect(2, "Macho")}
          >
            Macho
          </button>
          <button
            className={`px-6 py-3 lg:text-[18px] text-[16px] font-quicksand rounded-full border-2 ${
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

  if (currentStep === 3 && formData[2] === "Hembra") {
    return <Hembra
        nombre={formData[1]} 
        onContinue={() => setCurrentStep(4)} 
        onDataChange={(data) => handleHembraDataChange(data)} 
        onComplete={(puntuacion) => {
          setPorcentajeHembra(puntuacion); // Actualiza el estado porcentajeHembra
          setFormData((prev) => ({ ...prev, hembra: { ...prev.hembra, puntuacion } }));
        }}
        setPorcentajeHembra={setPorcentajeHembra}
        onChangeComida={comida => setComida(comida)}
      />;
  }
  
  // Renderizar componente Macho si se selecciona "Macho"
  if (currentStep === 3 && formData[2] === "Macho") {
    return <Macho
    nombre={formData[1]} 
    onContinue={() => setCurrentStep(4)} 
    onDataChange={(data) => handleHembraDataChange(data)} 
    onComplete={(puntuacion) => {
      setPorcentajeHembra(puntuacion); // Actualiza el estado porcentajeHembra
      setFormData((prev) => ({ ...prev, macho: { ...prev.hembra, puntuacion } }));
    }}
    setPorcentajeHembra={setPorcentajeHembra}
    onChangeComida={comida => setComida(comida)}
  />;
  }

  // Renderizar mensaje final
  if (currentStep === 4) {
    return (

    <Result nombre={formData[1]} racion={racionRedondeada}/>
      
    );
      
      {/*
      <div className="flex flex-col items-center">
        <h2 className="font-quicksand font-semibold text-font text-[25px] pb-[15px]">
          Datos recolectados:
        </h2>
        <span>
          <ul>
            <li>
              Raza: {selectedRaza.raza}
            </li>
            <li>
              Nombre: {formData[1]}
            </li>
            <li>
              Género: {formData[2]}
            </li>
            <li>
              Esterilizada: {formData.macho?.esterilizado}
              <br/>
              Lactante: {formData.macho?.lactanteOGestante}
            </li>
            <li>
              Edad: {formData.macho?.edad}
            </li>
            <li>
              Silueta: {formData.macho?.silueta}
            </li>
            <li>
              Peso: {formData.macho?.peso} Kg
            </li>
            <li>
              Nivel de actividad: {formData.macho?.actividad.label}
            </li>
            <li>
              Patología: {formData.macho?.patologia}
            </li>
            <li>
              Comida: {comida?.label}
            </li>
            <li>
              Email: {formData.macho?.contacto?.email}<br/>
              Celular: {formData.macho?.contacto?.telefono}
            </li>
            <li>
            Porcentaje Raza: {selectedRaza.porcentaje}%<br/>
            Porcentaje Hembra: {porcentajeHembra}%<br/>
            Total porcentaje: {totalPorcentaje}%   
            </li>
            <li>
              Racion diaria: {racionRedondeada} gramos
            </li>

          </ul>
        </span>
      </div>*/}
  }
};

export default Form;
















