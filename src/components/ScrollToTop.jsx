import { FaArrowAltCircleUp } from "react-icons/fa";

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="flex w-full items-center justify-center border-0 border-t-3 border-dashed py-5 pb-20 md:pb-5"
      style={{ borderColor: "var(--story-bg-color)" }}
    >
      <button
        onClick={scrollToTop}
        className="h-fit w-fit rounded-full p-3 text-white shadow-lg transition hover:cursor-pointer hover:brightness-125"
        aria-label="Scroll to top"
        style={{ backgroundColor: "var(--story-border-color)" }}
      >
        <FaArrowAltCircleUp size={20} />
      </button>
    </div>
  );
};

export default ScrollToTopButton;
