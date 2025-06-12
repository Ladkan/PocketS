import { Outlet } from "react-router-dom"
import Header from "./ui/Header"

function Layout(){
    return(
        <>
        <Header />
        <Outlet />
        </>
    )
}

export default Layout