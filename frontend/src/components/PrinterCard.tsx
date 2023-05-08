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
import { Status } from "../utils/types";

interface PrinterCardProps {
  id: string;
  name: string;
  status: string;
  filament: string;
  timeStarted: string;
  currentJob?: string;
}

function PrinterCard({ id, name, status, timeStarted }: PrinterCardProps) {
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

  const printerToImage: { [name: string]: string } = {
    p1: printer1,
    p2: printer2,
    p3: printer3,
    p4: printer4,
    p5: printer5,
    p6: printer6,
    p7: printer7,
    p8: printer8,
    p9: printer9,
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
      <img
        src={printerToImage[name]}
        style={{ width: "350px", height: "250px" }}
      />
      <HStack justifyContent="space-between">
        <p style={{ fontWeight: "bold" }}>{nameToName[name]}</p>
        {renderStatus()}
      </HStack>
    </div>
  );
}

export default PrinterCard;
