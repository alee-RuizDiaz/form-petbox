import Croqueta from '../assets/img/croqueta.png'

const Progress = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100; // Calcula el progreso en porcentaje

  return (
    <div className="w-full mb-[30px] relative">
      <div className="lg:w-full h-2 bg-gray-200 rounded-lg overflow-hidden w-[350px]">
        <div
          className="h-full bg-secondary transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="relative transform -translate-y-[42px] -translate-x-[35px]" style={{ left: `${progress}%`, maxWidth: '50px' }}>
        <img src={Croqueta} alt="Croqueta" className="w-22 h-20  object-cover" />
      </div>
      <p className="text-center text-lg font-semibold font-quicksand pt-2 mt-[-60px]">
        {currentStep} de {totalSteps}
      </p>
    </div>
  );
};

export default Progress;
