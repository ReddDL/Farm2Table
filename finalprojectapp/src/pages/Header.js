import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className='flex justify-center h-fit shadow-md'>
        <div className=' bg-midnight-green h-16 absolute top-5 rounded-xl z-10 w-full min-w-xs max-w-7xl flex justify-between items-center shadow-xl px-5 '>
            <div className='flex flex-1 gap-4 justify-start'>
                <NavLink className='text-tea-green' to='/products'> Products </NavLink>
                <NavLink className='text-tea-green' to='/products'> Orders </NavLink>
            </div>
            <div className=' flex flex-1 justify-center'>
                <NavLink className='text-tea-green volkhov-regular text-2xl ' to='/'> Farm2Table </NavLink>
            </div>
            <div className=' flex flex-1 gap-2 justify-end'>
                <button className='bg-alabaster rounded-3xl px-4 py-2'> Sign up</button>
                <button className='bg-tea-green rounded-3xl px-4 py-2'> Log in</button>
            </div>
        </div>
    </div>
  )
}

export default Header

