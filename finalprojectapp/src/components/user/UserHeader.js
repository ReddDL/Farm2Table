import {React, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
// import './Landing.css';

const Header = () => {
  const navigate = useNavigate();

  function handleLogout () {
    localStorage.removeItem('token');
    navigate('/')
    window.location.reload();
  }

  function toggleDropdown() {
    setDropdownVisible(!dropdownVisible);
  }

  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className='flex justify-center h-fit shadow-md'>
        <div className=' bg-midnight-green h-16 absolute top-5 rounded-xl z-10 w-full min-w-xs max-w-7xl flex justify-between items-center shadow-xl px-5 '>
            {/* <div className='flex flex-1 gap-4 justify-start'> */}
                <ul className='flex flex-1 gap-4 justify-start'>
                <li>
                    <NavLink className='text-tea-green text-lg' to='user/products'> Products </NavLink>
                </li>
                </ul>
            {/* </div> */}
            <div className=' flex flex-1 justify-center'>
                <NavLink className='text-tea-green volkhov-regular text-2xl ' to='/'> Farm2Table </NavLink>
            </div>


            <ul className='flex flex-1 justify-end flex-row h-full items-center'>
                <li className='flex flex-row'>
                    <NavLink className='text-tea-green text-lg pr-10 ' to='#'> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V8q0-.825.588-1.412T6 6h2q0-1.65 1.175-2.825T12 2t2.825 1.175T16 6h2q.825 0 1.413.588T20 8v12q0 .825-.587 1.413T18 22zm4-16h4q0-.825-.587-1.412T12 4t-1.412.588T10 6m5 5q.425 0 .713-.288T16 10V8h-2v2q0 .425.288.713T15 11m-6 0q.425 0 .713-.288T10 10V8H8v2q0 .425.288.713T9 11"/></svg>
                    </NavLink>
                </li>
            <li className='relative'>
                <div onClick={toggleDropdown} className='cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" className='fill-tea-green' viewBox="0 0 1280 1536">
                    <path d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5m-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384"/>
                </svg>
                </div>
                {dropdownVisible && (
                <div className='absolute right-0 mt-2 w-32 bg-alabaster rounded-md shadow-lg z-20'>
                    <ul>
                    <li><NavLink className='block px-4 py-2 text-gray-800 hover:bg-gray-100' to='/profile'>Profile</NavLink></li>
                    <li><div className='block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100' onClick={handleLogout}>Log Out</div></li>
                    </ul>
                </div>
                )}
            </li>

            </ul>
        </div>
    </div>
  )
}

export default Header

