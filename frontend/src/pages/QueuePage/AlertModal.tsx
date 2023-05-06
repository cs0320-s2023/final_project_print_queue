import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import Lottie from "react-lottie";
import signup from "../../assets/signup.json";

interface AlertModalProps {
  onClose: () => void;
  isOpen: boolean;
}

function AlertModal({ onClose, isOpen }: AlertModalProps) {
  const navigate = useNavigate();
  const cancelRef = React.useRef(null);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: signup,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size="lg"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="" fontWeight="bold">
            <Heading size="lg">Want to Join the Queue?</Heading>
          </AlertDialogHeader>

          <AlertDialogBody>
            <Box>
              <Lottie options={defaultOptions} height={300} width={300} />
            </Box>
            To join the queue and access our services, users must first either
            log in or sign up for an account. To log in or signup click the Get
            Started button below.{" "}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => navigate("/auth/login")}
              ml={3}
            >
              Get Started
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default AlertModal;
