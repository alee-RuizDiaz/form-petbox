import React, { useState } from 'react';
import Progress from './Progress';
import questions from '../data/questions';

const Form = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 indica la pantalla inicial
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setCurrentStep(0); // Cambia a la primera pregunta
  };

  const handleChange = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const currentQuestion = questions[currentStep];

return (
    <div className="form-container">
        {currentStep === -1 ? (
            <div>
                <h1 className='font-quicksand font-semibold text-[40px] pb-[15px] text-font'>Arma el plan personalizado para tu peludo</h1>
                <p className='font-quicksand font-normal pb-[25px] text-[18px] text-center text-font'>Completa las preguntas para que podamos recomendar el mejor plan para tu mascota.</p>
                <div className="text-center">
                    <button className="font-quicksand p-[10px] px-[25px] bg-[#E66C55] text-white text-[25px] rounded-[20px] hover:bg-[#FFEB88] hover:text-[#3d3d3d] transition" onClick={handleStart}>
                        Comenzar
                    </button>
                </div>
            </div>
        ) : (
            <div>
                <Progress currentStep={currentStep + 1} totalSteps={questions.length} />
                <form>
                    <label>{currentQuestion.label}</label>
                    {currentQuestion.type === 'select' && (
                        <select
                            required={currentQuestion.required}
                            onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                        >
                            <option value="">Selecciona una opción</option>
                            {currentQuestion.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                    {currentQuestion.type === 'text' && (
                        <input
                            type="text"
                            required={currentQuestion.required}
                            placeholder={currentQuestion.placeholder}
                            maxLength={currentQuestion.validation?.maxLength}
                            onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
                        />
                    )}
                    {currentQuestion.type === 'checkbox' &&
                        currentQuestion.options.map((option, index) => (
                            <div key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={option}
                                        onChange={(e) => handleChange(currentQuestion.id, e.target.checked)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                </form>
                <div className="navigation-buttons">
                    {currentStep > 0 && <button onClick={handlePrevious}>Atrás</button>}
                    {currentStep < questions.length - 1 ? (
                        <button onClick={handleNext}>Siguiente</button>
                    ) : (
                        <button onClick={() => console.log(answers)}>Finalizar</button>
                    )}
                </div>
            </div>
        )}
    </div>
);
};

export default Form;

