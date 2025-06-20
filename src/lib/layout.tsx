import { Outlet } from "react-router-dom"
import Sidebar from "./ui/Sidebar"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchInviteCode } from "./store/slices/invite.slice"
import { pb } from "./pb"

function Layout(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchInviteCode(pb.authStore.record.id))
    }, [])

    return(
        <>
            <div className="wrapper">
            <Sidebar />
            <main>
                <div className="head">
                    <i title="Menu toggle" className='bx  bx-menu' onClick={() => document.querySelector("aside")?.classList.toggle("close")}></i> 
                </div>
                <Outlet />
            </main>
            </div>
        </>
    )
}

export default Layout