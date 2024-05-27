import React, { useEffect, useState } from 'react'
import AdminUserCard from '../components/admin/AdminUserCard.js'
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("http://localhost:3000/api/users/all");
        console.log(res.data);

        setUsers(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, [])

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/users/total");
        console.log(res.data.totalUsers);

        setUserCount(res.data.totalUsers)
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserCount();
  }, [])

  return (
    <div className='bg-eggshell flex flex-col px-8 lg:px-32 md:px-24 sm:px-10 pt-32 text-midnight-green pb-10 min-h-screen'>
      <h1 className='lato-bold text-4xl'> Total users: {userCount}</h1>
      <div className='bg-alabaster p-5 mb-5 rounded-xl mt-4 flex flex-row sm:flex-col md:flex-row sm:items-center flex-wrap justify-start gap-10'>
        {users.map((user) => (
          <AdminUserCard key={user.email} user={user} />
        ))}
      </div>
    </div>
  )
}

export default AdminUsers
