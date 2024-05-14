import React from 'react'
import FieldDrone1080Black from '../images/FieldDrone1080Black2.mp4';
import '../Fonts.css'

const Landing = () => {
  return (
    <div className='bg-eggshell'>
        <div className='h-screen w-full relative flex justify-center'>
            <video src={FieldDrone1080Black} autoPlay loop muted className='h-full w-screen object-cover'/>
            <div className=' border-solid border-2 border-red-600 absolute top-52 w-[80rem] flex justify-center max-w-5xl items-center flex-col'>
                <h1 className='text-center text-alabaster volkhov-bold text-4xl leading-tight sm:text-4xl md:text-5xl xl:text-6xl'>Bringing Food</h1>
                <h1 className='text-center text-alabaster volkhov-bold text-4xl leading-tight sm:text-3xl md:text-5xl xl:text-6xl'>Straight To Your Table</h1>
                <p className='poppins-regular text-center text-alabaster mt-3'> Join us in celebrating the journey from farm-fresh produce to your table, where flavors come alive and memories are made. Explore our seasonal delights and savor the essence of nature's bounty, handpicked and delivered with love. </p>
                <button className='poppins-regular bg-tea-green rounded-xl px-5 py-2 w-40 mt-5'> Shop now </button>
            </div>
        </div>
        <div className='flex flex-col items-center'>
            <h2 className='poppins-medium text-4xl'> What we offer</h2>
            <div className='h-[20rem] w-full border-solid border-black border-2'></div>
        </div>
        <section className=''>
            <div className='bg-periwinkle w-80 h-80 rounded-xl'> </div>
        </section>
        <footer className='bg-midnight-green h-52 flex flex-col items-center text-alabaster poppins-regular justify-center'>
            <h1 > Farm2Table</h1>
            <p> CMSC100 Final Project </p>
            <p> DE LEON, Richard Emmanuel D. </p>
            <p className=''> 2024</p>
        </footer>
    </div>
    
)
}

export default Landing
