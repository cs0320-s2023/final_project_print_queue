import React, { useState } from "react";

import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import {
  Flex,
  HStack,
  Heading,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import NavLink from "./NavLink";
import { useAuthorization } from "../utils/hooks/useAuthorization";

const navItems = [
  {
    label: "Queue",
    endpoint: "/queue",
  },
  {
    label: "Printers",
    endpoint: "/printers",
  },
  {
    label: "Resources",
    endpoint: "/resources",
  },
];

function Nav() {
  const [user, loading] = useAuthState(auth);
  const { setAuthorizationRole } = useAuthorization();

  const location = useLocation();
  const hideNavbarPaths = ["/auth/login", "/auth/signup"];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null; // don't render navbar on login/signup pages
  }

  return (
    <Flex w="100%" px="6" py="5" justify="space-between" alignItems="center">
      <Heading as="h1" size="lg">
        <ReactRouterLink to="/">PrintQ</ReactRouterLink>
      </Heading>
      <HStack spacing={5} alignItems="center">
        <HStack justify="space-between" spacing={6}>
          {navItems.map((navItem, index) => (
            <NavLink key={index} to={navItem.endpoint}>
              {navItem.label}
            </NavLink>
          ))}
        </HStack>
        {!user && (
          <HStack spacing={5}>
            <Button
              as={ReactRouterLink}
              to="/auth/login"
              size="md"
              fontSize="md"
              fontWeight="medium"
              px="5"
              py="3"
              borderRadius="md"
              _hover={{
                textDecoration: "none",
              }}
            >
              Log In / Sign Up
            </Button>
          </HStack>
        )}
        {user && (
          <Menu>
            <MenuButton as={Button} variant={"unstyled"}>
              <Avatar
                // name="Dan Abrahmov"
                size="md"
                src={user.photoURL != null ? user.photoURL : undefined}
              />
            </MenuButton>
            <MenuList>
              <MenuItem as={ReactRouterLink} to="/profile">
                Profile
              </MenuItem>
              <MenuItem
                as={ReactRouterLink}
                to="/"
                onClick={() => {
                  localStorage.setItem("authorization", "viewer");
                  setAuthorizationRole("viewer");
                  auth.signOut();
                }}
              >
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </Flex>
  );
}

export default Nav;
