import { useRef, useState, useEffect } from "react";
// import ImageLoadingSpinner from "./ImageLoadingSpinner";
import ImageLoadingSpinner from "./Loaders/ImageLoadingSpinner";

import YouTubePlayer from "./YouTubePlayer";

export default function LazyLoadedSliderImage({
  src,
  alt,
  observerRoot = null,
  showImageSrcUnder,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideoShorts = src.startsWith("video:shorts:");
  const isVideoDesktop = src.startsWith("video:desktop:");
  const videoId = src.split(":")[2];
  const isVideo = isVideoDesktop || isVideoShorts;
  const videoType = isVideoDesktop ? "desktop" : isVideoShorts ? "shorts" : "";
  const imgRef = useRef(null);
  const regex = /imgur/i;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: observerRoot, // <– pass your slider container here if needed
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [observerRoot]);

  return (
    <div
      ref={imgRef}
      className="relative flex items-center justify-center overflow-hidden"
      {...props}
    >
      {!isLoaded && !isVideo && <ImageLoadingSpinner />}
      {isVideo && <YouTubePlayer type={videoType} videoId={videoId} />}
      {isVisible && !isVideo && regex.test(src) && src.trim() !== "" && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          className={`rounded-xl transition-opacity duration-700 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      {showImageSrcUnder && <p className="text-center text-slate-400">{src}</p>}
    </div>
  );
}
