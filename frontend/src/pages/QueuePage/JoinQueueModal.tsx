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
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

interface QueueModalProps {
  onClose: () => void;
  isOpen: boolean;
}

function JoinQueueModal({ onClose, isOpen }: QueueModalProps) {
  const [contactState, setContactState] = useState("email");
  const toast = useToast();

  const [formState, setFormState] = useState({
    projectName: "",
    estimatedPrintTime: "",
    printerPreference: "",
    contactMethod: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    onClose();
    toast({
      title: `You have been added to the Queue.`,
      position: "top",
      status: "success",
      isClosable: true,
    });
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

export default JoinQueueModal;
