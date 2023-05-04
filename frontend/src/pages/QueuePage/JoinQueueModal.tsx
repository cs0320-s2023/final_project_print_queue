import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
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

interface QueueModalProps {
  onClose: () => void;
  isOpen: boolean;
  username: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormState {
  projectName: string;
  printTime: string;
  printerPreference: string;
  contact: string;
}

const baseurl = "http://localhost:3232/qHandle?command=enqueue&";

function JoinQueueModal({
  onClose,
  isOpen,
  username,
  setUpdate,
}: QueueModalProps) {
  const [user] = useAuthState(auth);
  const [contactState, setContactState] = useState("email");
  const toast = useToast();

  const [formState, setFormState] = useState<FormState>({
    projectName: "",
    printTime: "",
    printerPreference: "",
    contact: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    const url =
      baseurl +
      `user=${user?.displayName}&contact=${user?.email}&duration=${formState.printTime}`;

    const enqueueResponse = await enqueue(url);
    console.log(enqueueResponse);
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
    setUpdate(true);
    onClose();
  };

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join the Queue 🎉</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            To join the queue please upload you .gcode file from the PrusaSlicer
            in the area below. Please be aware that we do not store or save your
            .gcode file for you! We ask you to upload your file so we can
            extract the estimated print time of your project to better manage
            the queue on our end. Happy Printinting!
          </Text>
          {/* <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input
                placeholder="My 3D Printing Project"
                onChange={handleInputChange}
              />
            </FormControl> */}
          <Container py={5}>
            <FileUpload formState={formState} setFormState={setFormState} />
          </Container>
          {/* <Box justifyItems="start" justifyContent="start">
              <Heading size="md:" py={3}>
                <Text>Contact Preference</Text>
              </Heading>
              <RadioGroup onChange={setContactState} value={contactState}>
                <HStack>
                  <Radio value="email">Email</Radio>
                  <Radio value="text">Text</Radio>
                  <Radio value="both">Both</Radio>
                </HStack>
              </RadioGroup>
            </Box> */}
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme="orange" variant="solid" onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={onClose} variant="ghost">
              Close
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
