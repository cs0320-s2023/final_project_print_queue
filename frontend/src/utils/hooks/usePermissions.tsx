import { useContext } from "react";
import PermissionContext from "../Permissions/PermissionContext";
import { PermissionValues } from "../Permissions/PermissionProvider";

const usePermission = (permission: PermissionValues) => {
  const { isAllowedTo } = useContext(PermissionContext);
  return isAllowedTo(permission);
};

export default usePermission;
