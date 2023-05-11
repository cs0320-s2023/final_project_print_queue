import image1 from "../assets/printer1.png";
import { Link as ReactRouterLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Button,
  Link,
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
import { Status } from "../utils/types";

interface IndividualCard {
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
    console.log(status);
    switch (status) {
      case Status.AVAILABLE:
        return (
          <Text fontWeight="bold" color="green.600">
            Available
          </Text>
        );
      case Status.BUSY:
        return (
          <Text fontWeight="bold" color="red.600">
            Busy
          </Text>
        );
      case Status.PENDING:
        return (
          <Text fontWeight="bold" color="yellow.600">
            Pending
          </Text>
        );
      case Status.MAINTENANCE:
        return (
          <Text fontWeight="bold" color="purple.600">
            Maintenace
          </Text>
        );
      case Status.RESERVED:
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

  const nameToName: { [name: string]: string } = {
    p1: "Printer 1",
    p2: "Printer 2",
    p3: "Printer 3",
    p4: "Printer 4",
    p5: "Printer 5",
    p6: "Printer 6",
    p7: "Printer 7",
    p8: "Printer 8",
    p9: "Printer 9",
  };

  return (
    <div>
      <VStack justifyContent="space-between" alignItems="left">
        <Image
          src={imageStatus[nameToName[name]]}
          alt={name}
          style={{ width: "500px", height: "400px" }}
        />
        <Heading as="h1" size="lg" fontWeight="bold" color="blackAlpha.900">
          <p style={{ fontWeight: "bold" }}>{nameToName[name]}</p>
        </Heading>

        <Text
          color="blackAlpha.900"
          fontWeight="bold"
          fontSize="xl"
          whiteSpace="nowrap"
        >
          Status:{" "}
          <span style={{ display: "inline-block" }}>{renderStatus()}</span>
        </Text>

        <Text color="blackAlpha.900" fontWeight="bold" fontSize="xl">
          Filament Color: {filament}
        </Text>
        {/* <Button colorScheme="orange" size="lg" as={ReactRouterLink} to="/queue">
          Claim Printer Now
        </Button> */}
        <Button
          colorScheme="orange"
          size="lg"
          as={ReactRouterLink}
          to="/printers"
        >
          Back to Printers Page
        </Button>
      </VStack>
    </div>
  );
}

export default IndividualPrinter;
