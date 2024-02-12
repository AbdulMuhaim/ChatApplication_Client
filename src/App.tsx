import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import UserRoutes from './routes/userRoutes/UserRoutes';
import AdminRoutes from './routes/adminRoutes/AdminRoutes';
import { notification } from 'antd';



function App() {

  notification.config({
    duration: 2,
  });

  return (
    <>


    <BrowserRouter>
    <Routes>
                  
              {/* USER ROUTES */} 
<Route path='/*' element={<UserRoutes/>}/>
        
              {/* ADMIN ROUTES */}
<Route path="/admin/*" element={<AdminRoutes/>} />

    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App


