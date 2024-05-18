import { useOutletContext } from "react-router-dom";

const UserCart = () => {
  // get userId from user layout context
  const userId = useOutletContext;

  return (
    <div className='flex justify-center h-fit shadow-md'>
    </div>
  )
}

export default UserCart