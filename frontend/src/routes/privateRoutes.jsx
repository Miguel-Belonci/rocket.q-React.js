import { useContext } from "react"
import { AuthContext } from "../context/auth"
import { Navigate, Outlet } from "react-router-dom"


const PrivateRoutes = () => {
    const {signed} = useContext(AuthContext)
    console.log(signed)

    return signed ? <Outlet /> : <Navigate to="/login"/>
}

export default PrivateRoutes