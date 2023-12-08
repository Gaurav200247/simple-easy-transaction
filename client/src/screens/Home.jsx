import React, { useEffect, useState } from "react";
import { BsBank } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { IoMdPhonePortrait } from "react-icons/io";
import { IoScan } from "react-icons/io5";
import { motion } from "framer-motion";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const Home = () => {
  const HomeBtns = [
    {
      icon: <IoScan />,
      title: "Scan & Pay",
      path: "#",
      active: false,
    },
    {
      icon: <BsBank />,
      title: "Bank Transfer",
      path: "/bank_details_form",
      active: true,
    },
    {
      icon: <IoMdPhonePortrait />,
      title: "To Phone Number",
      path: "#",
      active: false,
    },
    {
      icon: <IoIosMore />,
      title: "More",
      path: "#",
      active: false,
    },
  ];

  useEffect(() => {
    let dummyIfsc = localStorage.getItem("dummy_IFSC");
    let beneficiary = localStorage.getItem("beneficiary");

    if (dummyIfsc) {
      localStorage.setItem("dummy_IFSC", "");
    }
    if (beneficiary) {
      localStorage.setItem("beneficiary", "");
    }
  }, []);

  const [Transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions"))?.slice(-5)?.reverse() || []
  );

  return (
    <div className="flex flex-col justify-between items-center w-full h-full sm:min-h-[75vh]">
      {/* balance indicator */}
      <div className="rounded-b-[100%] duration-300 hover:rounded-none flex flex-col justify-center items-center w-full h-[30vh] bg bg-green-400 shadow-md">
        <h1 className="text-[1.3rem]">Current Balance</h1>
        <h2 className="text-[2rem] font-medium w-full hover:scale-110 duration-100 text-center cursor-pointer">
          ₹ {parseInt(localStorage.getItem("balance")) || 0}
        </h2>
      </div>

      {/* payment options */}
      <div className="w-full h-full sm:h-[20vh] grid grid-cols-2 sm:grid-cols-4 gap-5 ">
        {HomeBtns.map((item, index) => {
          return <TransactionButton key={index} {...item} />;
        })}
      </div>

      {/* transaction table */}
      <div className="w-full h-full sm:min-h-[20vh] flex justify-center items-center bg-sky-300 overflow-hidden shadow-md">
        {Transactions?.length > 0 ? (
          <TableContainer component={Paper}>
            <h1 className="w-full py-1 font-semibold text-center border-t-2 bg-purple-100">
              All Transactions
            </h1>
            <Table className="bg-sky-300">
              <TableHead>
                <TableRow>
                  <TableCell>Holder name</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>IFSC code</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Transactions.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {item.details.HolderName}
                    </TableCell>
                    <TableCell align="left">{item.details.AccNo}</TableCell>
                    <TableCell align="left">{item.details.IFSC}</TableCell>
                    <TableCell align="left">{item.amount}</TableCell>
                    <TableCell align="left">{item.balance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>No Transactions Found !!</p>
        )}
      </div>
    </div>
  );
};

export default Home;

export const TransactionButton = ({ icon, title, path, active }) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Link
        to={path}
        className={`w-[9rem] h-[7rem] flex flex-col justify-center items-center ${
          active
            ? "hover:bg-purple-200 cursor-pointer text-blue-800"
            : "hover:bg-slate-200 cursor-not-allowed"
        } font-medium rounded-md  duration-300 hover:shadow-xl text-[0.8rem] sm:text-[0.9rem] p-5 truncate`}
      >
        <p className="text-[2rem] mb-2">{icon}</p>
        {title}
      </Link>
    </div>
  );
};
