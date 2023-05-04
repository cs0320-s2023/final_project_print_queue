import PermissionContext from "./PermissionContext";

export enum PermissionValues {
  view = "view",
  add = "add",
  delete = "delete",
  dev = "dev",
}

interface PermissionsProps {
  permissions: PermissionValues[];
  children: React.ReactNode;
}

export const PermissionsProvider: React.FC<PermissionsProps> = ({
  children,
  permissions,
}) => {
  const isAllowedTo = (permission: PermissionValues) =>
    permissions.includes(permission);

  return (
    <PermissionContext.Provider value={{ isAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  );
};
