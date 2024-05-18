import { useNavigate } from "react-router-dom";

export default function NoPage () {
  const navigate = useNavigate();

  function handleReturn () {
    navigate("/")
  }

  return(
    <div className="flex flex-col justify-center items-center content-center gap-5">
      <div className="flex-1 text-5xl">
        Page Not Found
      </div>
      <div className="btn w-fit flex-1 text-lg" onClick={handleReturn}>
        Return to Home Page
      </div>
    </div>
  )
}