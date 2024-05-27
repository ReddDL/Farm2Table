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
    <div className='bg-eggshell min-h-screen px-5 pt-28 pb-10'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='lato-bold text-4xl'> Total users: {userCount}</h1>
        {users.map((user) => (
          <AdminUserCard key={user.email} user={user} />
        ))}
      </div>
    </div>
  )
}

export default AdminUsers
