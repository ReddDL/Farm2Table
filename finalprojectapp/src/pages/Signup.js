import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Fonts.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    // state variables for user fields
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // handle registration after sign up button is clicked
    async function handleSignup (event) {
        event.preventDefault()
        try {
            // signup request, returns token if successful
            const res = await axios.post('http://localhost:3000/api/auth/register', {
                firstName,
                lastName,
                email,
                password
            })

            const token = res.data.token;
            // console.log(token)

            // clear email and password
            setEmail('')
            setPassword('')

            // user prompt for successful login
            alert('Registration successful')

            // return to landing page
            // TODO: change based on userType
            navigate('/user')
                
            window.location.reload();
            // store token for access between pages
            localStorage.setItem('token', token)
        } catch (error) {
            alert('Resgistration error')
            console.log('Registration Error', error)
        }
    }

    return (
      <div className =" bg-eggshell w-screen h-screen flex flex-row justify-center items-center text-gunmetal poppins-light">
        <div className = "flex flex-col justify-center w-1/2 h-full items-center">
            <label className="text-5xl pb-3 poppins-regular leading-3">Welcome to our cause!</label>
            <label className = "text-2xl pb-8 poppins-light">Are you ready to support our farmers?</label>
            
            <div className="flex flex-col flex-wrap text-xl px-28">
                <form onSubmit={handleSignup}>
                    {/* Name */}
                    <div className="pb-3 flex flex-row gap-3">
                        {/* First Name */}
                        <div className="flex flex-col w-1/2">
                            <label>First name:</label>
                            <input 
                                // placeholder="Enter your First Name" 
                                className="resize rounded-md w-full h-12 mr-5 bg-eggshell border-2 border-gunmetal px-3" 
                                id="fname"
                                onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        {/* Last Name */}
                        <div className="flex flex-col w-1/2">
                            <label >Last name:</label>
                            <input 
                                // placeholder="Enter your Last Name" 
                                className="resize rounded-md w-full h-12 bg-eggshell border-2 border-gunmetal" 
                                id="lname" 
                                name="lname"
                                onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>
                    {/* Email */}
                    <label >Email:</label>
                    <input 
                        // placeholder="Enter your email" 
                        className="rounded-md h-12 bg-eggshell border-2 border-gunmetal" 
                        type="text" 
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                    {/* Password */}
                    <label className="mt-4">Password:</label>
                    <div>
                        <input type={showPassword ? 'text' : 'password'}
                                // placeholder="Enter your password" 
                                className="rounded-md h-12 bg-eggshell border-2 border-gunmetal w-full" 
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}/>
                        <button className="float-end mt-4 mr-3" onClick={togglePasswordVisibility}>
                            {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                        </button>
                    </div>
                    
                    
                    <button className="bg-gunmetal text-alabaster mt-3 h-14 rounded-xl mt-10">Sign up</button>
                </form>
                <div>
                    <label>Already have an account? <a href="#" className='underline text-periwinkle poppins-medium'>Login</a></label>
                </div>
                
            </div>

             
        </div>
        <div className = "w-1/2 h-screen">
            <img className = "object-cover w-full h-full" src = {require('../images/farmer.jpg')}/>
        </div>
            
      </div>
    );
  }
  
  export default Signup;