import { useState } from "react";
import { Auth, pb } from "../lib/pb";
import { Navigate } from "react-router-dom";

function Login(){

    const [form, setFrom] = useState({
        email: '',
        passwd: ''
    });
    const [isLoggin, setIsLoggin] = useState(pb.authStore.isValid)

    const handleChange = (e:any) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const data = await Auth(form.email, form.passwd)
        setIsLoggin(data)
    } 

    return(
        <>
        {isLoggin ? (
            <Navigate to="/" />
        ) : (
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" onChange={handleChange} />
                <input type="password" name="passwd" onChange={handleChange} />
                <button type="submit">Login</button>
            </form>
        )}
        </>
    )
}

export default Login