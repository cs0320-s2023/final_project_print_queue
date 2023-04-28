import image1 from "../assets/printer1.png";
import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";

interface IndividualCard {
  id: string;
  image: string;
  name: string;
  status: string;
  color: string;
}

function IndividualPrinter({ id, image, name, status, color }: IndividualCard) {
  const renderStatus = () => {
    switch (status) {
      case "Available":
        return (
          <Text fontWeight="bold" color="green.600">
            Available
          </Text>
        );
      case "Under Maintenance":
        return (
          <Text fontWeight="bold" color="yellow.600">
            Printer Down
          </Text>
        );
      case "In Use":
        return (
          <Text fontWeight="bold" color="red.500">
            In Use
          </Text>
        );
      case "Reserved":
        return (
          <Text fontWeight="bold" color="orange.300">
            Reserved
          </Text>
        );
      default:
        return null;
    }
  };
  return (
    <div>
      <img
        src={image1}
        style={{ width: "350px", height: "250px" }}
        alt={name}
      />
      <VStack justifyContent="space-between" alignItems="left">
        <Heading as="h1" size="md" fontWeight="bold">
          {name}
        </Heading>
        <Text fontWeight="bold">Status: {status}</Text>
        <Text fontWeight="bold">Filament Color: {color}</Text>
        {renderStatus()}
        {/* <Button colorScheme="orange" size="md" onClick={() => onOpen()}>
          Join Queue
        </Button> */}
      </VStack>
    </div>
  );
}

export default IndividualPrinter;
