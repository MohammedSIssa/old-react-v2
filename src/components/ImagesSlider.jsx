import { useRef } from "react";
import LazyLoadedSliderImage from "./LazyLoadedSliderImage";

export default function ImagesSlider({ images, showImageSrcUnder = false }) {
  const sliderRef = useRef(null);
  return (
    <div
      ref={sliderRef}
      className="slider flex h-fit w-full space-x-5 overflow-x-auto overflow-y-hidden rounded-xl p-5"
    >
      {images.map((image, idx) => (
        <LazyLoadedSliderImage
          showImageSrcUnder={showImageSrcUnder}
          key={idx}
          src={image}
          className={"max-w-full shrink-0 snap-start rounded-lg"}
          observerRoot={sliderRef.current}
        />
      ))}
    </div>
  );
}
