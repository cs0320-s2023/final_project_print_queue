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
  const barStyles = {
    height: "20px",
    borderRadius: "10px",
    marginTop: "10px",
  };
  const data = [20, 40, 60, 80, 100];

  return (
    <Container maxW={"9xl"} maxH={"100%"} px={12}>
      <Grid
        gridTemplateRows={"auto auto"}
        gridTemplateColumns={"1fr 1fr 1fr"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem gridColumn={"1/4"}>
          <HStack
            align={"left"}
            py={6}
            px={12}
            spacing="25px"
            color="blackAlpha.700"
          >
            return (
            <IndividualPrinter
              image={printer.image}
              name={printer.name}
              status={printer.status}
              filament={printer.filament}
            />
            );
            {/* } */})
            <Box w="100%">
              {data.map((value, index) => (
                <Progress
                  key={index}
                  value={value}
                  colorScheme="blue"
                  style={barStyles}
                />
              ))}
            </Box>
          </HStack>
        </GridItem>

        <GridItem gridColumn={"1/3"} alignItems="center">
          <Flex justifyContent="center">
            <Table
              variant="simple"
              alignItems="center"
              style={{ margin: "0 auto" }}
            >
              <TableCaption> Job History Data </TableCaption>
              <Thead>
                <Tr>
                  <Th> User Name</Th>
                  <Th> Date </Th>
                  <Th> Printing Time </Th>
                  <Th> File Name </Th>
                </Tr>
              </Thead>
              <Tbody>
                {History.map((history) => (
                  <Tr key={history.user + history.date + history.filename}>
                    <Td>{history.user}</Td>
                    <Td>{history.date}</Td>
                    <Td>{history.time}</Td>
                    <Td>{history.filename}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Flex>
        </GridItem>

        <GridItem gridColumn={"1/4"}></GridItem>
      </Grid>
    </Container>
  );
}
