import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { motion } from "framer-motion";
import { ErrorMessage, Field } from "formik";

const FormControl = ({ label, name, errors, touched, setFieldValue }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={inputMotion}
      className="w-full my-3"
    >
      <Field
        type="text"
        name={name}
        as={TextField}
        variant="outlined"
        color={touched[name] && errors[name] ? "error" : "primary"}
        fullWidth
        label={label}
        onChange={(e) => {
          if (name === "IFSC") {
            setFieldValue(name, e.target.value.toUpperCase());
          } else {
            setFieldValue(name, e.target.value);
          }
        }}
        required
      />

      {/* validation msg */}
      <ErrorMessage
        name={name}
        render={(msg) => (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={inputMotion}
            className={`flex text-red-500 mb-1 mt-1 w-full text-[0.8rem] font-medium justify-start items-center
           `}
          >
            <MdOutlineReportGmailerrorred className="mx-1" />
            {msg}
          </motion.p>
        )}
      />
    </motion.div>
  );
};

export default FormControl;

export const inputMotion = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export const validationMotion = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
