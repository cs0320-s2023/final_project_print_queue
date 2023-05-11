import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthorization } from "../../utils/hooks/useAuthorization";
import yellowBackground from "../../assets/liquid-cheese.svg";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { AuthRoles } from "../../utils/Permissions/determineUserPermissions";

function Profile() {
  const [user, loading] = useAuthState(auth);
  const { authorizationRole, setAuthorizationRole } = useAuthorization();

  const navigate = useNavigate();
  if (loading) return <h1>Loading...</h1>;
  if (!user) {
    navigate("/auth/login");
  }
  if (user) {
    return (
      <Container>
        <Box
          maxW={"500px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"md"}
          overflow={"hidden"}
        >
          <Image
            h={"120px"}
            w={"full"}
            src={yellowBackground}
            objectFit={"cover"}
          />
          <Box>
            {user?.displayName && user.photoURL ? (
              <Flex justify={"center"} mt={-12}>
                <Avatar
                  size="xl"
                  name={user.displayName}
                  src={user?.photoURL}
                />
              </Flex>
            ) : (
              <Avatar size="md" name="" src={""} />
            )}
          </Box>
          <Box>
            <Stack spacing={0} align={"center"} mb={5} pt={4}>
              <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                {user.displayName}
              </Heading>
              <HStack pt={4} justifyItems={"center"}>
                <EmailIcon boxSize={6} />
                <Text color={"gray.600"}>{user.email}</Text>
              </HStack>
              <HStack pt={4} justifyItems={"center"}>
                <Text color={"gray.600"}>
                  <b> Authorization Level: </b> {authorizationRole}
                </Text>
              </HStack>
            </Stack>
          </Box>
          <Heading fontSize={"2xl"} fontFamily={"body"}></Heading>
          <HStack justifyContent="center" py={5}>
            <Button
              onClick={() => {
                localStorage.setItem("authorization", "viewer");
                setAuthorizationRole("viewer");
                auth.signOut();
              }}
            >
              Sign Out
            </Button>
            {(authorizationRole === AuthRoles.admin ||
              authorizationRole === AuthRoles.dev) && (
              <Button
                onClick={() => {
                  navigate("/admin/dashboard");
                }}
              >
                Admin Dashboard
              </Button>
            )}
          </HStack>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container>
        <p>Redirecting to login</p>;
        <Navigate to="/auth/login" />
      </Container>
    );
  }
}

export default Profile;
