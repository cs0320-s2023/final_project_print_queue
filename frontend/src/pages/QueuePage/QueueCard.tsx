import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Countdown, { zeroPad } from "react-countdown";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAuthorization } from "../../utils/hooks/useAuthorization";
import { AuthRoles } from "../../utils/Permissions/determineUserPermissions";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import {
  ClaimPrinterServerResponse,
  Job,
  Printer,
  RejectFromQueueServerResponse,
  RejectPrinterServerResponse,
  ServerErrorResponse,
  Status,
  isClaimPrinterServerResponse,
  isRejectFromQueueServerResponse,
  isRejectPrinterServerResponse,
  isServerErrorResponse,
} from "../../utils/types";
import React from "react";

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface QueueCardProps {
  job: Job;
  printer?: Printer;
  img: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function QueueCard({ job, printer, img, setUpdate }: QueueCardProps) {
  const moment = require("moment");

  const [user] = useAuthState(auth);
  const { authorizationRole } = useAuthorization();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const handleDelete = async () => {
    let url = "http://localhost:3232/qHandle?";
    if (printer) {
      url += `command=rejectPrinter&printerName=${printer.name}`;
    } else {
      url += `command=rejectQueue&user=${job.user}&contact=${job.contact}`;
    }

    try {
      const response = await fetch(url);
      const responseJson:
        | RejectFromQueueServerResponse
        | RejectPrinterServerResponse
        | ServerErrorResponse = await response.json();
      if (
        isRejectFromQueueServerResponse(responseJson) ||
        isRejectPrinterServerResponse(responseJson)
      ) {
        console.log(responseJson);
        setUpdate(true);
        return responseJson;
      } else if (isServerErrorResponse(responseJson)) {
        console.log("Got a server error");
      } else {
        console.log(
          "Error: Json returned is not of type EnqueueServerResponse or ServerErrorResponse"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmPrintStart = async () => {
    if (printer) {
      let url = `http://localhost:3232/qHandle?command=claim&printerName=${printer.name}`;
      try {
        const response = await fetch(url);
        const responseJson: ClaimPrinterServerResponse | ServerErrorResponse =
          await response.json();
        if (isClaimPrinterServerResponse(responseJson)) {
          console.log(responseJson);
          setUpdate(true);
          return responseJson;
        } else if (isServerErrorResponse(responseJson)) {
          console.log("Got a server error");
        } else {
          console.log(
            "Error: Json returned is not of type EnqueueServerResponse or ServerErrorResponse"
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderer = ({ hours, minutes, seconds, completed }: TimerProps) => {
    if (completed) {
      // Render a completed state
      return <Text>Completed</Text>;
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  const renderCardFooter = () => {
    if (printer && printer.currentJob?.printTime) {
      const momentObject = moment(printer.timeStarted, "HH:mm:ss");

      // console.log(momentObject);
      // console.log("5 More min");
      // console.log(newMomentObject);

      switch (printer.status) {
        case Status.BUSY:
          console.log(printer.currentJob.printTime);
          let busyEndtime = momentObject
            .add(printer.currentJob.printTime, "seconds")
            .utc()
            .format();
          return (
            <HStack spacing="4" justifyContent="space-between">
              <Text fontSize="md" fontWeight="400">
                Job in Progress...
              </Text>
              <Box w="100px">
                <Countdown date={busyEndtime} renderer={renderer} />
              </Box>
            </HStack>
          );
        case Status.PENDING:
          let pendingEndtime = momentObject.add(5, "minutes").utc().format();
          return (
            <HStack spacing="4" justifyContent="space-between">
              <Text fontSize="md" fontWeight="400">
                Pending...
              </Text>
              <HStack spacing="5" justifyContent="space-evenly">
                <Button
                  colorScheme="orange"
                  size="md"
                  onClick={handleConfirmPrintStart}
                >
                  Confirm Print Has Started
                </Button>
                <Countdown date={pendingEndtime} renderer={renderer} />,
              </HStack>
            </HStack>
          );
        default:
          return "";
      }
    } else {
      return (
        <Stack divider={<StackDivider />} spacing="4">
          <Text fontSize="md" fontWeight="400">
            In Queue
          </Text>
        </Stack>
      );
    }
  };

  return (
    <Card w={"100%"}>
      <CardHeader>
        <HStack justifyContent="space-between">
          <HStack spacing={4}>
            {user?.displayName ? (
              <Avatar size="md" name={user.displayName} src={img} />
            ) : (
              <Avatar size="md" name="" src={img} />
            )}
            <Heading size="md">{job.user}</Heading>
          </HStack>
          {authorizationRole === AuthRoles.admin ||
          user?.email === job.contact ? (
            <Button
              colorScheme="red"
              variant="ghost"
              leftIcon={<DeleteIcon />}
              onClick={onOpen}
            >
              Delete
            </Button>
          ) : (
            ""
          )}
        </HStack>
      </CardHeader>
      <Divider color={"blackAlpha.400"} />
      <CardBody>
        {renderCardFooter()}
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete Job
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    handleDelete();
                    onClose();
                  }}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </CardBody>
    </Card>
  );
}

export default QueueCard;
