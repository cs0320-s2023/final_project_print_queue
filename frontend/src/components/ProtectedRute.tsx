import { Navigate } from "react-router";
import { useAuthorization } from "../utils/Authorization/useAuthorization";

interface Props {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { authorizationRole } = useAuthorization();
  console.log(authorizationRole);
  let authRole = localStorage.getItem("authorization");
  console.log(authRole);

  if (!(authRole === "admin")) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
