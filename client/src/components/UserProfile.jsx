import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function UserProfile() {
  // State to manage the edit mode and user details
  
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8002/api/profile/user-info',{withCredentials:true});
        const userData = response.data;
        if(!userData){
          console.log("User not found");
        }
        console.log(userData.phone);
        // setUser(response.data.user);
        setUserDetails({
          fullName: userData.fullName,
          email: userData.email,
          phone: userData.phone ,
          address: userData.address
        })
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  },[])

  
  const UpdateUser = async (e) =>{
    try{
      const response = await axios.post('http://localhost:8002/api/profile/user-info/update',{
        fullName : userDetails.fullName,
        email : userDetails.email,
        phone : userDetails.phone,
        address: userDetails.address
      },{withCredentials:true});
      console.log("done");
      setMessage('Profile updated successfully');
    }
    catch(err){
      console.log(err);
      setMessage(err.response.data.message);
    }
  }

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    if(isEditing){
      UpdateUser();
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="max-w-2xl m-auto my-5">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border dark:border-gray-700">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Your Profile</h3>
          <button
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
            onClick={toggleEdit}
          >
            {isEditing ? 'Update' : 'Edit'}
          </button>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={userDetails.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1"
                  />
                ) : (
                  userDetails.fullName
                )}
              </dd>
            </div>

            {/* Repeat similar pattern for email, phone, and address fields */}
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1"
                  />
                ) : (
                  userDetails.email
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone number</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={userDetails.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1"
                  />
                ) : (
                  userDetails.phone
                )}
              </dd>
            </div>

            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-300 sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <textarea
                    name="address"
                    value={userDetails.address}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-2 py-1"
                  />
                ) : (
                  userDetails.address
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <p className='text-red-500 text-center font-thin'>{message}</p>
    </div>
  );
}

export default UserProfile;
