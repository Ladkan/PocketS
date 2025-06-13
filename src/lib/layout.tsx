import { Outlet } from "react-router-dom"
import Sidebar from "./ui/Sidebar"

function Layout(){
    return(
        <div className="wrapper">
        <Sidebar />
        <main>
            <div className="head">
                <i className='bx  bx-menu' onClick={() => document.querySelector("aside")?.classList.toggle("close")}></i> 
            </div>
            <Outlet />
        </main>
        </div>
    )
}

export default Layout