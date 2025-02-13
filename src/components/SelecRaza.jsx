import React, { useState } from "react";
import PerroIcon from "../assets/img/lupa.png";

const SeleccionarRaza = ({ onContinue, onRazaSeleccionada }) => {
  const [raza, setRaza] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Controla si el menú está abierto
  const [searchTerm, setSearchTerm] = useState(""); // Controla el término de búsqueda
  const [porcentaje, setPorcentaje] = useState(0);


  const options = [
    "Mestizo",
    { category: "Perros mini", breeds: [
      "Chihuahua",
      "Pomerania",
      "Yorkshire Terrier",
      "Papillón",
      "Miniature Pinscher",
      "Bichón Frisé",
      "Affenpinscher",
      "Maltés",
      "Caniche Toy",
    ].sort() },
    { category: "Perros pequeños", breeds: [
      "Shih Tzu",
      "Dachshund Mini",
      "Cavalier King Charles",
      "Schnauzer Miniatura",
      "Pug",
      "Boston Terrier",
      "Fox Terrier",
      "Jack Russell Terrier",
      "Lhasa Apso",
      "West Highland White",
      "Havanese",
      "Cairn Terrier",
      "Caniche",
    ].sort() },
    { category: "Perros medianos", breeds: [
      "Beagle",
      "Bulldog Francés",
      "Cocker Spaniel",
      "Border Collie",
      "Australian Shepherd",
      "Basset Hound",
      "Shar Pei",
      "Staffordshire Terrier",
      "Whippet",
      "Perro de Agua Español",
      "Springer Spaniel",
      "American Bully",
      "Shetland Sheepdog",
      "Lagotto Romagnolo",
      "Alaskan Klee Kai",
      "Shiba Inu",
      "Keeshond",
      "Caniche Estándar",
    ].sort() },
    { category: "Perros grandes", breeds: [
      "Golden Retriever",
      "Labrador Retriever",
      "Boxer",
      "Pastor Alemán",
      "Doberman",
      "Husky Siberiano",
      "Dálmata",
      "Weimaraner",
      "Akita Inu",
      "Rhodesian Ridgeback",
      "Setter Irlandés",
      "Collie",
      "Samoyedo",
      "Flat-Coated Retriever",
    ].sort() },
    { category: "Perros gigantes", breeds: [
      "Rottweiler",
      "Gran Danés",
      "Mastín Español",
      "San Bernardo",
      "Leonberger",
      "Terranova",
      "Akita Americano",
      "Mastín Napolitano",
      "Dogo Alemán",
    ].sort() },
  ];
  
  // Filtrar opciones basado en el término de búsqueda
  const filteredOptions = options.map((option) => {
    if (typeof option === "string") {
      return option.toLowerCase().includes(searchTerm.toLowerCase()) ? option : null;
    } else {
      const filteredBreeds = option.breeds.filter((breed) =>
        breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return filteredBreeds.length > 0
        ? { ...option, breeds: filteredBreeds }
        : null;
    }
  }).filter(Boolean);

  const handleSelect = (value) => {
    setRaza(value);
    setIsOpen(false);
    setSearchTerm("");
    
    // Verificar si la raza pertenece a "Perros mini"
    const esMini = options.find(
      (option) => option.category === "Perros mini" && option.breeds.includes(value)
    );
    
    const porcentajeSeleccionado = esMini ? 5 : 0;
    setPorcentaje(porcentajeSeleccionado);
    
    // Pasar la raza y el porcentaje al padre
    onRazaSeleccionada(value, porcentajeSeleccionado);
  };
  
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-[80px] h-[80px] lg:w-[80px] lg:h-[80px] bg-[#edf8f8] rounded-full flex items-center justify-center mb-5">
        <img src={PerroIcon} alt="Lupa" className="lg:w-[50px] lg:h-[50px] w-[50px] h-[50px]" />
      </div>
      <h2 className="font-quicksand font-semibold text-font lg:text-[25px] text-[20px] pb-[15px]">
        ¿Cuál es la raza de tu perro?
      </h2>
      <div className="relative lg:w-[370px] w-[300px]">
        <button
          className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 text-[16px] bg-white focus:outline-none focus:ring-2 focus:ring-[#E66C55]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {raza || "Selecciona una raza 🐶"}
        </button>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            {/* Campo de búsqueda */}
            <input
              type="text"
              placeholder="Buscar raza..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#E66C55]"
            />
            <ul className="max-h-[300px] overflow-y-auto">
              {filteredOptions.map((option, index) =>
                typeof option === "string" ? (
                  <li
                    key={index}
                    className="p-3 text-[16px] font-quicksand text-font hover:bg-[#edf8f8] hover:text-secondary cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </li>
                ) : (
                  <React.Fragment key={index}>
                    <li className="p-3 text-sm font-semibold text-gray-500">
                      {option.category}
                    </li>
                    {option.breeds.map((breed, breedIndex) => (
                      <li
                        key={breedIndex}
                        className="p-3 text-[16px] font-quicksand text-font hover:bg-[#edf8f8] hover:text-secondary cursor-pointer"
                        onClick={() => handleSelect(breed)}
                      >
                        {breed}
                      </li>
                    ))}
                  </React.Fragment>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      <button
        className={`font-quicksand p-[10px] px-[25px] text-white text-[20px] rounded-[20px] font-semibold mt-[50px] ${
          raza
            ? "bg-[#E66C55] text-white hover:bg-primary hover:text-[#3d3d3d] transition"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!raza}
        onClick={() => onContinue(raza, porcentaje)}
      >
        Continuar
      </button>
    </div>
  );
};

export default SeleccionarRaza;



