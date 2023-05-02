import { createContext } from "react";

interface AuthortizationContextValue {
  authorizationRole: string;
  setAuthorizationRole: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue = {
  authorizationRole: "viewer",
  setAuthorizationRole: () => {},
};

const AuthorizationContext = createContext<
  AuthortizationContextValue | undefined
>(defaultContextValue);

export default AuthorizationContext;
