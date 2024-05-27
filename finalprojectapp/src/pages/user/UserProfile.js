import { useOutletContext } from "react-router-dom";
import UserOrderCard from "../../components/user/UserOrderCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const UserProfile = () => {
  // get user info
  const { firstName, lastName, email } = JSON.parse(localStorage.getItem('user'));
  const [orders, setOrders] = useState([]);

  // update orders for re-render
  function updateOrders(order, index) {
    console.log("y", order)
    // placeholder for updating state variable
    const newOrders = [];
    // clone orders array
    orders.forEach((order, index) => {
      newOrders[index] = order
    })
    // assign new order
    newOrders[index] = order;
    console.log("new", newOrders)
    // update state variable
    setOrders(newOrders);
  }

  // fetch user's orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("http://localhost:3000/api/orders/getUserOrders")
        // update state variable
        setOrders(res.data);
      } catch (error) {
        switch (error?.response?.status) {
          case 404:
            console.log("No orders found")
          case 500:
            console.log("Server error fetching user orders")
        }
      }
    }
    fetchOrders();
  }, [])

  return (
    <div className='bg-eggshell min-h-screen px-5 pt-28 pb-10'>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lato-bold">My Profile</h1>
        <h5 className="mt-3 text-lg poppins-regular">Personal information</h5>
        <div className='bg-alabaster h-36 rounded-xl max-w-7xl mx-auto p-9 border border-solid border-gunmetal shadow-lg'>
          <p className="text-2xl poppins-medium">{firstName} {lastName}</p>
          <p>{email}</p>
        </div>
        <h5 className="mt-8 text-lg poppins-regular">Order History</h5>
        {/* <div className='bg-alabaster h-fit rounded-xl max-w-7xl mx-auto p-9 border border-solid border-gunmetal shadow-lg flex flex-col gap-4'> */}
          {orders.map((order, index) => (
            <UserOrderCard key={index} order={order} updateOrders={updateOrders} />
          ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default UserProfile;
