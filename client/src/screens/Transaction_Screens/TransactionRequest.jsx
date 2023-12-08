import React, { useEffect, useState } from "react";
import { buttonMotion } from "./BankDetailsForm";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { inputMotion } from "../../components/FormControl";
import { Link, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import PennyCheckLoader from "../../components/PennyCheckLoader";
import { IoMdArrowRoundBack } from "react-icons/io";

const TransactionRequest = () => {
  const navigate = useNavigate();
  const [TransactionLoading, setTransactionLoading] = useState(false);
  const [IFSCdata, setIFSCdata] = useState(null);

  const details = JSON.parse(localStorage.getItem("beneficiary"));

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:3000/ifsc/${details.IFSC}`
      );
      const data = await response.json();

      if (!data || data.Error || data === "Not Found") {
        // IFSC validation failed
        toast.error("Invalid IFSC Code.");
        navigate("/");
      } else {
        setIFSCdata(data);
      }
    };
    getData();
  }, []);

  console.log({ IFSCdata });

  if (!details.AccNo) {
    toast.error("Something went wrong !!");
    navigate("/");
  }

  const [isRecieved, setisRecieved] = useState(false);
  const [amount, setAmount] = useState("");

  const HandlePennyRequest = () => {
    let val = confirm("User : Request for ₹ 1 from Uber.");
    setTransactionLoading(true);

    setTimeout(() => {
      setTransactionLoading(false);
    }, 5000);

    if (!val) {
      setTransactionLoading(false);
      toast.error("Request Failed !! Try again");
      setisRecieved(false);
    } else {
      setTransactionLoading(true);

      setTimeout(() => {
        setTransactionLoading(false);

        toast.success("Recieved ₹ 1");
        setisRecieved(true);
        // add 1 to balance
        let balance = localStorage.getItem("balance");
        let transactions =
          JSON.parse(localStorage.getItem("transactions")) || [];
        console.log({ transactions });

        if (balance) {
          balance = parseInt(balance) + 1;
          localStorage.setItem("balance", balance);
        } else {
          localStorage.setItem("balance", 1);
        }

        transactions.push({ details, amount: 1, balance });

        localStorage.setItem("transactions", JSON.stringify(transactions));
      }, 5000);
    }
  };

  const HandlePaymentRequest = () => {
    if (amount == 0) {
      toast.error("Please Enter Amount !!");
      return;
    }

    let val = confirm(`User : Request for ₹ ${amount} from Uber.`);

    if (!val) {
      setTransactionLoading(false);
      toast.error("Request Failed !! Try again");
      setisRecieved(false);
    } else {
      setTransactionLoading(true);

      setTimeout(() => {
        setTransactionLoading(false);

        toast.success(`Recieved ₹ ${amount}`);
        setisRecieved(true);

        // set new balance
        let balance = localStorage.getItem("balance");
        let transactions = JSON.parse(localStorage.getItem("transactions"));
        console.log({ transactions });

        balance = parseInt(balance) + parseInt(amount);
        localStorage.setItem("balance", balance);

        transactions.push({ details, amount, balance });
        localStorage.setItem("transactions", JSON.stringify(transactions));

        navigate("/confirm_transaction");
      }, 5000);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-[40vh] py-5">
      <h1 className="w-full text-center pt-5 font-bold text-[1.3rem] relative">
        {/* back btn */}
        <Link
          className="cursor-pointer absolute top-2 left-5 text-[2.5rem] hover:text-white hover:bg-black rounded-full duration-300 p-2 hover:shadow-md"
          to={TransactionLoading ? "#" : "/"}
        >
          <IoMdArrowRoundBack />
        </Link>
        <span className="underline">Beneficiary Details</span>
      </h1>

      <div className="w-full flex flex-col justify-between items-center px-5">
        {/* details */}
        {!TransactionLoading ? (
          <div className="holder_details-container w-full flex flex-col justify-between items-start p-5 mt-5 border-y-2">
            <p>
              <span className="font-bold">Holder Name</span> :{" "}
              {details.HolderName}
            </p>
            <p>
              <span className="font-bold">Account No.</span> : {details.AccNo}
            </p>
            <p>
              <span className="font-bold">Bank</span> :{" "}
              {IFSCdata?.BANK || "N/A"}
            </p>
            <p>
              <span className="font-bold">Address</span> :{" "}
              {IFSCdata?.ADDRESS || "N/A"}
            </p>
            <p>
              <span className="font-bold">Branch</span> :{" "}
              {IFSCdata?.BRANCH || "N/A"}
            </p>
          </div>
        ) : (
          <PennyCheckLoader
            msg={`waiting for ${details.HolderName} confirmation, Please wait !!`}
          />
        )}

        {!isRecieved ? (
          <motion.button
            disabled={TransactionLoading}
            variants={buttonMotion}
            className={`custom_btn`}
            onClick={HandlePennyRequest}
          >
            {TransactionLoading ? "Requesting" : "Request"} ₹ 1
          </motion.button>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={inputMotion}
            className="w-full my-3"
          >
            {/* text */}
            <TextField
              variant="outlined"
              color="primary"
              label="Enter Amount"
              type="number"
              fullWidth
              disabled={TransactionLoading}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <motion.button
              disabled={TransactionLoading}
              variants={buttonMotion}
              className={`custom_btn`}
              onClick={HandlePaymentRequest}
            >
              {TransactionLoading ? "Requesting" : "Request"} ₹ {amount || 0}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TransactionRequest;
