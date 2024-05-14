import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
      <div className =" bg-eggshell w-screen h-screen flex flex-row justify-center items-center text-gunmetal">
        <div className = "flex flex-col justify-center w-1/2 items-center">
            <label className="text-6xl pb-3">Welcome to our cause!</label>
            <label className = "text-3xl pb-8">Are you ready to support our farmers?</label>
            
            <div className="flex flex-col flex-wrap text-xl">
                <div className="pb-3 flex flex-row">
                    <div className="flex flex-col">
                        <label className="pr-3">First name:</label>
                        <input 
                            placeholder="Enter your First Name" 
                            className="resize rounded-md w-80 h-12 mr-5 bg-eggshell border-2 border-gunmetal" 
                            id="fname"/>
                    </div>
                    <div className="flex flex-col">
                        <label className=" pr-3">Last name:</label>
                        <input 
                            placeholder="Enter your Last Name" 
                            className="resize rounded-md w-80 h-12 bg-eggshell border-2 border-gunmetal" 
                            id="lname" 
                            name="lname"/>
                    </div>
                </div>
                
                <label >Email:</label>
                <input 
                    placeholder="Enter your email" 
                    className="resize rounded-md h-12 bg-eggshell border-2 border-gunmetal" 
                    type="text" 
                    id="email"/>
                
                <label className="mt-4">Password:</label>
                <div>
                    <input type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password" 
                            className="resize rounded-md h-12 bg-eggshell border-2 border-gunmetal w-11/12" 
                            id="password"/>
                    <button className="float-end mt-4 mr-3" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                
                
                <button className="bg-gunmetal text-alabaster mt-3 h-14 rounded-xl mt-10">SUBMIT</button>
                <div>
                    <label>Already have an account? Login</label>
                </div>
                
            </div>

             
        </div>
        <div className = "w-1/2 h-screen bg-oxford-blue flex items-center justify-center rounded-xl">

            <img className = "object-fill size-11/12 rounded-xl" src = {require('../images/farmer.jpg')}/>

        </div>
            
      </div>
    );
  }
  
  export default Signup;