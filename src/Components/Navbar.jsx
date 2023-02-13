import { SaylaniLogo } from "../assets";
import { NavLink } from "react-router-dom";

import {
  AiOutlineAlignLeft,
  AiOutlineClose,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="flex w-full justify-around h-20  items-center shadow-lg lg:justify-start  relative ">
      <div className="pl-0 lg:pl-[3rem]">
        <img src={SaylaniLogo} alt="logo" className="h-10 w-full" />
      </div>
      <ul className="justify-evenly items-center cursor-pointer text-[14px] text-[#000000d9] hidden lg:flex lg:flex-1">
        <li className="hover:text-[#0d6db7] ease-in-out">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-[#0d6db7] ease-in-out">
          <NavLink to="/">Media</NavLink>
        </li>
    
        <li className="hover:text-[#0d6db7] ease-in-out">
          <li className="hover:text-[#0d6db7] text-2xl ease-in-out">
            <NavLink to="/cart">
              <AiOutlineShoppingCart />
            </NavLink>
          </li>
          {/* <button className="py-2 px-4 bg-[#0d6db7] text-white rounded-lg flex justify-center items-center">
            Donate Now
          </button> */}
        </li>
      </ul>
      <button
        className="lg:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <AiOutlineClose className="text-2xl" />
        ) : (
          <AiOutlineAlignLeft className="text-2xl" />
        )}
      </button>
      <ul
        className="top-[80px] p-[2rem] left-0 flex flex-col items-center gap-12 h-screen text-[14px] text-[#000000d9] bg-green-50  absolute transition duration-150 ease-in w-full z-50 lg:hidden"
        style={{ display: isOpen ? "flex" : "none" }}
      >
       <li className="hover:text-[#0d6db7] ease-in-out">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:text-[#0d6db7] ease-in-out">
          <NavLink to="/">Media</NavLink>
        </li>
    
        <li className="hover:text-[#0d6db7] ease-in-out">
          <li className="hover:text-[#0d6db7] text-2xl ease-in-out">
            <NavLink to="/cart">
              <AiOutlineShoppingCart />
            </NavLink>
          </li>
          {/* <button className="py-2 px-4 bg-[#0d6db7] text-white rounded-lg flex justify-center items-center">
            Donate Now
          </button> */}
        </li>
      </ul>
    </nav>
  );
}
