import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

function NavBar() {
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
        <Link to="/login">Login</Link>
      </Box>
    </Box>
  );
}

export default NavBar;
