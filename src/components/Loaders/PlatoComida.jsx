import { motion } from "framer-motion";
import Plato from '../../assets/img/platocomida.png'

const PlatoComida = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }} // Agregamos la animación de salida
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-white z-50"
    >
      <img src={Plato} alt="Plato de comida" className="w-[250px] h-[250px] object-cover" />
      <p className="mt-2 lg:text-lg text-[15px] font-quicksand text-font">Alimentamos a más de 500 perrhijos 😍</p>
    </motion.div>
  );
};

export default PlatoComida;