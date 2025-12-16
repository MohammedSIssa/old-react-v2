import { IoStatsChart } from "react-icons/io5";
import { BsCalendar2MinusFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import { FaLock } from "react-icons/fa";

export default function Icon({ iconName }) {
  const mobileSize = 120;
  const desktopSize = 200;
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <span className="md:hidden">
        {iconName === "stats" && (
          <IoStatsChart size={mobileSize} className="opacity-10" />
        )}
        {iconName === "weeks" && (
          <BsCalendar2MinusFill size={mobileSize} className="opacity-10" />
        )}
        {iconName === "goals" && (
          <TbTargetArrow size={mobileSize} className="opacity-10" />
        )}
        {iconName === "special" && (
          <FaLock size={mobileSize} className="opacity-10" />
        )}
      </span>
      <span className="hidden md:block">
        {iconName === "stats" && (
          <IoStatsChart size={desktopSize} className="opacity-10" />
        )}
        {iconName === "weeks" && (
          <BsCalendar2MinusFill size={desktopSize} className="opacity-10" />
        )}
        {iconName === "goals" && (
          <TbTargetArrow size={desktopSize} className="opacity-10" />
        )}
        {iconName === "special" && (
          <FaLock size={desktopSize} className="opacity-10" />
        )}
      </span>
    </div>
  );
}
