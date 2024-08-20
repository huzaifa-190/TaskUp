import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../Hooks/useAuth";

function SignUp() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = ()=>{
    navigate('sign-up')
  }
  return (
    <div className="flex-col h-screen w-screen items-center justify-center py-4  sm:px-10 ">
      <div className="flex flex-col items-center justify-center h-[85%] w-full gap-5 ">
        <h1 className="text-7xl font-bold text-black">Hello!</h1>
        <h1 className="text-2xl mb-10 ">
          To start TODO you need to login first !
        </h1>
        <button className="btn flex w-44 items-center justify-center p-4 text-lg text-white bg-lightPurp"
          onClick={onsubmit}
        >
          Log in
        </button>
      </div>
    </div>
  );
}

export default SignUp;
