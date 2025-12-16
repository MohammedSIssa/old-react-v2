import { ImSpinner10 } from "react-icons/im";

const LoadingEvents = () => {
  return (
    <div className="loading-container flex flex-col items-center justify-center gap-5 py-10">
      <div className="spinner">
        <ImSpinner10 size={50} />
      </div>
    </div>
  );
};

export default LoadingEvents;
