import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
function SignUp() {

  const navigate = useNavigate();
  const { signIn} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const onSubmit = async () => {
      try {
          const user = await signIn(email, password);
          setEmail("");
          setPassword("");
          toast.success(`Signed In Successfully with : ${user.email}`); 
          navigate('/home',{replace: true})
    } catch (error) {
      // throw error
      toast.error(
        `Failed to Sign In ::  ${error.message}`
      );
    }
  };
  return (
    <div className="flex-col h-screen w-screen items-center justify-center py-4  sm:px-10 overflow-x-hidden">
      <div className="flex flex-col items-center justify-center h-[85%] w-full gap-5 ">
        <h1 className="text-4xl font-bold text-black">SignIn Here!</h1>
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
          Sign In
        </button>
        <button className=" btn " onClick={()=>navigate('/sign-up')}>Create account</button>
      </div>
    </div>
  );
}

export default SignUp;
