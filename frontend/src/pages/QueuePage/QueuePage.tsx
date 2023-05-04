import { useEffect, useState } from "react";

import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Spinner,
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

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import {
  GetStateServerResponse,
  Job,
  Printer,
  ServerErrorResponse,
  isGetStateServerResponse,
  isServerErrorResponse,
} from "../../utils/types";

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

  const [user] = useAuthState(auth);
  const [queueItems, setQueueItems] = useState<Job[]>([]);
  const [printerItems, setPrinterItems] = useState<Printer[]>([]);

  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(true);

  useEffect(() => {
    const url = "http://localhost:3232/qHandle?command=getState";
    const fetchData = async () => {
      setFetching(true);
      try {
        const response = await fetch(url);
        const responseJson: GetStateServerResponse | ServerErrorResponse =
          await response.json();
        if (isGetStateServerResponse(responseJson)) {
          setPrinterItems(responseJson.printers);
          setQueueItems(responseJson.printQ);
        } else if (isServerErrorResponse(responseJson)) {
          setError(true);
        } else {
          console.log(
            "Error: Json returned is not of type EnqueueServerResponse or ServerErrorResponse"
          );
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
      setFetching(false);
    };
    fetchData();
    setUpdate(false);
  }, [update]);

  const handleJoinQueue = () => {
    if (user === null) {
      onOpenAlertModal();
    } else {
      onOpenJoinQueueModal();
    }
  };

  if (error) {
    return <EmptyQueueAnimation />;
  }

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
          {fetching ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <>
              <GridItem gridColumn={"1 / 2"}>
                <Heading as="h2" size="lg">
                  <Text>About</Text>
                </Heading>
                <HStack py={2}>
                  <FaUserCircle size="40px" />
                  <Text>
                    {/* Hack to get # of current users. This was caused by a backend implementation decision were users
                      who are "Printing" are no longer stored in our Queue Data Stucture.*/}
                    {queueItems.length +
                      printerItems.filter((printer) => printer.currentJob)
                        .length}{" "}
                    people
                  </Text>
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
                  <Button
                    colorScheme="orange"
                    size="md"
                    onClick={handleJoinQueue}
                  >
                    Join Queue
                  </Button>
                </HStack>
                {queueItems.length === 0 &&
                printerItems.filter((printer) => printer.currentJob).length ===
                  0 ? (
                  <EmptyQueueAnimation />
                ) : (
                  <VStack spacing={4}>
                    {printerItems.map((printer) => {
                      if (printer.currentJob) {
                        return (
                          <QueueCard
                            key={printer.currentJob.JobID}
                            job={{ ...printer.currentJob }}
                            printer={printer}
                            setUpdate={setUpdate}
                          />
                        );
                      }
                    })}
                    {queueItems.map((job) => {
                      return (
                        <QueueCard
                          key={job.JobID}
                          job={{ ...job }}
                          setUpdate={setUpdate}
                        />
                      );
                    })}
                  </VStack>
                )}
              </GridItem>
            </>
          )}
        </Grid>
        <JoinQueueModal
          onClose={onCloseJoinQueueModal}
          isOpen={isOpenJoinQueueModal}
          username={
            user?.displayName === null || user?.displayName === undefined
              ? "anonymous"
              : user.displayName
          }
          setUpdate={setUpdate}
        />
        <AlertModal onClose={onCloseAlertModal} isOpen={isOpenAlertModal} />
      </Container>
    </>
  );
}

export default QueuePage;
