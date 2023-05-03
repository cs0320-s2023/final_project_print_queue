import { useEffect, useState } from "react";

import {
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

// Assets Imports
import { FaUserCircle } from "react-icons/fa";
import EmptyQueueAnimation from "./EmptyAnimation";

// Components
import SmallPrinterCard from "./SmallPrinterCard";
import QueueCard from "./QueueCard";
import JoinQueueModal from "./JoinQueueModal";
import AlertModal from "./AlertModal";

// Mock Data
import printers from "../../Mocks/PrinterMocks";
import QueueItems from "../../Mocks/QueueMock";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useAuthorization } from "../../utils/hooks/useAuthorization";
import { Job, Printer } from "../../utils/types";
// import useFetch from "../../utils/hooks/useFetch";

function QueuePage() {
  const {
    isOpen: isOpenJoinQueueModal,
    onOpen: onOpenJoinQueueModal,
    onClose: onCloseJoinQueueModal,
  } = useDisclosure();

  const {
    isOpen: isOpenAlertModal,
    onOpen: onOpenAlertModal,
    onClose: onCloseAlertModal,
  } = useDisclosure();

  const [user, loading] = useAuthState(auth);
  const { authorizationRole, setAuthorizationRole } = useAuthorization();
  const [queueItems, setQueueItems] = useState<Job[]>([]);
  const [printerItems, setPrinterItems] = useState<Printer[]>([]);

  // const base = "http://localhost:3232/qHandle?command=";
  // const getState = "getState";
  // // console.log(base + getState);
  // const { data, error } = useFetch<Job[]>(base + getState);
  // console.log(data);

  useEffect(() => {
    setQueueItems(QueueItems);
    setPrinterItems(printers);
  }, [queueItems]);

  const handleJoinQueue = () => {
    if (user === null) {
      onOpenAlertModal();
    } else {
      // TODO: Actually Call the Enqueue Method to the Backend

      onOpenJoinQueueModal();
    }
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
              {printerItems.map((printer) => (
                <SmallPrinterCard
                  key={printer.name}
                  name={printer.name}
                  status={printer.status}
                  timeStarted={printer.timeStarted}
                />
              ))}
            </Flex>
          </GridItem>
          <GridItem gridColumn={"2 / 4"}>
            <HStack justify={"space-between"} pb={4}>
              <Heading as="h2" size="lg">
                <Text>Queue</Text>
              </Heading>
              <Button colorScheme="orange" size="md" onClick={handleJoinQueue}>
                Join Queue
              </Button>
            </HStack>
            {QueueItems.length === 0 ? (
              <EmptyQueueAnimation />
            ) : (
              <VStack spacing={4}>
                {QueueItems.map((item) => (
                  <QueueCard key={item.contact} {...item} />
                ))}
              </VStack>
            )}
          </GridItem>
        </Grid>
        <JoinQueueModal
          onClose={onCloseJoinQueueModal}
          isOpen={isOpenJoinQueueModal}
          username={
            user?.displayName === null || user?.displayName === undefined
              ? "anonymous"
              : user.displayName
          }
        />
        <AlertModal onClose={onCloseAlertModal} isOpen={isOpenAlertModal} />
      </Container>
    </>
  );
}

export default QueuePage;
