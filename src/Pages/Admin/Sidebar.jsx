import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div className="flex justify-center items-center">
      <ul className="p-8 flex flex-col gap-28 h-full ">
        <Dropdown label="Category" dismissOnClick={true}>
          <Link to="add-category">
            <Dropdown.Item>Add Category</Dropdown.Item>
          </Link>
          <Link to="view-Category">
            <Dropdown.Item>View Category</Dropdown.Item>
          </Link>
        </Dropdown>

        <Dropdown label="Products" dismissOnClick={true}>
          <Link to="add-Product">
            <Dropdown.Item>Add Product</Dropdown.Item>
          </Link>
          <Link to="view-Product">
            <Dropdown.Item>View Products</Dropdown.Item>
          </Link>
        </Dropdown>

        <Dropdown label="Orders" dismissOnClick={true}>
          <Link to="order-status">
            <Dropdown.Item>View Orders</Dropdown.Item>
          </Link>
        </Dropdown>
      </ul>
    </div>
  );
}
