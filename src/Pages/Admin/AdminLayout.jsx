import Topbar from "./Topbar"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
export default function Admin() {
  //TODO STYLING LEFT
 
  return (
    <>
     <Topbar title='Admin Panel'/>
      <div className="grid grid-cols-[300px,1fr] mt-2 h-full min-h-[100vh] shadow-md">
        <Sidebar />
        <div className="h-100">

          <Outlet/>
        </div>
      </div>
    </>

  )
}
