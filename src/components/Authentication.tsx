import { Form, Input, Button, message, notification } from 'antd';
import 'antd/dist/reset.css';
import image from "../assets/VR-Brille für Kinder_ Alles, was Eltern wissen müssen - VRgamingworld_de.jpg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL;



const backgroundImage = 'url("https://i.pinimg.com/564x/47/f0/68/47f068e84a3c527379119316d406beef.jpg")';

function Authentication() {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname;

  const handleFinish = async (values) => {

    try {

      if (register) {
        const res = await axios.post(`${url}/register`, values)
        if (res.data.status) {
          message.success(res.data.message)
          navigate('/login')
        } else {
          message.error(res.data.message)
        }
      } else {
        const res = await axios.post(`${url}/login`, values)
        if (res.data.status) {          
          localStorage.setItem('accessToken',res.data.token.accessToken);
          localStorage.setItem('refreshToken',res.data.token.refreshToken);
          localStorage.setItem('userId', res.data.userData._id)
          console.log(res.data);
          notification.success({message:res.data.message})
          navigate('/home')
        } 
      }
    } catch (err) {
      if (err.response.data.message === "User not found") {
        notification.error({ message: err.response.data.message });
      }else if ((err.response.data.message === "Incorrect password")) {
        notification.error({ message: err.response.data.message });
      }      
    }

  }



  useEffect(() => {
    getCurrentURL();
  }, []);

  const getCurrentURL = () => {
    setRegister(currentURL === '/register');
  };

  return (
    <div className="w-screen h-screen md:h-[100vh] bg-black  flex flex-col md:flex-row  items-center justify-between" style={{ backgroundImage, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <div className="hidden md:block text-white md:mt-3 border-b-2 md:border-b-0 md:border-t-0 md:border-r-2 h-[30vh] w-[100vw] md:h-[80vh] border-slate-400 flex items-center justify-center md:w-[45%]" >
        <img src={image} className="md:w-[37vw] md:ml-5 w-[52vw] md:h-fit h-52 pb-3" />
      </div>

      <div className={`md:pr-32 pl-5 md:pt-0 pb md:pb-0 pt-6 pr-5  ${!register ? 'pl-5 flex justify-center pb-8 items-center h-screen' : ''}`}>
        <Form
          className="w-[60vw] md:w-[34vw] lg:w-[32vw] xl:w-[30vw] rounded-md bg-slate-800 opacity-70 shadow-md backdrop-blur-sm flex flex-col px-6  py-4  !text-white"
          layout="vertical"
          onFinish={handleFinish}
        >
          <div className="text-center">
            <h1 className="text-xl pt-5">Welcome</h1>
            {register ? <p className="pt-2">Signup to your account</p> : <p className="pt-2">Login to your account</p>}
          </div>

          <Form.Item
            name="name"
            label={<p className="!text-white">Username</p>}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter your username..."
              size="large"
            />
          </Form.Item>

          {register ? <Form.Item
            name="email"
            label={<p className="!text-white">Email</p>}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Enter your email..."
              size="large"
            />
          </Form.Item> : null}

          <Form.Item
            name="password"
            label={<p className="!text-white">Password</p>}
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const minLength = 6;
                  const maxLength = 10;

                  if (!value || (value.length >= minLength && value.length <= maxLength)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(`Password must be between ${minLength} and ${maxLength} characters`)
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter your password..."
              size="large"
            />
          </Form.Item>


          {register ? <Form.Item
            name="confirmPassword"
            label={<p className="!text-white">Confirm Password</p>}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const minLength = 6;
                  const maxLength = 10;

                  if (!value || (value.length >= minLength && value.length <= maxLength)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(`Password must be between ${minLength} and ${maxLength} characters`)
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Confirm your password..."
              size="large"
            />
          </Form.Item> : null}


          <div className="flex flex-col items-center justify-center">
            <Form.Item>
              <Button
                htmlType="submit"
                className="!w-[18vw] !text-white"
                size="large"
              >
                {register ? "Signup" : "Login"}
              </Button>
            </Form.Item>
            {register ? null : <p className="cursor-pointer pb-2">
              Forgotten your Password&nbsp;?
            </p>}
            <p className="cursor-pointer pb-5">
              {register ? `Already have an account` : `Don't have an account`} &nbsp;? <a onClick={() => navigate(register ? '/login' : '/register')} className="text-blue-500">{register ? 'Login' : 'Signup'}</a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Authentication;
