import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import { Protected } from "./Protected";
import AdminLayout from "../src/Pages/Admin/AdminLayout";
import Admin from "./Pages/Admin/Admin";
import { AddCategory } from "./Pages/Admin/Category/AddCategory";
import { ViewCategory } from "./Pages/Admin/Category/ViewCategory";
import { AddProducts } from "./Pages/Admin/Products/AddProducts";
import { ViewProducts } from "./Pages/Admin/Products/ViewProducts";
import { OrderStatus } from "./Pages/Admin/OrderStatus/OrderStatus";
import { AdminProfile } from "./Pages/Admin/AdminProfile/AdminProfile";
import { Cart } from "./Pages/Cart/Cart";
import Accounts from "./Pages/Accounts/Accounts";
export default function App() {
  let userInfo = JSON.parse(localStorage.getItem("login"));

  return (
    <>
      <Routes>
        <Route path="/" element={<Protected Cmp={Home} />} />
        <Route path="/accounts" element={<Accounts/>} />
        <Route path="login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        {userInfo?.role === "Admin" ? (
          <Route path="/admin" element={<Protected Cmp={AdminLayout} />}>
            <Route index element={<Admin />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="view-Category" element={<ViewCategory />} />
            <Route path="add-Product" element={<AddProducts />} />
            <Route path="view-Product" element={<ViewProducts />} />
            <Route path="order-status" element={<OrderStatus />} />
            <Route path="view-course" element={<AdminProfile />} />
          </Route>
        ) : (
          <></>
        )}

        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
}
