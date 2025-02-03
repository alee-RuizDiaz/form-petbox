import React, {useEffect, useState} from "react";
import Cerdo from "../assets/img/cerdo.png";
import Carne from "../assets/img/carne.jpg";
import Pescado from "../assets/img/pescado.png";
import Pollo from "../assets/img/pollo.jpg";
import { Carousel } from "@material-tailwind/react";
const API_URL = import.meta.env.VITE_API_URL;

const Result = ({ nombre, racion, datos }) => {

    const [enviado, setEnviado] = useState(false);

    const enviarDatos = async (datos) => {
        if (!datos || Object.keys(datos).length === 0) {
          console.error("Los datos están vacíos, no se enviarán.");
          return;
        }
      
        try {
          const response = await fetch("https://script.google.com/macros/s/AKfycbz_VXLtfWGeJsE0fM0RwvRdMPtH1i-vtzkRGhN1kXuKcVhXaZwQBQcTDHDC3L3-V-MQDw/exec", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
          });
      
          if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
          }
      
          const respuestaTexto = await response.text();
          console.log("Respuesta del servidor:", respuestaTexto);
      
        } catch (error) {
          console.error("Error al enviar los datos:", error);
        }
    };

    useEffect(() => {
        if (datos && !enviado) {
          enviarDatos(datos);
          setEnviado(true);
        }
      }, [datos, enviado]);
    
    return (
        <div className="flex flex-col items-center pb-5">
            <h2 className="font-quicksand font-semibold text-font lg:text-[40px] text-[25px] pb-[15px] text-center px-[25px]">
                Estás a punto de cambiar la vida de {nombre}
            </h2>
            <span className="font-quicksand font-semibold text-font lg:text-[16px] text-[14px] pb-[15px] text-center lg:w-[40%] w-[320px]">
            El plan de {nombre} está listo! Dale click al botón de WhatsApp y conversemos para coordinar el pago y que empiece a disfrutar su comida personalizada.
            </span>
            <div className="flex justify-between items-center pb-5 w-[350px] md:w-[420px] lg:w-[1100px] flex-wrap pt-5">
                <div className="w-full lg:w-[50%]">
                <Carousel className="rounded-xl">
                    <img
                        src={Cerdo}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src={Carne}
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src={Pescado}
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src={Pollo}
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                </Carousel>
                </div>
                <div className="relative w-full mt-[60px] h-[250px] lg:w-[40%] flex flex-col justify-between items-center bg-[#FBF8E9] rounded-[20px] shadow-md p-6 text-center">
                    <span className="absolute top-[-20px] bg-yellow-200 text-font font-semibold text-[16px] px-3 py-1 rounded-full">
                        ⭐ RECOMENDADO
                    </span>
                    <div className="w-full mt-6">
                        <div className="text-[25px] font-semibold text-font mb-1 font-quicksand">
                            Su plan: <span className="text-font text-[35px]">{racion}g</span>/día
                        </div>
                        <div className="w-full h-[1px] bg-[#e8e8e8]"></div>
                        <div className="mt-4 w-full">
                            <div className="text-[16px] font-quicksand text-font font-semibold">Prueba 15 días</div>
                        </div>
                        <div className="inline-flex mt-2 justify-center items-center text-green-600 font-semibold text-sm bg-green-100 px-3 py-1 rounded-full mb-3">
                            -30 % <span className="ml-2">🐾</span>
                        </div>
                    </div>
                    <button className="absolute bottom-[-20px] bg-[#E66C55] text-white font-semibold font-quicksand py-3 px-5 rounded-[50px] shadow-md hover:bg-[#d65945] transition">
                        Continuar por WhatsApp
                    </button>
                </div>
            </div>
            <div className="overflow-hidden lg:w-full w-[350px] relative pt-[50px]">
                <div
                    className="flex animate-scroll-left hover:pause"
                    style={{ animation: "scroll-left 30s linear infinite" }}
                >
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        "La mejor decisión que pude hacer por mi perra 🐾"
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        "Estoy muy feliz con ellos. 💖"
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        "Ya no volveremos a la comida deshidratada nunca! 🐶"
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        "Ninguna comida lo hace tan feliz. 🍖"
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        "Muy contenta con su producto. 🐕‍🦺"
                    </div>
                </div>
            </div>
            <div className="overflow-hidden whitespace-nowrap lg:w-full w-[350px] relative pt-2 pb-[50px]">
                <div
                    className="flex animate-scroll-right hover:pause"
                    style={{ animation: "scroll-right 30s linear infinite" }}
                >
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        Mi perro nunca fue tan feliz. 🐕
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        La calidad de este producto es excelente. 👌
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        Mi perro ama cada comida. 😋
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        Estoy encantada con cómo le sienta a mi perro. 💖
                    </div>
                    <div className="flex-shrink-0 px-2 py-4 mx-2 bg-gray-100 rounded-lg shadow lg:text-[15px] text-[13px] font-quicksand">
                        Un producto increíble, ¡gracias! 🐾
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Result;

