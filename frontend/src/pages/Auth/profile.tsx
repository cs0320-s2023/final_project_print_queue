import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthorization } from "../../utils/useAuthorization";

function Profile() {
  const [user, loading] = useAuthState(auth);
  const { authorizationRole, setAuthorizationRole } = useAuthorization();

  const navigate = useNavigate();
  if (loading) return <h1>Loading...</h1>;
  if (!user) {
    navigate("/auth/login");
  }
  if (user) {
    return (
      <div>
        <h1>User Profile Page</h1>
        <button
          onClick={() => {
            setAuthorizationRole("viewer");
            auth.signOut();
          }}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>Redirecting to login</p>;
        <Navigate to="/auth/login" />
      </div>
    );
  }
}

export default Profile;
