import React from "react";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TransactionConfirmation = () => {
  const navigate = useNavigate();
  let latestTrasaction = JSON.parse(
    localStorage.getItem("transactions")
  ).reverse()[0];

  const { amount, details, balance } = latestTrasaction;

  let currentTime = new Date();

  const HandlePaymentConfrim = () => {
    confirm(`User : Recieved ${amount} from ${details.HolderName}`);
    navigate("/");
  };

  return (
    <motion.div
      variants={simpleMotion}
      className="min-h-[80vh] flex flex-col justify-between items-center"
    >
      {/* check mark container with amount info */}
      <div className="flex flex-col justify-center items-center w-full h-[50vh] shadow-md bg-green-500 rounded-b-[200px] hover:rounded-none duration-300 ">
        {/* check mark */}
        <div className="rounded-full bg-blue-600 text-white text-[2.5rem] p-5 shadow-lg ">
          <FaCheck />
        </div>

        <h1 className="text-[3rem] my-2 font-medium hover:scale-110 duration-150 cursor-pointer">
          ₹ {amount}
        </h1>

        <p className=" text-center font-medium text-[0.9rem] hover:scale-110 duration-150 cursor-pointer">
          Recieved from <br />
          {details.HolderName}
        </p>
      </div>

      {/* transaction Info */}
      <motion.div
        variants={simpleMotion}
        className="flex flex-col justify-center items-center w-full p-8 pb-0"
      >
        {/* timings */}
        <p className="w-full text-center font-medium text-[1.1rem]">
          {currentTime.getHours() < 10
            ? `0${currentTime.getHours()}`
            : currentTime.getHours()}{" "}
          :{" "}
          {currentTime.getMinutes() < 10
            ? `0${currentTime.getMinutes()}`
            : currentTime.getMinutes()}
        </p>
        <p className="w-full text-center font-medi um text-[0.9rem]">
          {currentTime.getDate()} {months[currentTime.getMonth()]}{" "}
          {currentTime.getFullYear()}
        </p>

        <motion.button
          onClick={HandlePaymentConfrim}
          className="my-5 w-full bg-blue-500 py-2 rounded-full text-white"
        >
          Done
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TransactionConfirmation;

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const simpleMotion = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
