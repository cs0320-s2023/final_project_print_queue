import "./Home.css";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

function HomePage() {
  return (
    <>
      <Box className="ellipse-1" />
      <Box className="ellipse-3" />
      <Box className="ellipse-2" />
      <Grid
        gridTemplateRows={"auto auto"}
        gridTemplateColumns={"1fr 1fr 1fr"}
        gap="1"
        fontWeight="bold"
      >
        <GridItem gridColumn={"1/3"}>
          <VStack>
            <Heading fontWeight={600} fontSize={40}>
              <Text
                position="absolute"
                left="105px"
                top="200px"
                width="700px"
                height="184px"
              >
                Maximize your 3D printing experience at the Brown Design
                Workshop with <span style={{ color: "#FF7B15" }}>PrintQ</span>
              </Text>
            </Heading>
            <Text
              position="absolute"
              width="700px"
              height="88px"
              left="105px"
              top="350px"
              fontWeight={1}
            >
              PrintQ allows you to secure your spot in our 3D printing queue to
              avoid any uncertainty about when its your turn to print.
            </Text>
            <Button
              position="absolute"
              top="420px"
              colorScheme="orange"
              size="md"
              left="105px"
              onClick={() => onOpen()}
            >
              Signup Today
            </Button>
          </VStack>
        </GridItem>
      </Grid>
    </>
  );
}

export default HomePage;
