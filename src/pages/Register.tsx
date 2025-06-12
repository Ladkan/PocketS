import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { getInviteCode, pb, Register } from "../lib/pb";

function Registere(){

    const {id} = useParams()

    const [isValid, setisValid] = useState();

    async function validate(){
        //@ts-ignore
        const res = await getInviteCode(id)
        console.log(res.active)
        setisValid(res)
    }

    useEffect(() => {
        validate()
    }, [])

    const [form, setFrom] = useState({
        email: '',
        passwd: '',
        name: ''
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

        const data = await Register(form.email, form.passwd, form.name, isValid.created_by)
        setIsLoggin(data)
    } 

    return(
        <>
        {!isValid ? (
            <p>Invalid code</p>
         ) : (
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={handleChange} />
                <input type="text" name="email" onChange={handleChange} />
                <input type="password" name="passwd" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
         )}
        </>
    )
}

export default Registere
