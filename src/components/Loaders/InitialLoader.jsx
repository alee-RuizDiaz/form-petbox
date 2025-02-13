import { ring } from "ldrs";

ring.register()

const InitialLoader = () => {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <l-ring
        size="90"
        stroke="8"
        bg-opacity="0"
        speed="2" 
        color="#C2C2C2" 
        ></l-ring>
      </div>
    );
};
export default InitialLoader