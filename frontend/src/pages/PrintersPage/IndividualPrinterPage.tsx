import {
  Box,
  Flex,
  Grid,
  GridItem,
  Stack,
  Spacer,
  Text,
} from "@chakra-ui/react";
import IndividualPrinter from "../../components/IndividualPrinter";
import printers from "../../Mocks/PrinterMocks";
import { useLocation } from "react-router";

export default function IndividualPrinterPage() {
  const location = useLocation();
  const printer = location.state;

  return (
    <Grid
      gridTemplateRows={"auto auto"}
      gridTemplateColumns={"1fr 1fr 1fr"}
      gap="1"
    >
      <GridItem gridColumn={"1/3"}>
        <Stack align={"left"} py={6} px={12}>
          <Flex flex-grow="1" flexWrap="wrap" gap="25px" padding="10">
            <IndividualPrinter
              key={printer.key}
              id={printer.id}
              image={printer.image}
              name={printer.name}
              status={printer.status}
              color={printer.color}
            />
          </Flex>

          <Spacer />
        </Stack>
      </GridItem>
      <GridItem gridColumn={"1/4"}></GridItem>
    </Grid>
  );
}
