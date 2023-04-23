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
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { QueueCard as QueueCardProps } from "../../Mocks/QueueMock";
import Countdown, { zeroPad } from "react-countdown";

interface TimerProps {
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function QueueCard({ ...props }: QueueCardProps) {
  const currnetDate = Date.now();

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
    switch (props.status) {
      case "Printing":
        return (
          <HStack spacing="4" justifyContent="space-between">
            <Text fontSize="md" fontWeight="400">
              Using {props.printer}
            </Text>
            <Box w="100px">
              <Countdown date={currnetDate + 1000000} renderer={renderer} />
            </Box>
          </HStack>
        );
      case "Pending":
        return (
          <HStack spacing="4" justifyContent="space-between">
            <Text fontSize="md" fontWeight="400">
              Pending...
            </Text>
            <HStack spacing="5" justifyContent="space-evenly">
              <Button colorScheme="orange" size="md">
                Confirm Print Has Started
              </Button>
              <Countdown date={currnetDate + 30000} renderer={renderer} />,
            </HStack>
          </HStack>
        );
      case "In Queue":
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
        <HStack>
          <Avatar
            size="md"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Heading size="md">{props.name}</Heading>
        </HStack>
      </CardHeader>
      <Divider color={"blackAlpha.400"} />
      <CardBody>{renderCardFooter()}</CardBody>
    </Card>
  );
}

export default QueueCard;
