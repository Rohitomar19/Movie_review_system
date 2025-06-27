import React from 'react'
import { useState } from 'react';
import { ArrowRight } from 'lucide-react'
import {
    Link,
    useNavigate
  } from "react-router-dom";
import potato from '../images/potato.png'
import axios from 'axios';

export function SignUp() {

  const [email,setEmail] = useState("");
  const [fullName,setFullName] = useState("");
  const [password,setPassword] = useState("");
  const [cnfpass,setCnfpass] = useState("");
  const [message,setMessage] = useState("");
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   console.log(email)
  //   try {
  //     console.log("helo")

  //     if(password != cnfpass){
  //       setMessage('Passwords do not match');
  //       return;
  //     }
  //     console.log(fullName)
  //     const response = await axios.post('http://192.168.149.232:8000/user/signup', {
  //       fullName,
  //       email,
  //       password,
  //     },{
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

      
  //     setMessage('Login successful');
      
  //     navigate('/sign-in');
  //   } catch (error) {
  //     console.log(error.response.data);
  //     setMessage('Login failed. Please check your credentials.');
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(email)
    setMessage('');
    if(password != cnfpass){
      setMessage('Passwords do not match');
      return;
    }
    if(!email || !password || !fullName){
      setMessage('Please fill all the fields');
      return;
    }
    try{
      const response  = await axios.post("http://localhost:8002/api/user/signup", {
        fullName,
        email,
        password,
      },{headers:{
        'Content-Type': 'application/json',
      }});
      console.log(response);
      setMessage('Login successful');
      navigate('/Sign-in');
    }
    catch(err){
      console.log(err)
      setMessage('Login failed. Please check your credentials.');
    }
  }
  return (

  
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <img src = {potato}/>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black dark:text-red-100">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400 ">
            Already has a account ?
            <Link
              to="/Sign-in"
              title=""
              className="font-semibold text-black dark:text-red-50 transition-all duration-200 hover:underline"
            >
              Sign-In
            </Link>
          </p>
          <form onSubmit={handleLogin} className="mt-8">
            <div className="space-y-5">
            <div>
                <label htmlFor="" className="text-base font-medium text-gray-900 dark:text-red-100">
                  {' '}
                  Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    name = "fullName"
                    placeholder="Name"
                    value = {fullName}
                    onChange={(e)=>{setFullName(e.target.value)}}
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="" className="text-base font-medium text-gray-900 dark:text-red-100">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    name = "email"
                    placeholder="Email"
                    value = {email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900 dark:text-red-100">
                    {' '}
                    Password{' '}
                  </label>
                  
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border  border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    name  = "password"
                    placeholder="Password"
                    value = {password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                  ></input>
                </div>
                
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium text-gray-900 dark:text-red-100">
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
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md dark:text-red-100 bg-black dark:bg-blue-gray-900 dark:hover:bg-blue-gray-800 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  
                >
                  Create <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
          <p className="mt-4 text-red-500">{message}</p>
        
          </div>
        </div>
      </div>
    </section>
  )
}
