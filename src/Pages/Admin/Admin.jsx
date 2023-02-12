import { List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/OnlineStoreSlice";
import { useEffect } from "react";

export default function Admin() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const fetchAllProducts = () => {
    dispatch(getAllProducts())
      .unwrap()
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  console.log("state", state?.OnlineStoreSlice?.dataList.allProducts);

  return (
    <div className="flex flex-col justify-center-center gap-7 p-5">
      <p className="text-center text-3xl text-[#024F9D] font-bold">
        All Products
      </p>

      <List
        itemLayout="horizontal"
        style={{ width: "99%" }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={state?.OnlineStoreSlice?.dataList.allProducts}
        renderItem={(item) => (
          <List.Item>
            <div className="flex items-center  gap-5 border w-full p-4 border-[#65BD50] rounded-lg">
              <img
                src={item.imageUrl}
                alt="ProductImage"
                className="h-[60px] w-[60px]"
              />
              <div className="flex flex-col gap-4 flex-1">
                <p className="text-[#61B846]">{item.ProductName}</p>
                <span className="text-[#BFBCBC]">{item.unitName}</span>
              </div>

              <p className="text-[#BFBCBC]"> RS {item.unitPrice}</p>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
