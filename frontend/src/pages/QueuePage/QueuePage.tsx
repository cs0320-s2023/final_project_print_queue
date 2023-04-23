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
import SmallPrinterCard from "./SmallPrinterCard";
import printers from "../../Mocks/PrinterMocks";
import { FaUserCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import QueueItems from "../../Mocks/QueueMock";
import QueueCard from "./QueueCard";
import EmptyQueueAnimation from "./EmptyAnimation";
import JoinQueueModal from "./JoinQueueModal";

const emptyQueue = [];

function QueuePage() {
  // Used by Modal popup
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleJoinQueue = () => {
    onOpen();
  };

  return (
    <>
      <Container maxW={"9xl"} maxH={"100%"} px={12}>
        <Grid
          gridTemplateRows={"auto auto"}
          gridTemplateColumns={"1fr 1fr 1fr"}
          gap="1"
          color="blackAlpha.700"
          fontWeight="bold"
        >
          <GridItem gridColumn={"1/3"}>
            <Stack align={"left"} py={6}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
              >
                <Text>
                  Welcome to <span style={{ color: "#FF7B15" }}>PrintQ</span>
                </Text>
              </Heading>
              <Text>
                At the Brown Design Workshop, we believe that creativity knows
                no bounds. That's why we offer a state-of-the-art 3D printing
                facility to help bring your ideas to life. Our top-of-the-line
                printers are equipped with the latest technology, capable of
                producing intricate and complex designs with ease. With a focus
                on accessibility and inclusivity, we strive to create an
                environment where everyone has the opportunity to explore their
                creativity and unleash their imagination.
              </Text>
            </Stack>
          </GridItem>
          <GridItem gridColumn={"1 / 2"}>
            <Heading as="h2" size="lg">
              <Text>About</Text>
            </Heading>
            <HStack py={2}>
              <FaUserCircle size="40px" />
              <Text>{QueueItems.length} people</Text>
            </HStack>
            <Flex flexWrap="wrap">
              {printers.map((printer) => (
                <SmallPrinterCard
                  key={printer.id}
                  name={printer.name}
                  status={printer.status}
                  time={printer.time}
                />
              ))}
            </Flex>
          </GridItem>
          <GridItem gridColumn={"2 / 4"}>
            <HStack justify={"space-between"} pb={4}>
              <Heading as="h2" size="lg">
                <Text>Queue</Text>
              </Heading>
              <Button colorScheme="orange" size="md" onClick={() => onOpen()}>
                Join Queue
              </Button>
            </HStack>
            {QueueItems.length === 0 ? (
              <EmptyQueueAnimation />
            ) : (
              <VStack spacing={4}>
                {QueueItems.map((item) => (
                  <QueueCard key={item.id} {...item} />
                ))}
              </VStack>
            )}
          </GridItem>
        </Grid>
        <JoinQueueModal onClose={onClose} isOpen={isOpen} />
      </Container>
    </>
  );
}

export default QueuePage;
