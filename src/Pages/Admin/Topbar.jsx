import { ProfileIcon } from "../../assets";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Topbar({ title }) {
  let data = JSON.parse(localStorage.getItem("login"));
  const naviagte = useNavigate();

  const LogoutHandler = () => {
    localStorage.clear();
    naviagte("/login");
  };

  return (
    <>
      <div className="h-[5vh]  flex justify-around items-center my-3 text-3xl">
        <div className="flex items-center gap-3">
          <img
            src={data?.imageUrl}
            alt="adminAvatar"
            className="h-[50px] w-[50px] rounded-full"
          />

          <div className="flex flex-col justify-center">
            <p className="text-lg">{data?.name}</p>
            <p className="text-sm">{data?.role}</p>
          </div>
        </div>

        <p>{title}</p>

        <Link to="order-status">
          <img
            src={ProfileIcon}
            alt="ProfileIcon"
            className="h-[40px] w-[40px] cursor-pointer"
          />
        </Link>

        <Button
          onClick={() => {
            LogoutHandler()
          }}
        >
          Logout
        </Button>
      </div>
      <hr />
    </>
  );
}
