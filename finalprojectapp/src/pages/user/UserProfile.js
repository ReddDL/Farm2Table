import { useOutletContext } from "react-router-dom";

const UserProfile = () => {
  // get userId from user layout context
  const userId = useOutletContext();

  return (
    <div className='flex justify-center h-fit shadow-md'>
      <h1> 
        My profile 
      </h1>
      <h5>
        Personal information
      </h5>
      {/* <div className=' bg-midnight-green h-16 absolute top-5 rounded-xl z-10 w-full min-w-xs max-w-7xl flex justify-between items-center shadow-xl px-5 '>
      </div> */}
    </div>
  )
}

export default UserProfile