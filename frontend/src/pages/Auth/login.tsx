import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import UserService, { IUser } from "../../utils/UserService";
import UserDataService from "../../utils/UserService";

import animationData from "../../assets/hello.json";
import Lottie from "react-lottie";
import { useAuthorization } from "../../utils/Authorization/useAuthorization";

function Login() {
  const [user] = useAuthState(auth);
  const { setAuthorizationRole } = useAuthorization();

  // Navigation: Redirects user to dashboard if they are already logged in
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  // Google Authentication
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      // TODO: Error handling when result isn't a valid user
      const result = await signInWithPopup(auth, googleProvider);
      const user: IUser = {
        displayName: result.user.displayName,
        email: result.user.email,
        role: "user",
      };

      let userAlreadyExists = await UserService.exists(result.user.uid);
      if (!userAlreadyExists) {
        // Creates new user and adds them to firebase auth
        UserDataService.create(user, result.user.uid);
        // Sync Authorization Context with current Users Auth Role
        UserDataService.syncUserAuthorizationRole(
          result.user.uid,
          setAuthorizationRole
        );
      }
      navigate("/profile");
    } catch (error) {
      console.log("error");
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} py={12} px={6}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Welcome to PrintQ 👋
          </Heading>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack align={"center"}>
              <Box>
                <Lottie options={defaultOptions} height={400} width={400} />
              </Box>

              <Text fontSize={"lg"} color={"gray.600"}>
                Sign in with a Google Account to get started.
              </Text>

              <Button
                variant="outline"
                size="lg"
                leftIcon={<FcGoogle />}
                onClick={GoogleLogin}
              >
                Sign up with Google
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export default Login;
