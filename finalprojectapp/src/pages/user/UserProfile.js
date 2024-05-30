import { useOutletContext } from "react-router-dom";
import UserOrderCard from "../../components/user/UserOrderCard";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const UserProfile = () => {
  // get user info
  const user = JSON.parse(localStorage.getItem('user'));
  // state variables
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [orders, setOrders] = useState([]);
  // state variables for form data
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    email: email
  });

  // update orders for re-render
  function updateOrders(order, index) {
    // placeholder for updating state variable
    const newOrders = [];
    // clone orders array
    orders.forEach((order, index) => {
      newOrders[index] = order
    })
    // assign new order
    newOrders[index] = order;
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

  async function updateProfile(e) {
    e.preventDefault();

    // update ui state variables
    for (const key in formData) {
      switch (key) {
        case "firstName":
          setFirstName(formData["firstName"])
          break;
        case "lastName":
          setLastName(formData["lastName"])
          break;
        case "email":
          setEmail(formData["email"])
          break;
      }
    }

    // update db profile
    try {
      const res = await axios.put("http://localhost:3000/api/users/update/profile", {
        ...formData
      })
    } catch (error) {
      console.log(error);
    }
    
    // update localStorage
    localStorage.setItem('user', JSON.stringify(
      Object.assign(
        {...JSON.parse(localStorage.getItem('user'))}, 
        {...formData}
    )))

    alert("Profile successfully updated!")
    document.getElementById("editProfileModal").open = false;
  }

  function handleFormChange(e) {
    const {name, value} = e.target;

    console.log(value)
    setFormData({
      ...formData,
      [name]: value.trim()
    })
  }

  function closeModal () {
    document.getElementById("editProfileModal").close()
  }

  return (
    <div className='bg-eggshell min-h-screen px-5 pt-28 pb-10'>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl lato-bold">My Profile</h1>
        <h5 className="mt-3 text-lg poppins-regular">Personal information</h5>
        <div className='flex bg-alabaster h-36 rounded-xl max-w-7xl mx-auto p-9 border border-solid border-gunmetal shadow-lg items-center'>
          <div className="flex-1 flex flex-col">
            <p className="text-2xl poppins-medium">{firstName} {lastName}</p>
            <p>{email}</p>
          </div>
          <button className="btn border-none bg-midnight-green hover:bg-periwinkle text-tea-green hover:text-black" onClick={() => 
              {
                document.getElementById("editProfileModal").showModal()
              }
            }>
              Edit Profile
          </button>
        </div>
        <h5 className="mt-8 text-lg poppins-regular">Order History</h5>
        {/* <div className='bg-alabaster h-fit rounded-xl max-w-7xl mx-auto p-9 border border-solid border-gunmetal shadow-lg flex flex-col gap-4'> */}
          {orders.map((order, index) => (
            <UserOrderCard key={index} order={order} updateOrders={updateOrders} />
          ))}
        {/* </div> */}
      </div>
      {/* Modal for editing profile info */}
      <dialog id="editProfileModal" className="modal overflow-hidden">
        <div className="modal-box flex flex-col bg-white p-8 text-black">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <div className="divider divider-neutral"></div>
          <form className="flex-1 flex flex-col justify-around gap-10" onSubmit={updateProfile} >
            <div className="flex-1 flex flex-col justify-around gap-5 px-2">
              <div className="flex flex-col">
                <label className="p-1"> First Name </label>
                <input 
                  type="text" 
                  placeholder="First Name"
                  defaultValue={firstName}
                  name="firstName"
                  onChange={handleFormChange}
                  className="bg-eggshell rounded-box p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="p-1"> Last Name </label>
                <input 
                  type="text" 
                  placeholder="Last Name"
                  defaultValue={lastName}
                  name="lastName"
                  onChange={handleFormChange}
                  className="bg-eggshell rounded-box p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="p-1"> Email Address </label>
                <input 
                  type="text" 
                  placeholder="Email Address"
                  defaultValue={email}
                  name="email"
                  onChange={handleFormChange}
                  className="bg-eggshell rounded-box p-2"
                />
              </div>
            </div>
            <div className="flex gap-8">
              <button 
                type="submit" 
                className="btn flex-1 border-none bg-midnight-green text-white" 
                onClick={closeModal}>
                Save Changes
              </button>
              <button 
                type="reset" 
                className="btn flex-1 border-none hover:bg-[#a60500] bg-[#d40700] text-white" 
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default UserProfile;
