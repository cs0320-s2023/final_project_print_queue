import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import printer from "../../assets/3dPrinter.svg";

interface SmallPrinterProps {
  name: string;
  status: string;
  time: string;
}

function SmallPrinterCard({ name, status, time }: SmallPrinterProps) {
  const renderStatus = () => {
    switch (status) {
      case "Available":
        return <Text color="green.600">Available</Text>;
      case "Under Maintenance":
        return <Text color="yellow.600">Printer Down</Text>;
      case "In Use":
        return <Text>{time}</Text>;
      case "Reserved":
        return <Text color="orange.600">In Use</Text>;
    }
  };

  return (
    <HStack spacing={5} py={4} pr={5} w={"200px"} justifyItems={"start"}>
      <Image src={printer} alt="3D Printer Icon" boxSize="50px" />
      <VStack alignItems={"left"}>
        <Heading as="h2" size="md">
          <Text>{name}</Text>
        </Heading>
        {renderStatus()}
      </VStack>
    </HStack>
  );
}

export default SmallPrinterCard;
