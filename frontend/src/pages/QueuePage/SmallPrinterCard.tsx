import { Box, HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import printer from "../../assets/3dPrinter.svg";
import { Status } from "../../utils/types";

interface SmallPrinterProps {
  name: string;
  status: string;
  timeStarted: string;
}

function SmallPrinterCard({ name, status, timeStarted }: SmallPrinterProps) {
  const renderStatus = () => {
    switch (status) {
      case Status.AVAILABLE:
        return <Text color="green.600">Available</Text>;
      case Status.MAINTENANCE:
        return <Text color="yellow.600">Maintenance</Text>;
      case Status.BUSY:
        return <Text>{timeStarted}</Text>;
      case Status.RESERVE:
        return <Text color="orange.600">Reserved</Text>;
      case Status.PENDING:
        return <Text>Pending</Text>;
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
