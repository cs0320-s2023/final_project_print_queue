import image1 from "../assets/printer1.png";
import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";

interface PrinterCardProps {
  id: string;
  image: string;
  name: string;
  status: string;
  time: string;
}

function PrinterCard({ id, image, name, status, time }: PrinterCardProps) {
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
      <img src={image1} style={{ width: "350px", height: "250px" }} />
      <HStack justifyContent="space-between">
        <p style={{ fontWeight: "bold" }}>{name}</p>
        {renderStatus()}
      </HStack>
    </div>
  );
}

export default PrinterCard;
