import { NavLink, useNavigate } from 'react-router-dom'
import './style.scss'
import { LogOut, pb } from '../../pb'
import { useEffect, useState } from 'react'
import { avatar_url } from '../../utils'

function Sidebar(){

    const [show, setShow] = useState(false)
    useEffect(() => {
        if(pb.authStore.record.avatar != '') setShow(true)
    }, [])

    let nav = useNavigate();
    const logout = async () => {
        const data = await LogOut();
        if(!data){
            nav("/login")
        }
    }

    return (
        <aside>
            <div className="menu-wrapper">
                <span className='title'>PocketS</span>
                <nav>
                    <NavLink to="/"><i className='bx  bx-home' ></i>  Home</NavLink>
                    <NavLink to="/notifications" ><i className='bx  bx-bell'></i>  Notifications <span></span></NavLink>
                </nav>
            </div>
            <div className="user-wrapper">
                <div className="user-content">
                    <button title='account menu toggle' onClick={() => document.querySelector(".user-menu")?.classList.toggle("close")} >
                            <div className='avatar'>
                                { show ? (
                                    <img src={avatar_url} alt="" />
                                ) : (
                                    <div className="placeholder"></div>
                                )}
                            </div>
                        <div className="name">
                            <span>{pb.authStore.record.name}</span>
                            <span>@{pb.authStore.record.name}</span>
                        </div>
                        <div className="icon">
                            <i className='bx  bx-expand-right'></i> 
                        </div>
                    </button>
                </div>
                <div className="user-menu close">
                    <NavLink to="/user"><i className='bx  bx-user-circle' ></i>  Account</NavLink>
                    <button onClick={() => logout()} ><i className='bx  bx-arrow-out-right-square-half'></i>  Log out</button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar