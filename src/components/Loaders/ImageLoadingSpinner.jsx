import { ImSpinner10 } from "react-icons/im";

const ImageLoadingSpinner = () => {
  return (
    <div className="loading-container flex h-fit items-center justify-center">
      <div className="spinner">
        <ImSpinner10 size={50} />
      </div>
    </div>
  );
};

export default ImageLoadingSpinner;
