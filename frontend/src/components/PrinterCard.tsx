import image1 from "../assets/printer1.png";
import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import printer1 from "../assets/printer1.jpg";
import printer2 from "../assets/printer2.jpg";
import printer3 from "../assets/printer3.jpg";
import printer4 from "../assets/printer4.jpg";
import printer5 from "../assets/printer5.jpg";
import printer6 from "../assets/printer6.jpg";
import printer7 from "../assets/printer7.jpg";
import printer8 from "../assets/printer8.jpg";
import printer9 from "../assets/printer9.jpg";

interface PrinterCardProps {
  id: string;
  image: string;
  name: string;
  status: string;
  filament: string;
  timeStarted: string;
  currentJob?: string;
}

function PrinterCard({
  id,
  image,
  name,
  status,
  timeStarted,
}: PrinterCardProps) {
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

  const getPrinterImage = (id: string) => {
    switch (id) {
      case "1":
        return printer1;
      case "2":
        return printer2;
      case "3":
        return printer3;
      case "4":
        return printer4;
      case "5":
        return printer5;
      case "6":
        return printer6;
      case "7":
        return printer7;
      case "8":
        return printer8;
      case "9":
        return printer9;
      default:
        return undefined;
    }
  };

  return (
    <div>
      <img
        src={getPrinterImage(id)}
        style={{ width: "350px", height: "250px" }}
      />
      <HStack justifyContent="space-between">
        <p style={{ fontWeight: "bold" }}>{name}</p>
        {renderStatus()}
      </HStack>
    </div>
  );
}

export default PrinterCard;
