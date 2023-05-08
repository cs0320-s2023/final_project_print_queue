import {
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  Spacer,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Progress,
  HStack,
  Container,
} from "@chakra-ui/react";
import IndividualPrinter from "../../components/IndividualPrinter";
import printers from "../../Mocks/PrinterMocks";
import { useLocation } from "react-router";
import JobHistoryMocks from "../../Mocks/JobHistoryMocks";
// import Printer from "../../components/IndividualPrinter";
import PrinterData from "../../components/IndividualPrinter";
import history from "../../Mocks/JobHistoryMocks";
import History from "../../Mocks/JobHistoryMocks";

export default function IndividualPrinterPage() {
  const location = useLocation();
  const printer = location.state;
  console.log(printer);

  return (
    <Container>
      <Grid>
        <GridItem gridColumn={"1/4"}>
          <HStack
            align={"center"}
            py={6}
            px={12}
            spacing="25px"
            color="blackAlpha.700"
          >
            return (
            <IndividualPrinter
              name={printer.name}
              status={printer.status}
              filament={printer.filament}
            />
            );
            {/* } */})
          </HStack>
        </GridItem>
      </Grid>
    </Container>
  );
}
