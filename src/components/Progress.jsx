const Progress = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100; 

  return (
    <div className="w-full mb-[50px]">
      <div className="w-full h-[.25rem] bg-gray-200 rounded-lg overflow-hidden">
        <div
          className="h-full bg-[#FFC800] transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;

