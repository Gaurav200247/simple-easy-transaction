import React from "react";
import { Route, Routes } from "react-router-dom";
import BankDetailsForm from "./screens/Transaction_Screens/BankDetailsForm";
import TransactionRequest from "./screens/Transaction_Screens/TransactionRequest";
import Home from "./screens/Home";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionConfirmation from "./screens/Transaction_Screens/TransactionConfirmation";
import IFSC_Finder from "./screens/Transaction_Screens/IFSC_Finder";

const App = () => {
  const containerMotion = {
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
    <div className="flex justify-center items-start w-full bg-gradient-to-br from-[#9610ff] to-[#7901ff] min-h-screen">
      {/* toast container */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* main container */}
      <motion.div
        variants={containerMotion}
        initial="hidden"
        animate="visible"
        className="rounded-none sm:rounded-md duration-150 w-full sm:w-[90%] md:w-[75%] lg:w-[50%] min-h-screen sm:min-h-[30vh] my-0 sm:my-[2rem] bg-white overflow-hidden"
      >
        {/* routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bank_details_form" element={<BankDetailsForm />} />
          <Route
            path="/request_transaction"
            element={<TransactionRequest />}
          />
          <Route
            path="/find_ifsc_code"
            element={<IFSC_Finder />}
          />
          <Route
          path="/confirm_transaction"
          element={<TransactionConfirmation />}
        />
        </Routes>
      </motion.div>
    </div>
  );
};

export default App;
