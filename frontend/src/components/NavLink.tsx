import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";

interface NavLinkProps {
  to: string;
  children: JSX.Element | string;
}

function MyNavLink({ to, children }: NavLinkProps) {
  const linkColor = useColorModeValue("black", "gray.200");
  const linkHoverColor = useColorModeValue("#FF7B15", "white");

  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      p={2}
      fontSize="lg"
      fontWeight="bold"
      color={linkColor}
      _hover={{
        textDecoration: "none",
        color: linkHoverColor,
      }}
    >
      {children}
    </ChakraLink>
  );
}

export default MyNavLink;
