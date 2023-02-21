import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Protected = ({ Cmp }) => {
  const navigate = useNavigate();
  let data = JSON.parse(localStorage.getItem("login"));
  useEffect(() => {
    if (!data) {
     return  navigate("/login");
    }

    else if (data?.role === 'Admin') {
    return navigate("/admin");
    }

    // else if(data && data?.role === "User"){
    //  navigate('/')
    // }

    // else{
    //     navigate('/')
    // }
  },[]);

  return (
    <div>
      <Cmp />
    </div>
  );
};
