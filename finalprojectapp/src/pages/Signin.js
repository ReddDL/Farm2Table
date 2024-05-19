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
      <div className ="bg-periwinkle w-screen h-screen text-gunmetal poppins-light p-3">
            <section className="z-10 relative top-1/2 translate-y-[-50%] mx-auto p-8 rounded-2xl max-w-lg bg-alabaster">
            <h1 className="text-4xl mb-3 lato-bold">Login</h1>
            <form onSubmit={handleLogin} className='w-full'>
                {/* Email */}
                <input 
                    placeholder="Email" 
                    className="rounded-lg h-12 w-full bg-alabaster border border-gray-400 mb-4 p-2" 
                    type="text" 
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}/>
                {/* Password */}
                <div>
                    <input type={showPassword ? 'text' : 'password'}
                            placeholder="Password" 
                            className="rounded-lg h-12 bg-alabaster border border-gray-400 w-full p-2" 
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            />
                    <button className="float-end mt-4 mr-3" onClick={togglePasswordVisibility} type="submit">
                        {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                    </button>
                </div>
                <button className="bg-gunmetal text-alabaster w-full mt-3 h-10 rounded-xl lato-regular text-lg">Sign in</button>
            </form>
            
            <div>
                <label className='text-sm'>Don't have an account yet? <a href="/sign-up" className='underline text-periwinkle poppins-medium'>Sign up</a></label>
            </div>
        </section>
      </div>
    );
  }
  
  export default Signin;