import { useContext } from "react";
import PermissionContext from "./PermissionContext";
import { PermissionValues } from "./PermissionProvider";

const usePermission = (permission: PermissionValues) => {
  const { isAllowedTo } = useContext(PermissionContext);
  return isAllowedTo(permission);
};

export default usePermission;
