import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

function SignUp() {
    const navigate = useNavigate();
    const { signUp } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const onSubmit = async () => {
        try {
            const user = await signUp(email, password);
            setEmail('')
            setPassword('')
            navigate('/sign-in')
            toast.success(`Signed Up Successfully with : ${user.email}`); // Customize the message as needed
        } catch (error) {
            // throw error
            toast.error(
                `Failed to Sign Up. No user returned -> Sign Up Error: ${error.message}`
            );
        }
    };
    
    return (
    <div className="flex-col h-screen w-screen items-center justify-center py-4  sm:px-10">
      <div className="flex flex-col items-center justify-center h-[85%] w-full gap-5 ">
        <h1 className="text-4xl font-bold text-black">SignUp !</h1>
        {/* <h1 className="text-2xl mb-10 ">
          To start TODO you need to SignUp first !
        </h1> */}
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="h-10  w-72  sm:w-[350px] bg-white border-2 border-lightPurp p-4 rounded-md active: outline-2 active: outline-lightPurp"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="h-10  w-72  sm:w-[350px] bg-white border-2 border-lightPurp p-4 rounded-md active: outline-2 active: outline-lightPurp"
        />

        <button
          className="btn bg-purple-800 rounded-md text-white w-36 py-4"
          onClick={() => onSubmit()}
        >
          Sign Up
        </button>
        <button className=" text-black btn" onClick={()=>navigate('/sign-in')}>I already have an account</button>
      </div>
    </div>
  );
}

export default SignUp;
