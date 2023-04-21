import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  // Google Authentication
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/profile");
      console.log(result.user);
    } catch (error) {
      console.log("error");
    }
  };

  // Redirects user to dashboard if they are already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <div>
      <h2>Join Today</h2>
      <div>
        <h3>Sign in with Google</h3>
      </div>
      <div>
        <button onClick={GoogleLogin}>
          <FcGoogle />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
