import { NavLink } from 'react-router-dom'
import './style.scss'

function Sidebar(){
    return (
        <aside>
            <div className="menu-wrapper">
                <span className='title'>PocketS</span>
                <nav>
                    <NavLink to="/"><i className='bx  bx-home' ></i>  Home</NavLink>
                    <NavLink to="/notifications" ><i className='bx  bx-bell'></i>  Notifications</NavLink>
                </nav>
            </div>
        </aside>
    )
}

export default Sidebar