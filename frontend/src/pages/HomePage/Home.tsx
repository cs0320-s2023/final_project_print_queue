import {
  PermissionValues,
  PermissionsProvider,
} from "../../utils/Permissions/PermissionProvider";

import Restricted from "../../utils/Permissions/Restricted";
import { useAuthorization } from "../../utils/hooks/useAuthorization";
import { determineUserRole } from "../../utils/Permissions/determineUserPermissions";

function HomePage() {
  const { authorizationRole } = useAuthorization();
  console.log(authorizationRole);

  return (
    <>
      {authorizationRole && (
        <PermissionsProvider permissions={determineUserRole(authorizationRole)}>
          <div>
            <p>Everyone Can see</p>
            <Restricted to={PermissionValues.delete}>
              <p>Admin Can see</p>
            </Restricted>
            <Restricted to={PermissionValues.dev}>
              <p>Dev Permission</p>
            </Restricted>
            <Restricted to={PermissionValues.add}>
              <p>Authenticated Can see</p>
            </Restricted>
          </div>
        </PermissionsProvider>
      )}
    </>
  );
}

export default HomePage;
