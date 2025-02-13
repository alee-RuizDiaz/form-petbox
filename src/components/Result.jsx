import React, { useEffect, useState } from "react";
import Cerdo from "../assets/img/cerdo.png";
import Carne from "../assets/img/carne.jpg";
import Pescado from "../assets/img/pescado.png";
import Pollo from "../assets/img/pollo.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const API_URL = import.meta.env.VITE_API_URL;

const Result = ({ nombre, racion, datos }) => {
  const [enviado, setEnviado] = useState(false);
  const images = [Cerdo, Carne, Pescado, Pollo];
  const colors = ["#C8EAEA", "#FFEE99", "#EFE7DB", "#FFC9B2"];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleCarouselChange = (index) => {
    setActiveIndex(index);
  };

  const enviarDatos = async (datos) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
        mode: "no-cors",
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      console.log(await response.text());
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

  const enviarWhatsApp = () => {
    const mensaje = encodeURIComponent(
      `¡Hola! Estoy interesado en el plan de comida personalizada para ${nombre}. Me gustaría coordinar el pago y conocer más detalles. Mi plan recomendado por el formulario es de ${racion}g/dia`
    );
    const numeroWhatsApp = "5491135200956";
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
  };

  const preciosRacion = [
    { gramos: 50, precio: 39000 },
    { gramos: 100, precio: 45000 },
    { gramos: 150, precio: 51000 },
    { gramos: 200, precio: 56000 },
    { gramos: 250, precio: 62000 },
    { gramos: 300, precio: 67000 },
    { gramos: 350, precio: 73000 },
    { gramos: 400, precio: 79000 },
    { gramos: 450, precio: 85000 },
    { gramos: 500, precio: 91000 },
    { gramos: 550, precio: 96000 },
    { gramos: 600, precio: 102000 },
    { gramos: 700, precio: 113000 },
    { gramos: 800, precio: 125000 },
    { gramos: 900, precio: 136000 },
    { gramos: 1000, precio: 148000 },
    { gramos: 1100, precio: 159000 },
    { gramos: 1200, precio: 170000 },
    { gramos: 1300, precio: 182000 },
    { gramos: 1400, precio: 193000 },
    { gramos: 1500, precio: 205000 },
    { gramos: 1600, precio: 216000 },
    { gramos: 1700, precio: 227000 },
    { gramos: 1800, precio: 239000 },
    { gramos: 1900, precio: 250000 },
    { gramos: 2000, precio: 262000 },
    { gramos: 2100, precio: 273000 },
    { gramos: 2200, precio: 284000 },
    { gramos: 2300, precio: 296000 },
    { gramos: 2400, precio: 307000 },
    { gramos: 2500, precio: 319000 },
    { gramos: 2600, precio: 330000 },
    { gramos: 2700, precio: 341000 },
  ];

  const precioRacion = (gramos) => {
    const precio = preciosRacion.find((precio) => precio.gramos === gramos);
    return precio ? precio.precio : null;
  };

  const redondearPrecioRacion = (gramos) => {
    const precio = precioRacion(gramos);
    if (precio) return precio;
    const preciosCercanos = preciosRacion.filter((precio) => Math.abs(precio.gramos - gramos) <= 50);
    if (preciosCercanos.length > 0) {
      const precioCercano = preciosCercanos.reduce((prev, curr) => {
        return Math.abs(curr.gramos - gramos) < Math.abs(prev.gramos - gramos) ? curr : prev;
      });
      return precioCercano.precio;
    }
    return null;
  };

  const precio = redondearPrecioRacion(racion);
  const precioFormateado = precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
  const precioFinal = precioFormateado.replace('$', '').replace(',00', '');

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleCarouselChange, 
  };

  return (
    <div className="flex flex-col items-center pb-5 max-w-full overflow-hidden w-[380px] lg:w-full">
      <div 
        className="w-full px-4 flex flex-col items-center py-[50px] transition-colors duration-500" 
        style={{ backgroundColor: colors[activeIndex] || "#C8EAEA" }}
      >
        <h2 className="font-quicksand font-semibold text-font text-center px-4 md:text-3xl lg:text-[40px] pb-4 text-[25px]">
          Estás a punto de cambiar la vida de {nombre}
        </h2>
        <span className="font-quicksand text-font text-center text-sm md:text-base w-full max-w-md">
          El plan de {nombre} está listo! Dale click al botón de WhatsApp y conversemos para coordinar el pago y que empiece a disfrutar su comida personalizada.
        </span>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl pt-5 gap-5">
          <div className="w-full lg:w-[55%] pb-[25px] lg:pb-0">
            <Slider {...settings}>
              {images.map((img, index) => (
                <div key={index}>
                  <img src={img} alt={`image ${index + 1}`} className="h-full w-full object-cover rounded-xl" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full lg:w-1/2 lg:ml-[40px] flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 text-center">
            <span className="bg-yellow-200 text-font font-semibold text-sm px-3 py-1 rounded-full">
              ⭐ RECOMENDADO
            </span>
            <div className="w-full mt-4">
              <div className="text-[25px] font-semibold text-font mb-2 font-quicksand">
                Su plan: <span className="text-font text-[30px] font-bold">{racion}g</span>/día
              </div>
              <div className="w-full h-[0.5px] bg-gray-300"></div>
              <div className="mt-4">
                <div className="text-base font-semibold font-quicksand">Prueba 7 días</div>
                <div className="py-4">
                  <span className="text-lg font-semibold font-quicksand">
                    Precio:
                    <div className="flex justify-center items-center gap-2 pt-3">
                      <button className='px-2 rounded-full bg-[#C8EAEA] text-[#0a7373] font-quicksand font-semibold btn-animation text-[13px] lg:text-[15px]'>🎉 -30 %</button>
                      <span className="font-quicksand text-[#767676] text-[15px] line-through">{(precio * 1.3).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }).replace('$', '').replace(',00', '')} AR$</span>
                      <div className="font-quicksand text-font lg:text-[25px] text-[16]">{precioFinal}<span className="text-lg">AR$</span></div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <button onClick={enviarWhatsApp} className="cursor-pointer mb-[-45px] w-full max-w-xs bg-[#E66C55] text-white font-semibold font-quicksand py-3 rounded-full shadow-md hover:bg-[#d65945] transition">
              Continuar por WhatsApp
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden" style={{background: '#FFEE99'}}>
        <div className="flex animate-scroll-left hover:pause w-full space-x-4">
          {["La mejor decisión que pude hacer por mi perra 🐾", "Estoy muy feliz con ellos. 💖", "Ya no volveremos a la comida deshidratada nunca! 🐶 ", "Ninguna comida lo hace tan feliz. 🍖",
            "Muy contenta con su producto. 🐕‍🦺", "Mi perro ama su comida. 🐶❤️", "Nunca lo vi tan feliz. 🐾✨", "Su pelo brilla más que nunca. 🐕🧼",
            "Adiós problemas digestivos. 🍖✅", "La mejor elección para él. 🏆🐕"].map((text, index) => (
            <div key={index} className="px-4 py-2 text-sm md:text-[14px] whitespace-nowrap ">
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;

