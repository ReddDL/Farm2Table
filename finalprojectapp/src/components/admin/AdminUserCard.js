import React from 'react'

const AdminOrderCardDash = ({ user }) => {

  return (
    <div className='h-32 w-full bg-white flex items-center justify-between rounded-xl border-solid border border-gunmetal'>
      {/* image */}
      <div className='flex items-center'>
        <div className='h-28 w-28 ml-2 bg-periwinkle rounded-xl'></div>
        <div className='pl-3'>
          <h1 className='poppins-medium text-xl'> {user.firstName} {user.lastName}</h1>
          <p className='poppins-regular'> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderCardDash
