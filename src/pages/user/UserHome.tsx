import { useEffect, useState } from "react";
import axiosInstance from "../../utils/UserAxios";

const backgroundImage = 'url("https://i.pinimg.com/originals/40/ea/51/40ea51f26acb7df880c5de5abd3395b5.gif")';

function UserHome(){

    const [data,setData] = useState()
    const id = localStorage.getItem('userId')

    const fetchData = async()=>{
    const data = await axiosInstance.get(`/fetchProfileData/${id}`)
    setData (data.response.data)
    }

    useEffect(()=>{
     fetchData()
    },[])

    return(

        <h1 className="flex justify-center items-center h-[100vh] w-[100vw]" style={{backgroundImage}}>

        <p className="text-8xl text-white">{data?.name}</p>
        <p className="text-8xl text-white">{data?.email}</p>

        </h1>
    )
}

export default UserHome