import React, { useState, useEffect } from "react";
import Loginanimation from "../LogoPic/Loginanimation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { loginRedux ,setToken} from "../Redux/userSlice";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    // Check if the user is already logged in
    const userToken = localStorage.getItem("token"); // You may need to adapt this to your actual token storage method
    if (userToken) {
  console.log("userToken:",userToken)
    }
  }, [navigate]);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email && password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/auth/login",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const dataRes = response.data;
        console.log(response.data)

        // Dispatch a Redux action with the login data
        dispatch(loginRedux(dataRes));

        // Save token in local storage for future requests
        localStorage.setItem("token", dataRes.token);
               
        // Display a toast message
        toast(dataRes.message);
        console.log("dataRes.alert:", dataRes.alert);
        if (dataRes.success) {      
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.error("Error:", error);
        toast("An error occurred while logging in.");
      }
    } else {
      alert("Please enter required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={Loginanimation} alt="Loginanimation" className="w-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={formData.email}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={formData.password}
              onChange={handleInputChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
