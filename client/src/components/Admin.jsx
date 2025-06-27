import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8002/api/profile/admin',
          { withCredentials: true }
        );
        console.log(response.data);
        setUsers(response.data.allUser);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleRoleChange = (id, newRole) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, role: newRole } : user
      )
    );
  };

  const handleSave = async (user) => {
    try {
      await axios.post(
        'http://localhost:8002/api/user/change-role',
        { id: user._id, role: user.role },
        { withCredentials: true }
      );
    } catch (error) {
      console.error('Failed to update user role:', error);
      alert('Failed to update user role.');
    }
  };

  return (
    <div className="p-2 h-fit w-11/12 m-auto rounded-lg bg-red-50 dark:bg-blue-gray-900">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-red-900 dark:text-red-50">Users</h1>
      </div>

      {/* Table Container */}
      <div className="px-3 py-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm md:text-md rounded-lg shadow-xl  bg-white dark:bg-gray-800">
            <thead >
              <tr className="border-b border-red-200 dark:border-red-900/10 bg-red-100 dark:bg-gray-800">
                <th className="text-left p-3 px-5 text-red-900 dark:text-red-200">Name</th>
                <th className="text-left p-3 px-5 text-red-900 dark:text-red-200">Email</th>
                <th className="text-left p-3 px-5 text-red-900 dark:text-red-200">Role</th>
                <th className="p-3 px-5 text-right text-red-900 dark:text-red-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-red-100 dark:border-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 bg-white dark:bg-gray-800 transition-colors duration-200"
                  >
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.fullName}
                        readOnly
                        className="bg-transparent border-b border-red-200 dark:border-red-900/20 py-1 w-full text-red-900 dark:text-red-100 focus:border-red-500"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.email}
                        readOnly
                        className="bg-transparent border-b border-red-200 dark:border-red-900/20 py-1 w-full text-red-900 dark:text-red-100 focus:border-red-500"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-transparent dark:bg-red-900/20 border-b border-red-200 dark:border-red-900/20 py-1 w-full text-red-900 dark:text-red-100 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </td>
                    <td className="p-3 px-5 flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => handleSave(user)}
                        className="text-sm bg-red-700 text-red-50 hover:bg-red-600 dark:bg-red-800 dark:hover:bg-red-700 py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200 shadow-md"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="text-sm bg-red-800 text-red-50 hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-800 py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-200 shadow-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-red-500 dark:text-red-400">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;