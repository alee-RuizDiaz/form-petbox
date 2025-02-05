import React, { useState, useEffect } from "react";
import Hembra from "./Hembra";
import SeleccionarRaza from "../components/SelecRaza";
import Perro from "../assets/img/Perro.svg";
import Nombre from "../assets/img/Nombre.png";
import Edad from "../assets/img/Edad.png";
import Macho from "./Macho"; 
import Result from "./Result";
import Progreso from './Progress';
import PlatoComida from "./Loaders/PlatoComida";
import ResultadoComida from "./Loaders/ResultadoComida";

const Form = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [formData, setFormData] = useState({});
  const [isNextEnabled, setIsNextEnabled] = useState(false);
  const [selectedRaza, setSelectedRaza] = useState({raza: "", porcentaje: 0});
  const [totalPorcentaje, setTotalPorcentaje] = useState(0);
  const [porcentajeHembra, setPorcentajeHembra] = useState(0);
  const [porcentajeMacho, setPorcentajeMacho] = useState(0);
  const [comida, setComida] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
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
    if (currentStep === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(1);
      }, 3500); // Simula una carga de 2 segundos
    }
    else if (currentStep === 3) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep(4);
      }, 6000); // Simula una carga de 3 segundos
    }
    else if (currentStep === 3) {
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
    setTotalPorcentaje(selectedRaza.porcentaje + porcentajeHembra + porcentajeMacho);
  }, [selectedRaza.porcentaje, porcentajeHembra, porcentajeMacho]);

  useEffect(() => {
    if (formData[currentStep]) {
      setIsNextEnabled(true);
    } else {
      setIsNextEnabled(false);
    }
  }, [currentStep, formData]);

  function redondearRacion(racionDiaria) {
    if (racionDiaria <= 124) {
      return Math.floor(racionDiaria);
    } else if (racionDiaria >= 125 && racionDiaria <= 165) {
      return 150;
    } else if (racionDiaria >= 166 && racionDiaria <= 199) {
      return 200;
    } else if (racionDiaria >= 200 && racionDiaria <= 599) {
      if (racionDiaria <= 225) {
        return 200;
      } else if (racionDiaria <= 265) {
        return 250;
      } else if (racionDiaria <= 299) {
        return 300;
      } else if (racionDiaria <= 325) {
        return 300;
      } else if (racionDiaria <= 364) {
        return 350;
      } else if (racionDiaria <= 399) {
        return 400;
      } else if (racionDiaria <= 425) {
        return 400;
      } else if (racionDiaria <= 465) {
        return 450;
      } else if (racionDiaria <= 499) {
        return 500;
      } else if (racionDiaria <= 525) {
        return 500;
      } else if (racionDiaria <= 565) {
        return 550;
      } else if (racionDiaria <= 599) {
        return 600;
      }
    } else {
      let base = Math.floor(racionDiaria / 100) * 100;
      if (racionDiaria > base + 50) {
        base += 100;
      }
      return base;
    }
  }

  const porcentaje = totalPorcentaje / 3;
  const promedio = porcentaje * (formData[2] === "Hembra" ? formData.hembra?.peso : formData.macho?.peso);
  const ajuste = promedio * 10;

  const racionDiaria = ajuste; // reemplaza con tu valor
  const racionRedondeada = redondearRacion(racionDiaria);

  const datosMacho = {
    raza: selectedRaza.raza,
    nombre: formData[1],
    genero: formData[2],
    esterilizada: formData.macho?.esterilizado,
    lactante: formData.macho?.lactanteOGestante,
    edad: formData.macho?.edad,
    silueta: formData.macho?.silueta,
    peso: formData.macho?.peso,
    actividad: formData.macho?.actividad?.label,
    patologia: formData.macho?.patologia,
    comida: comida?.label,
    contacto: {
      email: formData.macho?.contacto?.email,
      telefono: formData.macho?.contacto?.telefono,
    },
  };

  const datosHembra = {
    raza: selectedRaza.raza,
    nombre: formData[1],
    genero: formData[2],
    esterilizada: formData.hembra?.esterilizado,
    lactante: formData.hembra?.lactanteOGestante,
    edad: formData.hembra?.edad,
    silueta: formData.hembra?.silueta,
    peso: formData.hembra?.peso,
    actividad: formData.hembra?.actividad?.label,
    patologia: formData.hembra?.patologia,
    comida: comida?.label,
    contacto: {
      email: formData.hembra?.contacto?.email,
      telefono: formData.hembra?.contacto?.telefono,
    },
  };

  // Renderizar la introducción
  if (currentStep === -1) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-5">
          <img src={Perro} alt="Perro" className="w-[90px] h-[90px]" />
        </div>
        <h1 className="font-quicksand font-semib</div>old lg:text-[35px] text-[25px] px-[20px] lg:text-start text-center pb-[15px] text-font">
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

