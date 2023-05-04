import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Countdown, { zeroPad } from "react-countdown";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { BsThreeDotsVertical } from "react-icons/bs";
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

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

interface QueueCardProps {
  job: Job;
  printer?: Printer;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

function QueueCard({ job, printer, setUpdate }: QueueCardProps) {
  const currentDate = Date.now();
  const [user, loading] = useAuthState(auth);
  const { authorizationRole } = useAuthorization();

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

  const renderMenuOption = () => {
    // TODO: Return if user id matches.
    if (authorizationRole === AuthRoles.admin || user?.email === job.contact)
      return (
        <Menu>
          <MenuButton as={Button} size="sm">
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <HStack>
                <EditIcon />
                <Text>Edit</Text>
              </HStack>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <HStack color="red">
                <DeleteIcon />
                <Text>Delete</Text>
              </HStack>
            </MenuItem>
          </MenuList>
        </Menu>
      );
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
    if (printer) {
      switch (printer.status) {
        case Status.BUSY:
          return (
            <HStack spacing="4" justifyContent="space-between">
              <Text fontSize="md" fontWeight="400">
                Job in Progress...
              </Text>
              <Box w="100px">
                <Countdown date={currentDate + 1000000} renderer={renderer} />
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
                <Button
                  colorScheme="orange"
                  size="md"
                  onClick={handleConfirmPrintStart}
                >
                  Confirm Print Has Started
                </Button>
                <Countdown date={currentDate + 30000} renderer={renderer} />,
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
            {user?.displayName && user.photoURL ? (
              <Avatar size="md" name={user.displayName} src={user.photoURL} />
            ) : (
              <Avatar size="md" name="" src="" />
            )}

            <Heading size="md">{job.user}</Heading>
          </HStack>
          {renderMenuOption()}
        </HStack>
      </CardHeader>
      <Divider color={"blackAlpha.400"} />
      <CardBody>{renderCardFooter()}</CardBody>
    </Card>
  );
}

export default QueueCard;
