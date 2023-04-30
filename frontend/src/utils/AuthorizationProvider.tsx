import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import UserService from "./UserService";

// Authorization Context Code
interface AuthortizationContextValue {
  authorizationRole: string | null;
  setAuthorizationRole: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthorizationContext = createContext<
  AuthortizationContextValue | undefined
>(undefined);

// Authorization Context Code
interface AuthorizationProps {
  children: React.ReactNode;
}

export const AuthorizationProvider: React.FC<AuthorizationProps> = ({
  children,
}) => {
  const [user, loading] = useAuthState(auth);
  const [authorizationRole, setAuthorizationRole] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (user) {
      UserService.syncUserAuthorizationRole(user.uid, setAuthorizationRole);

      // Following was an attempt to not pass setAuthroizationRole function
      // let getAuthorizationRole = async () =>
      //   await UserService.getUserAuthorization(user.uid);
      // let role = getAuthorizationRole;
      // setAuthorizationRole(role);
    }
  }, [user]);

  return (
    <AuthorizationContext.Provider
      value={{ authorizationRole, setAuthorizationRole }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
};
