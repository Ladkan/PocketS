import { Navigate, Outlet } from "react-router-dom"
import { pb } from "../pb"

function ProtectedRoute(){
    return pb.authStore.isValid ? <Outlet /> : <Navigate to={"/login"}  />
}

export default ProtectedRoute