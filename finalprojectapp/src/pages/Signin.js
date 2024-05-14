import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Fonts.css'

function Signup() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
      <div className =" bg-eggshell w-screen h-screen flex flex-row justify-center items-center text-gunmetal poppins-light">
        <div className = "flex flex-col justify-center w-1/2 h-full items-center">
            <label className="text-5xl pb-3 poppins-regular leading-3">Welcome back!</label>
            <label className = "text-2xl pb-8 poppins-light">Are you ready to support our farmers?</label>
            
            <div className="flex flex-col flex-wrap text-xl px-28">
                <div className="pb-3 flex flex-row gap-3">
                </div>
                
                <label >Email:</label>
                <input 
                    // placeholder="Enter your email" 
                    className="rounded-md h-12 bg-eggshell border-2 border-gunmetal" 
                    type="text" 
                    id="email"/>
                
                <label className="mt-4">Password:</label>
                <div>
                    <input type={showPassword ? 'text' : 'password'}
                            // placeholder="Enter your password" 
                            className="rounded-md h-12 bg-eggshell border-2 border-gunmetal w-full" 
                            id="password"/>
                    <button className="float-end mt-4 mr-3" onClick={togglePasswordVisibility}>
                        {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                    </button>
                </div>
                
                
                <button className="bg-gunmetal text-alabaster mt-3 h-14 rounded-xl mt-10">Sign in</button>
                <div>
                    <label>Don't have an account yet? <a href="#" className='underline text-periwinkle poppins-medium'>Sign up</a></label>
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