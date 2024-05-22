import {React, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    function handleLogout () {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/')
        window.location.reload();
    }

    function toggleDropdown() {
        setDropdownVisible(!dropdownVisible);
      }
    
      const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className='flex justify-center h-16 top-5 px-4 z-10 absolute mx-auto w-full'>
        <div className=' bg-midnight-green h-16 rounded-xl z-10 w-full min-w-xs max-w-7xl flex justify-between items-center shadow-xl px-5'>
            <div className='md:flex flex-1 gap-4 justify-start hidden'>
                <ul className='flex flex-1 gap-4 justify-start'>
                    <li><NavLink className='text-tea-green text-lg' to='/admin/dashboard'> Dashboard </NavLink></li>
                    <li><NavLink className='text-tea-green text-lg' to='/admin/products'> Products </NavLink></li>
                    <li><NavLink className='text-tea-green text-lg' to='/admin/orders'> Orders </NavLink></li>
                    <li><NavLink className='text-tea-green text-lg' to='/admin/users'> Users </NavLink></li>
                </ul>
            </div>
            <div className=' flex flex-1 justify-center'>
                <NavLink className='text-tea-green volkhov-regular text-2xl ' to='/'> Farm2Table </NavLink>
            </div>
            <div className=' flex flex-1 gap-2 justify-end'>
                <button className='bg-tea-green rounded-3xl px-4 py-2 md:block hidden' onClick={handleLogout}> Log out </button>
                <button onClick={toggleDropdown}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" className='fill-tea-green stroke-tea-green block md:hidden'><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 17h18M3 12h18M3 7h18"/></svg>
                </button>
                {dropdownVisible && (
                    <div className='absolute top-10 right-0 mt-2 w-32 bg-alabaster rounded-md shadow-lg z-20'>
                        <ul>
                            <li>
                                <button onClick={toggleDropdown}>
                                    <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/admin/dashboard'> Dashboard </NavLink>
                                </button>
                            </li>
                            <li>
                                <button onClick={toggleDropdown}>
                                    <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/admin/products'> Products </NavLink>
                                </button>
                            </li>
                            <li>
                                <button onClick={toggleDropdown}>
                                    <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/admin/orders'> Orders </NavLink>
                                </button>
                            </li>
                            <li>
                                <button onClick={toggleDropdown}>
                                    <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/admin/users'> Users </NavLink>
                                </button>
                                    </li>
                            <li>
                                <button onClick={toggleDropdown}>
                                <NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/profile'>Profile</NavLink>
                                </button>
                            </li>
                            <li>
                                <button onClick={toggleDropdown}>
                                    <div className='block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100' onClick={handleLogout}>Log Out</div>
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default Header

