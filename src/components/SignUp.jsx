import React from "react";

function SignUp() {
  return(
  
    <div className="flex-col h-screen w-screen items-center justify-center py-4  sm:px-10">
      {/* TOP Header  */}
        <div className="flex h-[15%] w-ful px-4 ">
            {/* Left Div in Header containing Logo */}
            <button className="flex items-center gap-1">
            <h1 className="flex items-center justify-center h-12 w-12 p-4 rounded-full text-white bg-lightPurp text-2xl font-bold">
                To
            </h1>
            <h1 className="text-xl font-bold">Do</h1>
            </button>
        </div>

        <div className="flex flex-col items-center justify-center h-[85%] w-full gap-5 ">

            <h1 className="text-7xl font-bold text-black">Hello!</h1>
            <h1 className="text-2xl mb-10 ">To start TODO you need to login first !</h1>
            <input
            type="text"
            placeholder="Continue with email ..."
            className="h-10  w-72  sm:w-[350px] bg-white border-2 border-lightPurp p-4 rounded-md active: outline-2 active: outline-lightPurp"
            />


        </div>
    </div>
  )
}

export default SignUp;
