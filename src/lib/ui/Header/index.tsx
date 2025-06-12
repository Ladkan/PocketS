import { Link } from 'react-router-dom'
import './style.scss'

function Header(){
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/notifications" >Notifications</Link>
        </>
    )
}

export default Header