import { cart } from "../store/OnlineStoreSlice";
import Button from "./Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Cards = ({
  ProductName,
  description,
  imageUrl,
  unitPrice,
  unitName,
  id,
}) => {
  // console.log('ui',id)
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state", state?.OnlineStoreSlice?.dataList.cart);

  const addtoCart = () => {
    dispatch(
      cart({
        id,
        ProductName,
        description,
        imageUrl,
        unitPrice,
        unitName,
        quantity: 1,
        status: "pending",
      })
    );
    return toast.success("Product Added to Cart!");
  };

  return (
    <div className="border border-[#61B846]  min-w-[200px] min-h-[400px]  px-4 py-2 flex flex-col justify-center  rounded-md">
      <img
        src={imageUrl}
        alt="ProductImage"
        className="object-cover rounded-[10px] w-[98%] h-[200px] mx-auto lg:h-[200px] max-w-[300px]"
      />
      <p className="text-lg font-bold">{ProductName}</p>
      <p className="text-[#BFBFBF]">{description}</p>
      <p className="text-base font-bold mb-4">Rs {unitPrice}</p>
      <Button
        className="text-white bg-[#61B846] flex justify-center w-[98%] items-center  !p-0 lg:p-y-[.5rem] lg:px-[2rem]"
        onClick={() => {
          addtoCart();
        }}
      >
        Add to cart
      </Button>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
