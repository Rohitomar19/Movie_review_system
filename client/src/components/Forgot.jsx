import React from 'react'
import { useState } from 'react';
import { ArrowRight } from 'lucide-react'
import {
    Link,
    useNavigate
  } from "react-router-dom";
import potato from '../images/potato.png'
import axios from 'axios';


export default function Forgot() {

    const [email,setEmail] = useState("");
    const [otp,setOtp] = useState("");
    const [message,setMessage] = useState("");
    const navigate = useNavigate();
    const [bool, setBool] = useState(false);
    const [newPassword,setNewPassword] = useState("");
    const [cnfpass,setCnfpass] = useState("");
    
    const handleSendOtp = async (e) => {
      console.log(email)

      try {
        console.log("helo")

        const response = await axios.post('http://localhost:8002/api/user/forgot-password', {
          email,
        });

        console.log(response.data);

        setMessage("OTP sent successfully");
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.message);
      }
    };

    const handleChangePassword = async (e) => {
         
         try {

           if(newPassword != cnfpass){
            setMessage("Passwords do not match");
            return;
           } 
           const response = await axios.post('http://localhost:8002/api/user/reset-password', {
            otp,
            email,
            newPassword,
         });
          console.log(response.data);
          setMessage("Password changed successfully");
          navigate('/sign-in')
         } catch (error) {
          console.log(error);
          setMessage(error.response.data.message);
         }
    }

  return (
    <div>
      <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <img src = {potato}/>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight dark:text-red-100 text-black">
            Forgot Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400 ">
            You can Reset your password here!
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="" className="text-base font-medium dark:text-red-100 text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value = {email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  ></input>
                </div>
              </div>
                
              <div>
                <button
                  type="button"
                  className="inline-flex items-center dark:text-red-100 justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick = {()=>{handleSendOtp()}}
                >
                  Get OTP <ArrowRight className="ml-2" size={16} />
                </button>
              </div>

              
            </div>
            {  bool ?(
                <div className='my-4'>
                <div >
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base dark:text-red-100 font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value = {newPassword}
                    onChange={(e)=>{setNewPassword(e.target.value)}}
                  ></input>
                </div>
                
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium dark:text-red-100 text-gray-900">
                    {' '}
                    Confirm Password{' '}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value = {cnfpass}
                    onChange={(e)=>{setCnfpass(e.target.value)}}
                  ></input>
                </div>
                
              </div>
              <div>
                <button
                  type="button"
                  className="inline-flex w-full my-4 items-center justify-center dark:text-red-100 rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick = {()=>{handleChangePassword()}}
                >
                  Change Password <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
                </div>) 
                : 
                (<div className='my-4'>
                <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium dark:text-red-100 text-gray-900">
                    {' '}
                    OTP{' '}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="OTP"
                    value = {otp}
                    onChange={(e)=>{setOtp(e.target.value)}}
                  ></input>
                </div>
                
              </div>
              
              <div>
                <button
                  type="button"
                  className="my-4 inline-flex w-full items-center justify-center rounded-md dark:text-red-100 bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  onClick={()=>{
                    setBool(true)
                  }}
                >
                  Submit <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
              </div>)
            }
          </form>
          <div className="mt-3 space-y-3">
          <p className="mt-4 text-red-500">{message}</p>
        
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
