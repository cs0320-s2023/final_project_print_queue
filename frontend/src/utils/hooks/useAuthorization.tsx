import { useContext } from "react";
import AuthorizationContext from "../Authorization/AuthorizationContext";

export const useAuthorization = () => {
  const authorizationContext = useContext(AuthorizationContext);

  // Authorization Context is undefined as default value.
  if (authorizationContext === undefined) {
    throw new Error("useAuthorization must be inside an AuthorizationProvider");
  }
  return authorizationContext;
};
