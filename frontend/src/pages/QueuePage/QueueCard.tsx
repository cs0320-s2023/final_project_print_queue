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
import { Job } from "../../utils/types";

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function QueueCard({ ...props }: Job) {
  const currentDate = Date.now();
  const [user, loading] = useAuthState(auth);
  const { authorizationRole } = useAuthorization();

  const renderMenuOption = () => {
    // TODO: Return if user id matches.
    if (authorizationRole === AuthRoles.admin || user?.uid === props.uid)
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
            <MenuItem>
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

  // const renderCardFooter = () => {
  //   switch (props.status) {
  //     case "Printing":
  //       return (
  //         <HStack spacing="4" justifyContent="space-between">
  //           <Text fontSize="md" fontWeight="400">
  //             {/* Using {props.printer} */}
  //           </Text>
  //           <Box w="100px">
  //             <Countdown date={currnetDate + 1000000} renderer={renderer} />
  //           </Box>
  //         </HStack>
  //       );
  //     case "Pending":
  //       return (
  //         <HStack spacing="4" justifyContent="space-between">
  //           <Text fontSize="md" fontWeight="400">
  //             Pending...
  //           </Text>
  //           <HStack spacing="5" justifyContent="space-evenly">
  //             <Button colorScheme="orange" size="md">
  //               Confirm Print Has Started
  //             </Button>
  //             <Countdown date={currnetDate + 30000} renderer={renderer} />,
  //           </HStack>
  //         </HStack>
  //       );
  //     case "In Queue":
  //       return (
  //         <Stack divider={<StackDivider />} spacing="4">
  //           <Text fontSize="md" fontWeight="400">
  //             In Queue
  //           </Text>
  //         </Stack>
  //       );
  //   }
  // };

  return (
    <Card w={"100%"}>
      <CardHeader>
        <HStack justifyContent="space-between">
          <HStack spacing={4}>
            <Avatar
              size="md"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <Heading size="md">{props.user}</Heading>
          </HStack>
          {renderMenuOption()}
        </HStack>
      </CardHeader>
      <Divider color={"blackAlpha.400"} />
      {/* <CardBody>{renderCardFooter()}</CardBody> */}
    </Card>
  );
}

export default QueueCard;
