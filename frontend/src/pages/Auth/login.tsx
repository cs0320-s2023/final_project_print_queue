import React from "react";
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
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";

import animationData from "../../assets/hello.json";
import Lottie from "react-lottie";

function Login() {
  const [user, loading] = useAuthState(auth);

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
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/profile");
      console.log(result.user);
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
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Welcome to PrintQ
              </Heading>
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
