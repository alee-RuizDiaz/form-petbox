import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Cocinero from '../../assets/img/cocinero.png'

const ResultadoComida = () => {
  const [mensajeActual, setMensajeActual] = useState(0);
  const mensajes = [
    "Mezclando ingredientes naturales",
    "¡Cocinando algo rico!",
    "Marchando su menú perfecto"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setMensajeActual((prevMensaje) => {
        if (prevMensaje >= mensajes.length - 1) {
          return 0;
        }
        return prevMensaje + 1;
      });
    }, 2000); // Cambia el mensaje cada 3 segundos
    return () => clearInterval(timer);
  }, [mensajes.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-white z-50"
    >
      <img src={Cocinero} alt="Plato de comida" className="w-[220px] h-[220px] object-cover" />
      <div>
        <motion.p
          key={mensajeActual} // Agrega una clave única para que framer-motion anime el cambio de mensaje
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mt-2 lg:text-lg text-[15px] font-quicksand text-font"
        >
          {mensajes[mensajeActual]}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ResultadoComida;