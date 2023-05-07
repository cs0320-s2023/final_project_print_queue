import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  EnqueueServerResponse,
  ServerErrorResponse,
  isEnqueueServerResponse,
  isServerErrorResponse,
} from "../../utils/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import FileUpload from "../../components/FileUpload";
import { InfoIcon } from "@chakra-ui/icons";

interface QueueModalProps {
  onClose: () => void;
  isOpen: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const baseurl =
  "https://bdw-printer-queue.onrender.com/qHandle?command=enqueue&";

function JoinQueueModal({ onClose, isOpen, setUpdate }: QueueModalProps) {
  const [user] = useAuthState(auth);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [printTime, setPrintTime] = useState<string>("");
  const toast = useToast();

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    const url =
      baseurl +
      `user=${user?.displayName}&contact=${user?.email}&imgUrl=${user?.photoURL}&duration=${printTime}`;

    const enqueueResponse = await enqueue(url);
    if (enqueueResponse !== undefined) {
      if (enqueueResponse.result === "success") {
        toast({
          title: `You have been added to the Queue.`,
          position: "top",
          status: "success",
          isClosable: true,
        });
      } else {
        toast({
          title: `An Error Occured: Unfortunately you could not be added to the queue at this time.`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    }
    setFileUploaded(false);
    setUpdate(true);
    onClose();
  };

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader pt={5}>
          <Heading>Join the Queue</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="start">
            <DisclaimerBox />
            <Text>
              To join the queue please upload you .gcode file from the
              PrusaSlicer in the area below.
            </Text>
          </VStack>
          <Container py={5}>
            <FileUpload
              setPrintTime={setPrintTime}
              fileUploaded={fileUploaded}
              setFileUploaded={setFileUploaded}
            />
          </Container>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              colorScheme="orange"
              variant="solid"
              onClick={handleSubmit}
              isDisabled={!fileUploaded}
            >
              Submit
            </Button>
            <Button
              onClick={() => {
                onClose();
                setFileUploaded(false);
              }}
              variant="ghost"
            >
              Cancel
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default JoinQueueModal;

/**
 * The equeue function makes a request to the Java qHandler in our backend.
 * Calling this function will add a new job to the printQ.
 *
 * @param url String url with required url params to enqueue an job in the backend
 * @returns JSON response either success of error.
 */
const enqueue = async (url: string) => {
  try {
    const response = await fetch(url);
    const responseJson: EnqueueServerResponse | ServerErrorResponse =
      await response.json();
    // Using Type Predicate to veriy that responseJson is a ServerResponse.
    if (isEnqueueServerResponse(responseJson)) {
      return responseJson;
    } else if (isServerErrorResponse(responseJson)) {
      return responseJson;
    } else {
      console.log(
        "Error: Json returned is not of type EnqueueServerResponse or ServerErrorResponse"
      );
    }
  } catch (error) {
    console.log(error);
    return { result: "error" };
  }
};

function DisclaimerBox() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert status="info">
      <AlertIcon />
      <Box>
        <AlertTitle>File Upload Usage</AlertTitle>
        <AlertDescription>
          Please be aware that we do not store or save your .gcode file for you.
          We ask you to upload your file so we can extract the estimated print
          time of your project to better manage the queue on our end. Happy
          Printinting!
        </AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  ) : (
    <InfoIcon color={"blue.400"} onClick={onOpen} />
  );
}