// Pantalla de carga
if (isLoading) {
  return <PlatoComida/>
}

  // Paso de selección de raza
  if (currentStep === 0) {
    return (
      <div>
        <Progreso currentStep={1} totalSteps={12}/>
        <SeleccionarRaza onContinue={handleRazaSelection} onRazaSeleccionada={handleRazaSeleccionada} />
      </div>
    );
  }

  // Paso de nombre
  if (currentStep === 1) {
    return (
      <div className="flex flex-col items-center">
        <Progreso currentStep={2} totalSteps={12}/>
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
        <div className="text-center mt-[30px]">
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
        <span className="p-4 mt-[30px] mb-[25px] bg-[#EDF8F8] rounded-[10px] font-quicksand lg:text-[14px] text-center text-[13px] px-[20px] lg:w-[370px] w-[320px]">
          ¡Qué emoción! 🥰 Estás a punto de mejorar la vida de tu {selectedRaza.raza} a través de una alimentación 100% natural.
        </span>
      </div>
    );
  }

  // Paso de selección de género
  if (currentStep === 2) {
    return (
      <div className="flex flex-col items-center">
        <Progreso currentStep={3} totalSteps={12}/>
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
    return (
     <div>
      <Hembra
        nombre={formData[1]}
        onContinue={() => setCurrentStep(4)} 
        onDataChange={(data) => handleHembraDataChange(data)} 
        onComplete={(puntuacion) => {
          setPorcentajeHembra(puntuacion); // Actualiza el estado porcentajeHembra
          setFormData((prev) => ({ ...prev, hembra: { ...prev.hembra, puntuacion } }));
        }}
        setPorcentajeHembra={setPorcentajeHembra}
        onChangeComida={comida => setComida(comida)}
      />
     </div>
    )
  }
  
  // Renderizar componente Macho si se selecciona "Macho"
  if (currentStep === 3 && formData[2] === "Macho") {
    return (
      <div>
        <Macho
          nombre={formData[1]}
          onContinue={() => setCurrentStep(4)} 
          onDataChange={(data) => handleMachoDataChange(data)} 
          onComplete={(puntuacion) => {
            setPorcentajeMacho(puntuacion); // Actualiza el estado porcentajeMacho
            setFormData((prev) => ({ ...prev, macho: { ...prev.macho, puntuacion } }));
          }}
          setPorcentajeMacho={setPorcentajeMacho} // Pasar la función como prop
          onChangeComida={comida => setComida(comida)}
        />
      </div>
    )
  }

  // Renderizar mensaje final
  if (currentStep === 4) {
    return (
      <div>
        {isLoading ? (
          <ResultadoComida />
        ) : (
          <Result 
            nombre={formData[1]} 
            racion={racionRedondeada} 
            datos={formData[2] === "Hembra" ? datosHembra : datosMacho} 
          />
        )}
      </div>
    );
  }
}

export default Form;
















