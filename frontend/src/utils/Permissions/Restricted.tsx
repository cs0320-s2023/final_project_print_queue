import React from "react";
import usePermission from "./usePermissions";
import { PermissionValues } from "./PermissionProvider";

type Props = {
  to: PermissionValues;
  children: React.ReactNode;
};

// This component is meant to be used everywhere a restriction based on user permission is needed
// Source: https://medium.com/geekculture/how-to-conditionally-render-react-ui-based-on-user-permissions-7b9a1c73ffe2
const Restricted: React.FunctionComponent<Props> = ({ to, children }) => {
  // const { isAllowedTo } = useContext(PermissionContext);

  const allowed = usePermission(to);

  // If the user has that permission, render the children
  // to is a string refering to the permission needed to view the children of the restricted component
  if (allowed) {
    return <>{children}</>;
  }

  // Otherwise, do not render anything
  return null;
};

export default Restricted;
