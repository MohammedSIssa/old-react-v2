/* eslint-disable no-unused-vars */
import WaveHand from "../WaveHand";
import Book from "../Book";
import { NavLink } from "react-router-dom";

import { motion } from "motion/react";
import TypingText from "./TypingText";

const takenOutClassNames =
  "relative bg-linear-to-br from-[#120b26] via-[#130d33] to-[#320e41]";

const Homepage = () => {
  return (
    <div className="relative flex h-screen min-h-[300px] flex-col items-center justify-center bg-linear-to-br from-[#120b26] via-[#130d33] to-[#320e41] p-10 pb-20 text-center [&_p]:mb-2 [&_p]:max-w-[600px] [&_p]:text-sm [&_p]:font-bold [&_p]:md:text-lg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.17),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.15),transparent_65%)]"></div>
      <div className="flex w-[170px] text-right">
        <TypingText
          text={"مرحبا،"}
          className="text-2xl text-yellow-300"
          speed={0.08}
        />
      </div>

      <div className="mb-10">
        <motion.div
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 2, delay: 0.75, type: "spring", damping: 12 }}
        >
          <span className="md:hidden">
            <WaveHand size="140px" />
          </span>
          <span className="hidden md:block">
            <WaveHand size="180px" />
          </span>
        </motion.div>
      </div>
      <div className="flex flex-row-reverse">
        <TypingText
          text=" أنا محمد وهذا مكاني الخاص لتوثيق رحلتي"
          wait={2}
          speed={0.05}
          className={"text-xl font-bold"}
        />
      </div>
      <div className="flex flex-row-reverse items-center justify-center">
        <TypingText
          text={
            " هنا بتلاقي يومياتي، أهدافي، بالإضافة لصفحات بتقيس تقدمي بمختلف المهارات"
          }
          speed={0.035}
          className={"text-xl font-bold"}
          wait={4.5}
        />
      </div>
      <motion.div
        initial={{ scale: 0, rotate: 40 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 7.75, type: "spring", damping: 12 }}
        className="book mt-10"
      >
        <NavLink to="/weeks">
          <Book size="100px" />
        </NavLink>
      </motion.div>
    </div>
  );
};

export default Homepage;
