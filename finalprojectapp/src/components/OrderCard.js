import React from 'react'

const OrderCard = () => {
  return (
    <div className='h-32 w-full bg-white flex items-center justify-between rounded-xl'>
        {/* image */}
        <div className='flex items-center'>
            <div className='h-28 w-28 ml-2 bg-periwinkle rounded-xl'></div>
              <h1 className='poppins-medium self-baseline pl-3 text-xl'>Order id</h1>
            </div>
        <button className='bg-midnight-green px-5 py-4 rounded-xl mr-2 text-white'> Confirm order </button>
    </div>
  )
}

export default OrderCard
