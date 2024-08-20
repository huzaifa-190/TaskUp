import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

function SignUp() {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  // ----------------------------------------------------- METHDOS ----------------------------------------------------
  const onSubmit = async (event) => {
    event.preventDefault();
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };

    setFormErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error);

    if (!hasErrors) {
      if (navigator.onLine) {
        try {
          const user = await signUp(email, password);
          setEmail("");
          setPassword("");
          navigate("/sign-in");
          toast.success(`Signed Up Successfully with : ${user.email}`, {
            autoClose: 1500,
          });
        } catch (error) {
          toast.error(
            `Failed to Sign Up. No user returned -> Sign Up Error: ${error.message}`
          );
        }
      } else {
        toast.warn("Chek your internet");
      }
    } else {
      console.log("form errors i.e empty fields -> ", formErrors);
    }
  };

  return (
    <div className="flex-col h-screen w-screen items-center justify-center py-4  sm:px-10">
      <div className="flex flex-col items-center justify-center h-[85%] w-full gap-5 ">
        <h1 className="text-4xl font-bold text-black mb-4">SignUp !</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setFormErrors({
              ...formErrors,
              password: false,
            });
          }}
          placeholder="Email"
          className={`input-fields focus textEllipsis 
            ${formErrors.password ? " requiredField " : ""}`}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setFormErrors({
              ...formErrors,
              password: false,
            });
          }}
          placeholder="password"
          className={`input-fields focus textEllipsis 
            ${formErrors.password ? " requiredField " : ""}`}
        />

        <button
          disabled={loading}
          className={`btn bg-purple-800 rounded-md text-white sm:w-72 py-4 ${
            loading ? "opacity-60 cursor-not-allowed" : "opacity-100"
          }`}
          onClick={onSubmit}
        >
          {loading ? (
            <ClipLoader
              color={"white"}
              size={20}
              aria-label="Signing In ..."
              data-testid="loader"
            />
          ) : (
            "Sign Up"
          )}
        </button>
        <h1>
          Already have an account ?
          <button
            className="font-bold ml-2 btn "
            onClick={() => navigate("/sign-in")}
          >
            {" "}
            LogIn
          </button>
        </h1>
      </div>
    </div>
  );
}

export default SignUp;
