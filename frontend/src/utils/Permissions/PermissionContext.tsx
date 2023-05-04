import { createContext } from "react";
import { PermissionValues } from "./PermissionProvider";

interface PermissionContextValue {
  isAllowedTo: (permission: PermissionValues) => boolean;
}

const defaultBehaviour: PermissionContextValue = {
  isAllowedTo: () => true,
};

const PermissionContext =
  createContext<PermissionContextValue>(defaultBehaviour);

export default PermissionContext;
