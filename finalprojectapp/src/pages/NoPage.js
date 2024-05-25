import { useNavigate } from "react-router-dom";

export default function NoPage () {
  const navigate = useNavigate();

  // return to home page
  function handleReturn () {
    navigate("/");
    window.location.reload();
  }

  return(
    <div className="h-dvh outline outline-black/60 flex flex-col justify-center place-items-center gap-5">
      <div className="text-5xl">
        Page Not Found
      </div>
      <div className="btn w-fit text-lg" onClick={handleReturn}>
        Return to Home Page
      </div>
    </div>
  )
}