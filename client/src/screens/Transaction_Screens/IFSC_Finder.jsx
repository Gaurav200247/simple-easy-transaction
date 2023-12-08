import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { dummyBankData } from "../../dummyData";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from "react-toastify";

const IFSC_Finder = () => {
  const navigate = useNavigate();

  const [BankValue, setBankValue] = useState(null);
  const [BranchValue, setBranchValue] = useState(null);

  const allBanks = dummyBankData.map((item, index) => {
    return item.bank;
  });

  const HandleConfirmIFSC = () => {
    if (BankValue && BranchValue) {
      localStorage.setItem(
        "dummy_IFSC",
        dummyBankData.find((item) => item.bank == BankValue).ifsc
      );
    } else {
      toast.error("Please fill all fields correctly !!");
    }

    navigate("/bank_details_form");
  };

  return (
    <div className="p-5">
      {/* head */}
      <h1 className="w-full text-center pt-5 font-bold text-[1.3rem] relative mb-8">
        {/* back btn */}
        <Link
          className="cursor-pointer absolute top-3 left-5 text-[2rem] bg-gray-100 shadow-sm hover:text-white hover:bg-black rounded-full duration-300 p-2 hover:shadow-md"
          to="/bank_details_form"
        >
          <IoMdArrowRoundBack />
        </Link>
        <span className="underline">Find IFSC code</span>
      </h1>

      {/* bank name */}
      <div className="w-full my-5">
        {/* text */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={allBanks}
          value={BankValue}
          onChange={(e, newValue) => {
            setBankValue(newValue);
            setBranchValue(null);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Enter Bank Name" />
          )}
        />
      </div>

      {BankValue && (
        <div className="w-full my-5">
          {/* text */}
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={
              BankValue
                ? dummyBankData.find((item) => item.bank === BankValue)
                    ?.branch || []
                : []
            }
            value={BranchValue}
            onChange={(e, newValue) => setBranchValue(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Enter Branch Name" />
            )}
          />
        </div>
      )}

      {BranchValue && (
        <div className="w-full flex flex-col justify-between items-center my-10">
          <p className="w-full text-left p-5 mb-5 border-y-2 font-semibold">
            IFSC Code :
            <span className="underline mx-2 font-medium">
              {dummyBankData.find((item) => item.bank == BankValue).ifsc ||
                "N/A"}
            </span>
          </p>

          <button className="custom_btn" onClick={HandleConfirmIFSC}>
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default IFSC_Finder;
