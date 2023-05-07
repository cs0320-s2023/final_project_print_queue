import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthorizationContext from "./AuthorizationContext";
import { auth } from "../firebase";
import UserService from "../UserService";

interface AuthorizationProps {
  children: React.ReactNode;
}

export const AuthorizationProvider: React.FC<AuthorizationProps> = ({
  children,
}) => {
  const [user, loading] = useAuthState(auth);
  const [authorizationRole, setAuthorizationRole] = useState<string>("viewer");

  useEffect(() => {
    if (user) {
      UserService.syncUserAuthorizationRole(
        user.uid,
        setAuthorizationRole
      ).then((role) => {
        setAuthorizationRole(role);
        window.localStorage.setItem("authorization", role);
      });
    }
  }, [user]);

  return (
    <>
      {loading ? (
        <div> </div>
      ) : (
        <AuthorizationContext.Provider
          value={{ authorizationRole, setAuthorizationRole }}
        >
          {children}
        </AuthorizationContext.Provider>
      )}
    </>
  );
};
