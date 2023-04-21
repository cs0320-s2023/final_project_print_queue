import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function Nav() {
  const [user, loading] = useAuthState(auth);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      align-items="center"
      width="100%"
    >
      <Box></Box>
      <Box display="flex" flexDirection="row">
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/queue">Queue</Link>
        <Link to="/printers">Printers</Link>
        {!user && <Link to="/auth/login">Login</Link>}
        {user && (
          <div>
            <Link to="/profile">
              <img
                src={user.photoURL != null ? user.photoURL : undefined}
                alt="avatar"
              />
            </Link>
          </div>
        )}
      </Box>
    </Box>
  );
}

export default Nav;
