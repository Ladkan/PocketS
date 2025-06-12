import { Link } from "react-router-dom"

function Home(){
    return(
        <>
        <h1>home</h1>
        <Link to="/notifications" >Notifications</Link>
        </>
    )
}

export default Home