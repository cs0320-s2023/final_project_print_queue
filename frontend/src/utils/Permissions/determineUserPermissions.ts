import { PermissionValues } from "./PermissionProvider";

export enum AuthRoles {
  admin = "admin",
  user = "user",
  viewer = "viewer",
  dev = "dev",
}

export const roleToPermissions: { [key in AuthRoles]: PermissionValues[] } = {
  viewer: [PermissionValues.view],
  user: [PermissionValues.view, PermissionValues.add],
  admin: [PermissionValues.view, PermissionValues.add, PermissionValues.delete],
  dev: [
    PermissionValues.view,
    PermissionValues.add,
    PermissionValues.delete,
    PermissionValues.dev,
  ],
};

export const determineUserRole = (authorizationRole: string) => {
  switch (authorizationRole) {
    case "user":
      return roleToPermissions.user;
    case "admin":
      return roleToPermissions.admin;
    case "viewer":
      return roleToPermissions.viewer;
    default:
      return [];
  }
};
