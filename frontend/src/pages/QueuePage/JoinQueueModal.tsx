import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Select,
  Text,
  Toast,
  VStack,
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

interface QueueModalProps {
  onClose: () => void;
  isOpen: boolean;
  username: string;
}

const baseurl = "http://localhost:3232/qHandle?command=enqueue&";

function JoinQueueModal({ onClose, isOpen, username }: QueueModalProps) {
  const [user] = useAuthState(auth);
  const [contactState, setContactState] = useState("email");
  const toast = useToast();

  const [formState, setFormState] = useState({
    projectName: "",
    printTime: "PT5H",
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
          title: `An Error Occured: Unfortunately you could not be added to the queue.`,
          position: "top",
          status: "error",
          isClosable: true,
        });
      }
    }

    onClose();
  };

  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack alignItems="start">
            <FormControl>
              <FormLabel>Project Name</FormLabel>
              <Input placeholder="First name" onChange={handleInputChange} />
            </FormControl>
            <Select placeholder="Printer Preference" size="md">
              <option value="none">None</option>
              <option value="printer1">Printer 1</option>
              <option value="printer2">Printer 2</option>
              <option value="printer3">Printer 3</option>
              <option value="printer4">Printer 4</option>
              <option value="printer5">Printer 5</option>
              <option value="printer6">Printer 6</option>
              <option value="printer7">Printer 7</option>
              <option value="printer8">Printer 8</option>
            </Select>
            <Box justifyItems="start" justifyContent="start">
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
            </Box>
          </VStack>
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

export default JoinQueueModal;
