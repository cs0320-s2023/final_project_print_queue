import { useAuthorization } from "../../utils/useAuthorization";

function HomePage() {
  const { authorizationRole, setAuthorizationRole } = useAuthorization();
  console.log(authorizationRole);
  const determineUserRole = () => {
    switch (authorizationRole) {
      case "user":
        return "Authenticated User";

      case "admin":
        return "Admin";
      case "viewer":
        return "Viewer";

      default:
        return "Viewer";
    }
  };

  return <p>User is a {determineUserRole()}</p>;
}

export default HomePage;
