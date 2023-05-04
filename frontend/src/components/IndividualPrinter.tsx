import image1 from "../assets/printer1.png";
import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import printer1 from "../assets/printer1.jpg";
import printer2 from "../assets/printer2.jpg";
import printer3 from "../assets/printer3.jpg";
import printer4 from "../assets/printer4.jpg";
import printer5 from "../assets/printer5.jpg";
import printer6 from "../assets/printer6.jpg";
import printer7 from "../assets/printer7.jpg";
import printer8 from "../assets/printer8.jpg";
import printer9 from "../assets/printer9.jpg";

interface IndividualCard {
  image: string;
  name: string;
  status: string;
  filament: string;
}

interface IndividualPrinterProps {
  id: string;
}

function IndividualPrinter({ name, status, filament }: IndividualCard) {
  console.log(name);
  const renderStatus = () => {
    switch (status) {
      case "available":
        return (
          <Text fontWeight="bold" color="green.600">
            Available
          </Text>
        );
      case "busy":
        return (
          <Text fontWeight="bold" color="yellow.600">
            Busy
          </Text>
        );
      case "pending":
        return (
          <Text fontWeight="bold" color="yellow.600">
            Pending
          </Text>
        );
      case "maintenance":
        return (
          <Text fontWeight="bold" color="red.500">
            Maintenace
          </Text>
        );
      case "reserved":
        return (
          <Text fontWeight="bold" color="orange.300">
            Reserved
          </Text>
        );
      default:
        return null;
    }
  };

  interface ImageStatus {
    [key: string]: string;
  }

  const imageStatus: ImageStatus = {
    "Printer 1": printer1,
    "Printer 2": printer2,
    "Printer 3": printer3,
    "Printer 4": printer4,
    "Printer 5": printer5,
    "Printer 6": printer6,
    "Printer 7": printer7,
    "Printer 8": printer8,
    "Printer 9": printer9,
  };

  return (
    <div>
      <VStack justifyContent="space-between" alignItems="left">
        <Image
          src={imageStatus[name]}
          alt={name}
          style={{ width: "350px", height: "250px" }}
        />
        <Heading as="h1" size="md" fontWeight="bold" color="blackAlpha.700">
          {name}
        </Heading>
        <Text color="blackAlpha.700" fontWeight="bold">
          Status: {renderStatus()}
        </Text>
        <Text color="blackAlpha.700" fontWeight="bold">
          Filament Color: {filament}
        </Text>
        <Button colorScheme="orange" size="md" onClick={() => onOpen()}>
          Claim Printer Now
        </Button>
      </VStack>
    </div>
  );
}

export default IndividualPrinter;
