import { cart } from "../store/OnlineStoreSlice";
import Button from "./Button/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export const Cards = ({
  ProductName,
  description,
  imageUrl,
  unitPrice,
  unitName,
}) => {
  // console.log(props)
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state", state?.OnlineStoreSlice?.dataList.cart);

  return (
    <div className="border border-[#61B846] max-h-[400px]  p-2 flex flex-col justify-center rounded-md">
      <img
        src={imageUrl}
        alt="ProductImage"
        className="object-cover w-[200px] p-2 rounded-md h-[200px]"
      />
      <p className="text-lg font-bold">{ProductName}</p>
      <p className="text-[#BFBFBF]">{description}</p>
      <p className="text-base font-bold">Rs {unitPrice}</p>
      <Button
        className="text-white bg-[#61B846] flex justify-center items-center p-y-[.5rem] px-[2rem]"
        onClick={() => {
          dispatch(
            cart({
              ProductName,
              description,
              imageUrl,
              unitPrice,
              unitName,
              status: "pending",
            })
          );
        }}
      >
        Add to cart
      </Button>
    </div>
  );
};
