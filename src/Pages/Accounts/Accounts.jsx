import Navbar from "../../Components/Navbar";
import { tickIcon } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserOrders } from "../../store/OnlineStoreSlice";
import Button from "../../Components/Button/Button";
import { useEffect, useState } from "react";

export default function Accounts() {
  let data = JSON.parse(localStorage.getItem("login"));
  const state = useSelector((state) => state);

  console.log(
    "currentOrders",
    state
  );
  const dispatch = useDispatch();
  const fetchAllOrders = () => {
    dispatch(getCurrentUserOrders())
      .unwrap()
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="h-full px-4 md:px-10 lg:px-20 max-w-[1512px] mx-auto">
      <Navbar />
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-[#024F9D] text-2xl font-semibold mt-5">Settings</h1>
        <img
          src={data?.imageUrl}
          alt="userImage"
          className="h-[100px] w-[100px] rounded-full mt-4  "
        />

        <div className="border-0 border-b-2 border-grey-dark mt-2 flex">
          <input
            type="text"
            placeholder="Update Full Name"
            className="border-none outline-none focus:!outline-none focus:!border-0 flex-1"
          />
          <img src={tickIcon} alt="tickICon" className="cursor-pointer" />
        </div>
      </div>
      <div className="px-4 mt-3">
        <h2 className="text-[#024F9D] text-xl font-bold mt-5">Orders</h2>

        <div className="flex flex-col border-0 p-2 w-[70%] border-b-2 border-grey-dark mt-4">
          <p className="font-bold">Kamran Ahmed Siddiqui</p>
          <div className="flex justify-between text-xs">
            <p>Just now - pending</p>
            <p>03102920744</p>
          </div>
          <p className="text-[#BFBFBF] text-base">2 x Item Name</p>

          <div className="flex justify-between text-lg">
            <p className="font-bold text-base">Total</p>
            <p className="font-bold text-base text-[#61B846]">Rs 900</p>
          </div>
        </div>
      </div>
      <Button className="flex justify-center mt-6 items-center w-[80%] mx-auto  bg-[#61B846] text-lg text-white">
        Logout
      </Button>
    </div>
  );
}
