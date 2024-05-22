import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import axios from "axios";
// import './Landing.css';


const Header = () => {
     
    const [dropdownVisible, setDropdownVisible] = useState(false);
  
    function toggleDropdown() {
        setDropdownVisible(!dropdownVisible);
    }


  return (
    <div className='flex justify-center h-16 top-5 px-4 z-10 absolute mx-auto w-full shadow-md'>
        <div className=' bg-midnight-green h-16 rounded-xl z-10 w-full min-w-xs max-w-7xl flex justify-between items-center shadow-xl px-5'>
            <div className='flex flex-1 gap-4 justify-start'>
                {/* <ul className='flex flex-1 gap-4 justify-start'>
                <li>
                    <NavLink className='text-tea-green text-lg' to='user/products'> Products </NavLink>
                </li>
                <li>
                    <NavLink className='text-tea-green text-lg' to='/products'> Orders </NavLink>
                </li>
                </ul> */}
            </div>
            <div className=' flex flex-1 justify-center'>
                <NavLink className='text-tea-green volkhov-regular text-2xl ' to='/'> Farm2Table </NavLink>
            </div>
            <div className=' flex flex-1 gap-2 justify-end'>
                <button onClick={toggleDropdown}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" className='fill-tea-green stroke-tea-green sm:hidden block'><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17h18M3 12h18M3 7h18"/></svg>
                </button>
                {dropdownVisible && (
                <div className='absolute right-0 mt-2 w-32 bg-alabaster rounded-md shadow-lg z-20 '>
                    <ul>
                    <li><NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/sign-up'>Sign up</NavLink></li>
                    <li><NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/sign-in'>Log in</NavLink></li>

                    </ul>
                </div>
                )}
                <a className='bg-alabaster rounded-3xl px-4 py-2 hidden sm:block' href='/sign-up' > Sign up</a>
                <a className='bg-tea-green rounded-3xl px-4 py-2 hidden sm:block' href='/sign-in'> Log in</a>

            </div>
        </div>
    </div>
  )
}

export default Header