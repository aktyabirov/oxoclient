import React, { useState, useEffect } from 'react';
import { useForm, Controller,  } from 'react-hook-form';
import axios from 'axios';
import { usePostData } from '../../hooks/usePostData';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';


const CreateProduct = () => {
  const { register, handleSubmit, control, setValue, reset, watch } = useForm();
  const [categories, setCategories] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    location: '',
    id: '',
  });

  const navigate = useNavigate(); 
 
  const selectedCategory = watch("category");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = Cookies.get("token");
      
      if (token) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get('http://localhost:8080/profile', config);
          const userDetails = response.data; 
          setUserDetails({
            name: userDetails.fullName,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber,
            location: userDetails.location,
            id: userDetails.id,
          });
          setValue('name', userDetails.fullName);
          setValue('email', userDetails.email);
          setValue('phoneNumber', userDetails.phoneNumber);
          setValue('location', userDetails.location);
        } catch (error) {
          navigate("/login")
          console.error('Failed to fetch user details:', error);
        }
      } else {
        navigate("/login")
      }
    };
  
    fetchUserDetails();
  }, [setValue]);
  

  const {mutate, isPending} = usePostData(selectedCategory);

  const onSubmit = async (data) => {
    const extendedData = {
      ...data,
      userId: userDetails.id,
      postedTime: new Date().toISOString(), 
    };

    console.log(selectedCategory);
    mutate(extendedData,{
    onSuccess: () => {
      setValue('title', '');
      setValue('productUrl', '');
      setValue('description', '');
      setValue('price', '');
    }});
    toast.success("Product has been added!");
  };

  const categoryOptions = categories?.map(category => ({
    value: category.datakey,
    label: category.title
  }));
  console.log(categoryOptions);

  const inputClass ="appearance-none rounded-md relative w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm hover:border-red-300";

  const btnClass = "bg-black text-white py-2 px-24 rounded-md hover:bg-red-500";  


  return (
    <div className='flex flex-col justify-center items-center '>
    <form className='flex flex-col gap-4 w-[500px]' onSubmit={handleSubmit(onSubmit)}>
      <input className={inputClass} {...register('title')} placeholder="Product Title" required />
      <Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select
      {...field}
      options={categoryOptions}
      onChange={(option) => field.onChange(option.value)} 
      value={categoryOptions.find(option => option.value === field.value)} 
    />
  )}
/>
      <input className={inputClass} {...register('productUrl')} placeholder="Product URL" required />
      <input className={inputClass} {...register('price')} placeholder="Price" required />
      <textarea  className={inputClass} {...register('description')} placeholder="Description" />

      {/* User Details (editable) */}
      <input className={inputClass} {...register('name')} placeholder="Your Name" />
      <input className={inputClass} {...register('email')} type="email" placeholder="Your Email" />
      <input className={inputClass} {...register('phoneNumber')} placeholder="Your Phone Number" />
      <input className={inputClass} {...register('location')} placeholder="Your Location" />

      <div className='flex justify-center pb-8'>
      <button className={btnClass} type="submit">Create Product</button>
      </div>
    </form>
    </div>
  );
};

export default CreateProduct;
