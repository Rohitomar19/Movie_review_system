import React from 'react'
import { useState } from 'react';
import { ArrowRight } from 'lucide-react'
import {
  Link,
  useNavigate
} from "react-router-dom";
import axios from 'axios';
import potato from '../images/potato.png'
import { useDispatch, useSelector } from 'react-redux';
import {addUser,removeUser} from '../features/user/userSlice'

export function SignIn() {
  
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8002/api/user/signin', {
        email,
        password,
      },{withCredentials:true});

      const user = response.data.user;
      dispatch(addUser(user));
      setMessage('Login successful');
      
      navigate('/');
    } catch (error) {
      console.log(error.response.user);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img src = {potato}/>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight dark:text-red-100 text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400 ">
            Don&apos;t have an account?{' '}
            <Link
              to="/sign-up"
              title=""
              className="font-semibold dark:text-red-100 text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
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
                <div className="flex items-center justify-between">
                  <label htmlFor="" className="text-base font-medium dark:text-red-100 text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                  <Link to="/forgot" title="" className="text-sm font-semibold dark:text-red-100 text-black hover:underline">
                    {' '}
                    Forgot password?{' '}
                  </Link>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value = {password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  // type="submit"
                  onClick={handleLogin}
                  className="inline-flex w-full items-center justify-center dark:text-red-100 rounded-md shadow-inner shadow-gray-800  bg-blue-gray-900 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-blue-gray-800"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
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