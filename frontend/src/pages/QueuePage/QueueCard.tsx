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
  TimerProps,
  isClaimPrinterServerResponse,
  isRejectFromQueueServerResponse,
  isRejectPrinterServerResponse,
  isServerErrorResponse,
} from "../../utils/types";
import React, { useEffect, useState } from "react";
import CountDownTimer from "../../components/CountDownTimer";

interface QueueCardProps {
  job: Job;
  printer?: Printer;
  img: string;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function QueueCard({ job, printer, img, setUpdate }: QueueCardProps) {
  const [user] = useAuthState(auth);
  const { authorizationRole } = useAuthorization();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const [jobFinished, setJobFinished] = useState<boolean>(false);

  const handleDelete = async () => {
    // let url = "http://localhost:3232/";
    let url = "https://bdw-printer-queue.onrender.com/";

    if (printer) {
      url += `qHandle?command=rejectPrinter&printerName=${printer.name}`;
      console.log(url);
    } else {
      url += `qHandle?command=rejectQueue&user=${job.user}&contact=${job.contact}`;
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
        setUpdate(true);
        return responseJson;
      } else if (isServerErrorResponse(responseJson)) {
        console.log(responseJson);
        console.log("Got a server error");
      } else {
        console.log(responseJson);
        console.log(
          "Error: Json returned is not of type RejectFromQueueServerResponse or RejectPrinterServerResponse or ServerErrorResponse"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmPrintStart = async () => {
    if (printer) {
      // let url = `http://localhost:3232/qHandle?command=claim&printerName=${printer.name}`;

      let url = `https://bdw-printer-queue.onrender.com/qHandle?command=claim&printerName=${printer.name}`;
      try {
        const response = await fetch(url);
        const responseJson: ClaimPrinterServerResponse | ServerErrorResponse =
          await response.json();
        if (isClaimPrinterServerResponse(responseJson)) {
          setUpdate(true);
          return responseJson;
        } else if (isServerErrorResponse(responseJson)) {
          console.log(responseJson);
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

  const renderCardHeader = () => {
    return (
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
    );
  };

  const renderCardFooter = () => {
    if (printer && printer.currentJob?.printTime) {
      switch (printer.status) {
        case Status.BUSY:
          return (
            <HStack spacing="4" justifyContent="space-between">
              <Text fontSize="md" fontWeight="400">
                {jobFinished ? "Job finished" : "Job in Progress..."}
              </Text>
              <Box>
                <CountDownTimer
                  printer={printer}
                  setUpdate={setUpdate}
                  setJobFinished={setJobFinished}
                />
              </Box>
            </HStack>
          );
        case Status.PENDING:
          return (
            <HStack spacing="4" justifyContent="space-between">
              <Text fontSize="md" fontWeight="400">
                Pending...
              </Text>
              <HStack spacing="5" justifyContent="space-evenly">
                {(printer.currentJob.contact === user?.email ||
                  authorizationRole === AuthRoles.admin) &&
                  !jobFinished && (
                    <Button
                      colorScheme="orange"
                      size="md"
                      onClick={handleConfirmPrintStart}
                    >
                      Confirm Print Has Started
                    </Button>
                  )}
                <CountDownTimer
                  printer={printer}
                  setUpdate={setUpdate}
                  setJobFinished={setJobFinished}
                />
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

  const renderAlertModal = () => {
    return (
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
    );
  };

  return (
    <>
      <Card w={"100%"} backgroundColor={jobFinished ? "red.100" : " "}>
        <CardHeader>{renderCardHeader()}</CardHeader>
        <Divider color={"blackAlpha.400"} />
        <CardBody>{renderCardFooter()}</CardBody>
      </Card>
      {renderAlertModal()}
    </>
  );
}

export default QueueCard;
