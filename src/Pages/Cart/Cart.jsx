import { useSelector, useDispatch } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
import Navbar from "../../Components/Navbar";
import Button from "../../Components/Button/Button";
import { useState, useEffect, useRef } from "react";
import { createOrder } from "../../store/OnlineStoreSlice";
import { serverTimestamp } from "firebase/firestore";
import { ToastContainer } from "react-toastify";

import {
  increaseQuantity,
  decreaseQuantity,
} from "../../store/OnlineStoreSlice";

export const Cart = () => {
  let data = JSON.parse(localStorage.getItem("login"));
  const [total, setTotal] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const addressRef = useRef("");

  useEffect(() => {
    setTotal(
      state?.OnlineStoreSlice?.dataList.cart.reduce(
        (acc, curr) => acc + curr.unitPrice * curr.quantity,
        0
      )
    );
  }, [state?.OnlineStoreSlice?.dataList.cart]);

  const createNewOrder = () => {
    if (
      nameRef.current.value === "" ||
      emailRef.current.value === "" ||
      phoneRef.current.value === "" ||
      addressRef.current.value === ""
    ) {
      return alert("please fill data correctly");
    } else {
      const orderID = new Date().getTime();
      const order = {
        orderId: orderID,
        name: nameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        address: addressRef.current.value,
        userId: data?.uid,
        createdOn: serverTimestamp(),
        total,
        item: state?.OnlineStoreSlice?.dataList.cart,
      };

      dispatch(createOrder(order));
      nameRef.current.value = "";
      emailRef.current.value = "";
      phoneRef.current.value = "";
      addressRef.current.value = "";
    }
  };

  return (
    <div className="h-full px-4 md:px-10 lg:px-20 max-w-[1512px] mx-auto">
      <Navbar />
      <div className="flex justify-end my-3 pr-5">
        <img
          src={data?.imageUrl}
          alt="userProfile"
          className="h-[60px] w-[60px] rounded-full"
        />
      </div>
      <div className="flex justify-around items-center mt-2">
        <div>
          <h1 className="text-[#024F9D] text-lg">Shopping</h1>
          <h2 className="text-[#61B846] font-bold text-xl">Cart</h2>
        </div>
        <AiTwotoneDelete className="text-2xl cursor-pointer text-[#61B846]" />
      </div>

      {state?.OnlineStoreSlice?.dataList.cart.length === 0 ? (
        <div className="text-center text-[#61B846] text-3xl font-bold">
          No Items in your cart
        </div>
      ) : (
        state?.OnlineStoreSlice?.dataList.cart.map((item, index) => {
          return (
            <div
              className="mt-10 flex justify-around items-center border-2 rounded-lg py-1 max-h-[150px]"
              key={index}
            >
              <div className="flex gap-5 justify-around items-center">
                <img
                  src={item.imageUrl}
                  alt="productImage"
                  className="max-w-[100px] max-h-[100px] mx-auto object-cover"
                />
                <p className="font-bold text-xs sm:text-base lg:text-lg">
                  {item.ProductName}
                </p>
                <p className="flex gap-3 font-bold text-lg md:text-2xl">
                  <span
                    className="font-bold cursor-pointer"
                    onClick={() =>
                      dispatch(
                        decreaseQuantity({
                          id: item.id,
                          quantity: item.quantity,
                        })
                      )
                    }
                  >
                    -
                  </span>
                  <span className="bg-gray-200 py-1 w-[20px] flex justify-center items-center">
                    {item.quantity}
                  </span>
                  <span
                    className="font-bold cursor-pointer"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                  >
                    +
                  </span>
                </p>
              </div>
              <p className="font-bold text-xs sm:text-base md:text-lg">
                RS {item.unitPrice}
              </p>
            </div>
          );
        })
      )}

      <div className="mt-5 flex justify-around">
        <p className="text-base font-bold">Total</p>{" "}
        <p className="text-base text-[#61B846] font-bold">
          Rs {total && total}
        </p>
      </div>

      <div className="flex flex-col gap-5 mt-5  p-4">
        <input
          type="text"
          placeholder="Enter Your Name"
          className="border-0 border-b-2 border-grey-dark"
          ref={nameRef}
        />
        <input
          type="email"
          placeholder="Enter Your Email"
          className="border-0 border-b-2 border-grey-dark"
          ref={emailRef}
        />
        <input
          type="number"
          placeholder="Enter Your Number"
          className="border-0 border-b-2 border-grey-dark"
          ref={phoneRef}
        />
        <textarea
          placeholder="Enter Shipping Address"
          className="border-0 border-b-2 border-grey-dark"
          ref={addressRef}
        />
        <Button
          className="flex justify-center   items-center !p-0 bg-[#61B846] text-lg text-white"
          onClick={() => createNewOrder()}
        >
          Place Order
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};
