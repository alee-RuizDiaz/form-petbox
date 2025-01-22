import React, { useState } from 'react';
import Progress from './Progress';
import questions from '../data/questions';
import Nombre from '../assets/img/Nombre.png';
import Cumple from '../assets/img/Edad.png';
import Perro from '../assets/img/Perro.svg';
import Peso from '../assets/img/Peso.png';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 indica la pantalla inicial
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setCurrentStep(0);
  };

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleNext = () => {
    if (isAnswerValid()) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1); 
  };

  const currentQuestion = questions[currentStep];

  const isAnswerValid = () => {
    const answer = answers[currentQuestion?.id];
    if (currentQuestion?.required) {
      if (currentQuestion.type === 'checkbox') {
        return Array.isArray(answer) && answer.length > 0;
      }
      return answer && answer.toString().trim() !== '';
    }
    return true;
  };

  const handleOptionSelect = (option, event) => {
    event.preventDefault(); 
    handleChange(currentQuestion.id, option); 
    handleNext(); 
  };

  return (
    <div>
      <div className="pb-[50px]">
        {currentStep >= 0 && (
          <Progress currentStep={currentStep + 1} totalSteps={questions.length} />
        )}
      </div>
      {currentStep === -1 ? (
        <div className="flex flex-col items-center">
          <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-[100%] flex items-center justify-center mb-5">
            <img src={Perro} alt="Perro" className="w-[90px] h-[90px]" />
          </div>
          <h1 className="font-quicksand font-semibold text-[35px] pb-[15px] text-font">
            Arma el plan personalizado para tu Perro
          </h1>
          <p className="font-quicksand font-normal pb-[25px] text-[16px] text-center text-font">
            Completa las preguntas para que podamos recomendar el mejor plan para tu mascota.
          </p>
          <div className="text-center">
            <button
              className="font-quicksand p-[10px] px-[25px] bg-[#E66C55] text-white text-[20px] rounded-[20px] hover:bg-[#FFEB88] hover:text-[#3d3d3d] transition"
              onClick={handleStart}
            >
              Comenzar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <form className="w-[400px]">
            <div className={`${currentStep === 0 ? '' : 'bg-white'}`}>
              <div className="flex flex-col items-center justify-center">
                {currentStep === 0 && (
                  <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-[100%] flex items-center justify-center mb-5">
                    <img src={Nombre} alt="Perro" className="w-[45px] h-[45px]" />
                  </div>
                )}
                {currentStep === 1 && (
                  <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-[100%] flex items-center justify-center mb-5">
                    <img src={Cumple} alt="Edad del perro" className="w-[45px] h-[45px]" />
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="w-[80px] h-[80px] bg-[#edf8f8] rounded-[100%] flex items-center justify-center mb-5">
                    <img src={Peso} alt="Peso del perro" className="w-[90px] h-[90px]" />
                  </div>
                )}
              </div>
              <label className="block font-quicksand font-regular text-[30px] pb-[15px] text-font text-center">
                {currentQuestion.label}
              </label>

              {currentQuestion.type === 'select' && (
                <div className="flex flex-col mt-2">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleOptionSelect(option, e)}
                      className="font-quicksand mb-2 p-2 text-left bg-gray-200 rounded-md hover:bg-primary focus:outline-none transition"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'text' && (
                <input
                  type="text"
                  required={currentQuestion.required}
                  placeholder={currentQuestion.placeholder}
                  maxLength={currentQuestion.validation?.maxLength}
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                  className="block w-full mt-2 p-2 border rounded-md"
                />
              )}

              {currentQuestion.type === 'number' && (
                <input
                  type="number"
                  required={currentQuestion.required}
                  placeholder={currentQuestion.placeholder}
                  maxLength={currentQuestion.validation?.maxLength}
                  onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                  className="block w-full mt-2 p-2 border rounded-md"
                />
              )}

              {currentQuestion.type === 'checkbox' &&
                currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      value={option}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const currentAnswers = answers[currentQuestion.id] || [];
                        handleChange(
                          currentQuestion.id,
                          checked
                            ? [...currentAnswers, option]
                            : currentAnswers.filter((o) => o !== option)
                        );
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">{option}</label>
                  </div>
                ))}
            </div>
          </form>
          <div className="navigation-buttons flex justify-between mt-4 w-[400px]">
            {currentStep > 0 && (
                <button
                className="font-quicksand p-[10px] px-[25px] bg-gray-200 rounded-[20px] hover:bg-gray-300 transition"
                onClick={handlePrevious}
                >
                Atrás
                </button>
            )}
            {currentStep < questions.length - 1 && currentQuestion.type !== 'select' && (
                <button
                className={`font-quicksand p-[10px] px-[25px] rounded-[20px] transition ${
                    isAnswerValid()
                    ? 'bg-[#E66C55] text-white hover:bg-[#FFEB88] hover:text-[#3d3d3d]'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleNext}
                disabled={!isAnswerValid()}
                >
                Siguiente
                </button>
            )}
            {currentStep === questions.length - 1 && (
                <button
                className="p-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                onClick={() => console.log(answers)}
                >
                Finalizar
                </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;







