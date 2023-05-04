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

  // useEffect(() => {
  //   setAuthorizationRole(
  //     JSON.parse(window.localStorage.getItem("authorization"))
  //   );
  // }, [authorizationRole]);

  useEffect(() => {
    if (user) {
      UserService.syncUserAuthorizationRole(
        user.uid,
        setAuthorizationRole
      ).then((role) => {
        setAuthorizationRole(role);
        window.localStorage.setItem("authorization", role);
      });

      // Following was an attempt to not pass setAuthroizationRole function
      // let getAuthorizationRole = async () =>
      //   await UserService.getUserAuthorization(user.uid);
      // let role = getAuthorizationRole;
      // setAuthorizationRole(role);
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
