import { flexbox, VStack } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Square,
  Text,
  GridItem,
  Grid,
  Wrap,
  WrapItem,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PrinterCard from "../../components/PrinterCard";
import printers from "../../Mocks/PrinterMocks";

export default function PrintersPage() {
  return (
    <Grid
      gridTemplateRows={"auto auto"}
      gridTemplateColumns={"1fr 1fr 1fr"}
      gap="1"
    >
      <GridItem gridColumn={"1/3"}>
        <Stack align={"left"} py={6} px={12}>
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            Our Printers
          </Heading>
          <Spacer />
          <Text>
            At the Brown Design Workshop, we believe that creativity knows no
            bounds. That's why we offer a state-of-the-art 3D printing facility
            to help bring your ideas to life. Our top-of-the-line printers are
            equipped with the latest technology, capable of producing intricate
            and complex designs with ease. With a focus on accessibility and
            inclusivity, we strive to create an environment where everyone has
            the opportunity to explore their creativity and unleash their
            imagination.
          </Text>
        </Stack>
      </GridItem>
      <GridItem gridColumn={"1/4"}>
        <Flex flex-grow="1" flexWrap="wrap" gap="25px" padding="10">
          {printers.map((printer) => {
            return (
              <Link
                to={`/printer/${printer.id}`}
                key={printer.id}
                state={printer}
              >
                <PrinterCard
                  id={printer.id}
                  image={printer.image}
                  name={printer.name}
                  status={printer.status}
                  timeStarted={printer.timeStarted}
                  filament={printer.filament}
                />
              </Link>
            );
          })}
        </Flex>
      </GridItem>
    </Grid>
  );
}
