import Lottie from "react-lottie";
import emptyQueueAnimation from "../../assets/emptyQueue.json";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function EmptyQueueAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: emptyQueueAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <VStack>
      <Box p={0} m={0} h={400} w={400}>
        <Lottie options={defaultOptions} />
      </Box>
      <Heading as="h2" size="md">
        <Text>Seem like no one is 3D Printing</Text>
      </Heading>
    </VStack>
  );
}

export default EmptyQueueAnimation;
