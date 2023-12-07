import React from "react";
import { motion } from "framer-motion";

const PennyCheckLoader = ({ msg }) => {
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col justify-center items-center w-full min-h-[50vh]"
    >
      <span className="loader"></span>
      <p>{msg}</p>
    </motion.div>
  );
};

export default PennyCheckLoader;
