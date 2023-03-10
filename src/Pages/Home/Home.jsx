import Navbar from "../../Components/Navbar";
import HeroSection from "../HeroSection/HeroSection";
import { searchIcon } from "../../assets";
import { Cards } from "../../Components/Cards";
import { getAllCategories, getAllProducts } from "../../store/OnlineStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "antd";

export default function Home() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  console.log("state", state?.OnlineStoreSlice?.dataList.allCategories);
  console.log("state", state?.OnlineStoreSlice?.isLoading);

  const fetchAllProducts = () => {
    dispatch(getAllProducts())
      .unwrap()
      .then((data) => {
        console.log(data);
      });
  };

  const fetchAllCategories = () => {
    dispatch(getAllCategories())
      .unwrap()
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllProducts();
  }, []);

  return (
    <div className="h-full  px-4 md:px-10 lg:px-20 max-w-[1512px] mx-auto">
      <Navbar />
      <HeroSection />

      <h1 className="font-bold text-lg lg:text-2xl">Shop by Category</h1>

      <div className="my-8 flex mx-auto overflow-x-scroll md:overflow-x-hidden  items-center gap-10 ">
        {state?.OnlineStoreSlice?.isLoading ? (
          <Skeleton active />
        ) : (
          state?.OnlineStoreSlice?.dataList.allCategories?.map((cat, index) => {
            return (
              <div
                className=" p-2 border border-[#61B846] flex flex-col justify-center items-center cursor-pointer"
                key={index}
              >
                <img
                  src={cat.imageUrl}
                  alt="category Image"
                  className="h-[100px] w-[100px] rounded-xl"
                />
                <p>{cat.categoryName}</p>
              </div>
            );
          })
        )}
      </div>

      <div className="my-3 flex justify-center items-center w-[90%]  border-2 rounded-lg">
        <img
          src={searchIcon}
          alt="searchIcon"
          className="pl-2 h-[40px] w-[40px] cursor-pointer py-2"
        />
        <input type="input" alt="search anything" className="flex-1  py-2" />
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-2xl">Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-7 mt-6">
          {state?.OnlineStoreSlice?.isLoading ? (
            <Skeleton active />
          ) : (
            state?.OnlineStoreSlice?.dataList.allProducts.map((pro, index) => {
              return <Cards {...pro} key={index} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
