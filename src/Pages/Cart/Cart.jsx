import { useSelector } from "react-redux";
import { AiTwotoneDelete } from "react-icons/ai";
export const Cart = () => {
  const state = useSelector((state) => state);
  console.log("state", state?.OnlineStoreSlice?.dataList.cart);
  return (
    <div>ok</div>
  )
};
