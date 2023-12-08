import React, { useEffect, useState } from "react";
import FormControl from "../../components/FormControl";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import PennyCheckLoader from "../../components/PennyCheckLoader";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as YUP from "yup";

export const FormInputs = [
  {
    name: "AccNo",
    label: "Bank Account Number",
  },

  {
    name: "ReAccNO",
    label: "Re-Enter Bank Account Number",
  },

  {
    name: "IFSC",
    label: "IFSC Code",
  },

  {
    name: "HolderName",
    label: "Holder's Name",
  },
];

const BankDetailsForm = () => {
  const navigate = useNavigate();
  const [PennyCheckLoading, setPennyCheckLoading] = useState(false);

  // yup validation schema
  const validationSchema = YUP.object().shape({
    // account no
    AccNo: YUP.string().required("Please Enter Account Number."),

    // re-account no
    ReAccNO: YUP.string()
      .required("Please Re-enter Account Number.")
      .oneOf([YUP.ref("AccNo"), null], "Account Numbers are not matched."),

    // IFSC code
    IFSC: YUP.string().required("IFSC Code is required."),
    // .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code."),

    // holder name
    HolderName: YUP.string().required("Please Enter Account Holder Name."),
  });

  // form submit handler
  const HandleFormSubmit = async (values, { setSubmitting }) => {
    const { AccNo, IFSC, HolderName } = values;

    // Validate IFSC using API
    try {
      const response = await fetch(`http://localhost:3000/ifsc/${IFSC}`);
      const data = await response.json();

      console.log({ data });

      if (!data || data.Error || data === "Not Found") {
        // IFSC validation failed
        toast.error("Invalid IFSC Code.");
        setSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Error validating IFSC:", error);
      toast.error("Error validating IFSC Code.");
      setSubmitting(false);
      return;
    }

    const beneficiary = {
      AccNo,
      IFSC,
      HolderName,
    };

    setPennyCheckLoading(true);

    setTimeout(() => {
      localStorage.setItem("beneficiary", JSON.stringify(beneficiary));
      navigate("/request_transaction");
      setPennyCheckLoading(false);
      toast.success("Beneficiary Added.");
    }, 5000);
  };

  return !PennyCheckLoading ? (
    <div className="flex flex-col justify-start items-center w-full min-h-[50vh] py-3">
      {/* form header */}
      <h1 className="w-full text-center pt-5 font-bold text-[1.3rem] relative">
        {/* back btn */}
        <Link
          className="cursor-pointer absolute top-2 left-5 text-[2.5rem] hover:text-white hover:bg-black rounded-full duration-300 p-2 hover:shadow-md"
          to="/"
        >
          <IoMdArrowRoundBack />
        </Link>
        Bank Transfer
      </h1>

      {/* formik */}
      <Formik
        initialValues={{
          AccNo: "",
          ReAccNO: "",
          IFSC: localStorage.getItem("dummy_IFSC") || "",
          HolderName: "",
        }}
        validationSchema={validationSchema}
        onSubmit={HandleFormSubmit}
        validateOnChange
      >
        {({ errors, touched, values, setFieldValue, isValid }) => (
          <Form className="w-full flex flex-col justify-between items-start p-5">
            {/* form heading */}
            <h2 className="my-3">Reciever's bank details</h2>

            {/* form inputs */}
            {FormInputs.map((item, index) => {
              return (
                <FormControl
                  key={index}
                  {...item}
                  errors={errors}
                  touched={touched}
                  setFieldValue={setFieldValue}
                />
              );
            })}

            {/* confirm form btn */}
            <motion.button
              disabled={!isValid}
              variants={buttonMotion}
              className={`custom_btn`}
            >
              Confirm
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  ) : (
    <PennyCheckLoader msg="Checking Account Information...." />
  );
};

export default BankDetailsForm;

export const buttonMotion = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
