import { HStack, Heading, Image, Text, VStack } from "@chakra-ui/react";
import printerImg from "../../assets/3dPrinter.svg";
import { Printer, Status } from "../../utils/types";
import CountDownTimer from "../../components/CountDownTimer";

interface SmallPrinterProps {
  // name: string;
  // status: Status;
  // timeStarted: string;
  printer: Printer;
}

const printerToDisplayName: { [name: string]: string } = {
  p1: "Printer 1",
  p2: "Printer 2",
  p3: "Printer 3",
  p4: "Printer 4",
  p5: "Printer 5",
  p6: "Printer 6",
  p7: "Printer 7",
  p8: "Printer 8",
};

function SmallPrinterCard({ printer }: SmallPrinterProps) {
  const renderStatus = () => {
    switch (printer.status) {
      case Status.AVAILABLE:
        return <Text color="green.600">Available</Text>;
      case Status.MAINTENANCE:
        return <Text color="purple.600">Maintenance</Text>;
      case Status.BUSY:
        return <CountDownTimer printer={printer} />;
      case Status.RESERVED:
        return <Text color="red.600">Reserved</Text>;
      case Status.PENDING:
        return <Text color="yellow.600">Pending</Text>;
    }
  };

  return (
    <HStack spacing={5} py={4} pr={5} w={"200px"} justifyItems={"start"}>
      <Image src={printerImg} alt="3D Printer Icon" boxSize="50px" />
      <VStack alignItems={"left"}>
        <Heading as="h2" size="md">
          <Text>{printerToDisplayName[printer.name]}</Text>
        </Heading>
        {renderStatus()}
      </VStack>
    </HStack>
  );
}

export default SmallPrinterCard;
