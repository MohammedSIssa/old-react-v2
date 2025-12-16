/* eslint-disable no-unused-vars */
import { motion } from "motion/react";

export default function TypingText({
  text,
  wait = 0,
  speed = 0.05,
  className = "",
}) {
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: wait,
        staggerChildren: speed,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.p
      variants={container}
      initial="hidden"
      animate="visible"
      transition={{ delay: wait }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letter}
          transition={{ duration: 0.25 }}
          className={className}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
