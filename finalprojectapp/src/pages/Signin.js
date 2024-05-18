import React, { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Fonts.css'
import GreenTopo from '../images/GreenTopo.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    async function handleLogin (event) {
        event.preventDefault()
        try {
            // login request, returns token if successful
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                password
            })

            const token = res.data.token;
            // console.log(token)
            
            // clear email and password
            setEmail('')
            setPassword('')

            // user prompt for successful login
            alert('Login successful')

            // return to landing page
            navigate('/')
                
            window.location.reload();
            // store token for access between pages
            localStorage.setItem('token', token)
        } catch (error) {
            alert('Login error')
            console.log('Login Error', error)
        }
    }
    

    return (
      <div className ="bg-eggshell w-screen h-screen text-gunmetal poppins-light border-2 border-solid border-black">
            {/* <div className='h-screen w-full relative flex justify-center'> */}
                {/* <img src={GreenTopo} autoPlay loop muted className='h-full w-full object-cover'/> */}
            {/* </div> */}
            <section className="z-10 relative top-1/2 translate-y-[-50%] mx-auto p-8 rounded-2xl max-w-lg bg-alabaster">
                <h1 className="text-4xl mb-3 poppins-regular">Login</h1>
                {/* <h1 className = "text-2xl mb-8 poppins-light">Are you ready to support our farmers?</h1> */}
                <form onSubmit={handleLogin} className='w-full'>
                    {/* Email */}
                    <input 
                        placeholder="Email" 
                        className="rounded-md h-12 w-full bg-alabaster border-2 border-gunmetal mb-4 p-2" 
                        type="text" 
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}/>
                    {/* Password */}
                    {/* <label className="mt-4">Password:</label> */}
                    <div>
                        <input type={showPassword ? 'text' : 'password'}
                                placeholder="Password" 
                                className="rounded-md h-12 bg-alabaster border-2 border-gunmetal w-full p-2" 
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                        <button className="float-end mt-4 mr-3" onClick={togglePasswordVisibility} type="submit">
                            {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                        </button>
                    </div>
                    <button className="bg-gunmetal text-alabaster w-full mt-3 h-14 rounded-xl ">Sign in</button>
                </form>
                
                <div>
                    <label>Don't have an account yet? <a href="/sign-up" className='underline text-periwinkle poppins-medium'>Sign up</a></label>
                </div>
                
        </section>
        {/* <div className = "w-1/2 h-screen">
            <img className = "object-cover w-full h-full" src = {require('../images/farmer.jpg')}/>
        </div> */}
            
      </div>
    );
  }
  
  export default Signin;