import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const registrationSchema = z.object({
  phoneNumber: z.string().regex(/^\+998\d{9}$/, "Invalid Uzbekistan phone number"),
  fullName: z.string().min(1, "Please enter your full name"),
  location: z.string().min(1, "Please enter your location"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6),
  email: z.string().min(1, "This field has to be filled.").email("This is not a valid email."),
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const formMode = "register";

  const onSubmit = async (data) => {
    console.log("Registration form submitted", data);
    try {
      const response = await axios.post("https://oxoserver.onrender.com/users", data);
      console.log(response.data); 
      localStorage.setItem("token", response.data.accessToken);
      navigate("/"); 
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleTabClick = (e) => {
    const mode = e.currentTarget.getAttribute('data-mode');
    if (mode === "login") {
        navigate("/NewLogin")
    } else if (mode === "register"){
        navigate("/NewRegister")
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
        </div>
        <form className='pt-6' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="text-thirdary">Full Name:</label>
        <input className={inputClass} {...register("fullName")} />
        {errors.fullName && <p className="text-red-500 text-xs italic">{errors.fullName.message}</p>}
      </div>
      <div>
        <label className="text-thirdary">Email:</label>
        <input className={inputClass} {...register("email")} type="email" />
        {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
      </div>
      <div>
        <label className="text-thirdary">Phone Number:</label>
        <input className={inputClass} {...register("phoneNumber")} />
        {errors.phoneNumber && <p className="text-red-500 text-xs italic">{errors.phoneNumber.message}</p>}
      </div>
      <div>
        <label className="text-thirdary">Location:</label>
        <input className={inputClass} {...register("location")} />
        {errors.location && <p className="text-red-500 text-xs italic">{errors.location.message}</p>}
      </div>
      <div>
        <label className="text-thirdary">Password:</label>
        <input className={inputClass} {...register("password")} type="password" />
        {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
      </div>
      <div>
        <label className="text-thirdary">Confirm Password:</label>
        <input className={inputClass} {...register("confirmPassword")} type="password" />
        {errors.confirmPassword && <p className="text-red-500 text-xs italic">{errors.confirmPassword.message}</p>}
      </div>
      <div className='flex items-center justify-center pb-6 pt-6'>
      <button className={btnClass} type="submit">Register</button>
      </div>
    </form>
     
    </div>
    </div>
  );
};

export default RegistrationForm;
