import { Navigate, Route, Routes } from "react-router"
import UserHome from "../../pages/user/UserHome"
import UserLogin from "../../pages/user/UserLogin"
import UserRegister from "../../pages/user/UserRegister"


function UserRoutes(){

    const token = localStorage.getItem('authToken');

    
    return(
        <>

<Routes>

        <Route path='login' element={token? <Navigate to='/home'/> : <UserLogin/>} />
        <Route path='register' element={<UserRegister/>} />
        <Route path='home' element={<UserHome/>} />
        
</Routes>

        </>

    )


}

export default UserRoutes