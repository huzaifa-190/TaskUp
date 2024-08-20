import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

function Auth({ children }) {
  const { currentUser, loading } = useAuth();

  // If Firebase is performing opearation , don't render anything 
  if (loading) return null

    if (currentUser) {
      return children;
    } else {
      toast.warn("Sign In to continue...");
      return <Navigate to="/sign-in" replace />;
    }
}

export default Auth;
