import "./Home.css";
import { Link as ReactRouterLink } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";

import {
  PermissionValues,
  PermissionsProvider,
} from "../../utils/Permissions/PermissionProvider";

import Restricted from "../../utils/Permissions/Restricted";
import { determineUserRole } from "../../utils/Permissions/determineUserPermissions";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAuthorization } from "../../utils/hooks/useAuthorization";

function HomePage() {
  const { authorizationRole } = useAuthorization();
  const [user, loading] = useAuthState(auth);
  console.log(authorizationRole);

  return (
    <>
      <div>
        <Box className="ellipse-1" />
        <Box className="ellipse-3" />
        <Box className="ellipse-2" />
        <Grid
          gridTemplateRows={"auto auto"}
          gridTemplateColumns={"1fr 1fr 1fr"}
          gap="1"
          fontWeight="bold"
        >
          <GridItem gridColumn={"1/3"}>
            <VStack>
              <Heading fontWeight={600} fontSize={40}>
                <Text
                  position="absolute"
                  left="105px"
                  top="200px"
                  width="700px"
                  height="184px"
                >
                  Maximize your 3D printing experience at the Brown Design
                  Workshop with <span style={{ color: "#FF7B15" }}>PrintQ</span>
                </Text>
              </Heading>
              <Text
                position="absolute"
                width="700px"
                height="88px"
                left="105px"
                top="350px"
                fontWeight={1}
              >
                PrintQ allows you to secure your spot in our 3D printing queue
                to avoid any uncertainty about when its your turn to print.
              </Text>
              <Button
                position="absolute"
                top="420px"
                colorScheme="orange"
                size="md"
                left="105px"
                as={ReactRouterLink}
                to={user ? "/profile" : "/auth/login"}
              >
                Signup Today
              </Button>
            </VStack>
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default HomePage;
