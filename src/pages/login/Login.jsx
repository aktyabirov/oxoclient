import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EyeOffIcon, EyeIcon } from '../../assets/icon/EyeIcon';
import Cookies from 'js-cookie';

const loginSchema = z.object({
  email: z.string().min(1, "This field has to be filled.").email("This is not a valid email."),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const formMode = "login";

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const onSubmit = async (data) => {
    console.log("Login form submitted", data);
    try {
      const response = await axios.post("http://localhost:8080/login", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      Cookies.set("token", response.data.accessToken, { expires: 7 });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error);
    }
  };

  const handleTabClick = (e) => {
    const mode = e.currentTarget.getAttribute('data-mode');
    if (mode === "login") {
        navigate("/login")
    } else if (mode === "register"){
        navigate("/register")
    }
  }


  const inputClass ="appearance-none rounded-md relative w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:border-red-300";

  const btnClass = "bg-black text-white py-2 px-24 rounded-md hover:bg-red-500";  

  return (
    <div className="flex flex-col   py-12 bg-white px-4 sm:px-6 lg:px-8">
    <div className="container bg-white shadow-lg w-[407px]">
      <div className="border-b-2 border-gray-300">
        <div className="flex justify-center -mb-px space-x-8">
          <button
             onClick={handleTabClick}
             type="button"
             data-mode="login"
            className={`text-gray-600  pb-2 px-14 transition duration-1000 ease-in-out ${
              formMode === "login"
                ? "border-b-4 text-black font-bold border-black"
                : ""
            }`}
          >
            Kirish
          </button>
          <button
         onClick={handleTabClick}
         data-mode="register"
           type="button"
            className={`text-gray-600 pb-2 px-5 transition duration-500 ease-in-out hover:text-red-500 border-b-4 hover:border-red-400 ${
              formMode === "register"
                ? "border-b-4 text-black font-bold border-black"
                : ""
            }`}
          >
            Ro'yxatdan o'tish
          </button>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-thirdary">Email:</label>
            <input {...register("email")} type="email" autoComplete="email" className={inputClass} placeholder="Email" required />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className="relative">
            <label className="text-thirdary">Password:</label>
            <input {...register("password")} type={passwordVisible ? "text" : "password"} autoComplete="current-password" className={inputClass} placeholder="Parol123!#" required />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button type="button" onClick={togglePasswordVisibility} className="text-gray-500">
                {passwordVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 italic text-xs">{errors.password.message}</p>}
          </div>
          <div className="flex items-center justify-center pt-6 pb-8">
            <button type="submit" className={btnClass}>Login</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
