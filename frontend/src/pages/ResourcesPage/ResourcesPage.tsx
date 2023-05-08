import { flexbox, VStack } from "@chakra-ui/react";
import { Flex, Spacer } from "@chakra-ui/react";
import poster from "../../assets/poster.jpg";

import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Square,
  Text,
  GridItem,
  Grid,
  Wrap,
  WrapItem,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

function ResourcesPage() {
  return (
    <Grid
      gridTemplateRows={"auto auto"}
      gridTemplateColumns={"1fr 1fr 1fr"}
      gap="1"
    >
      <GridItem gridColumn={"1/4"}>
        <Stack align={"left"} py={6} px={12}>
          <Heading
            fontWeight={400}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            Resource <span style={{ color: "#FF7B15" }}>Page</span>
          </Heading>

          <Text>
            The BDW is a student-led community makerspace. Anyone who comes into
            the BDW and takes a workshop becomes a member of the BDW and
            receives a Member ID card. For more information on becoming a
            member, click{" "}
            <a
              href="http://www.browndesignworkshop.org/become-a-member"
              style={{ textDecoration: "underline" }}
            >
              here
            </a>
            ! The BDW working space is open 24/7, but only monitors have keys to
            unlock tools, and logins for computer access for the tools that
            require it. Current monitor hours can be found on our{" "}
            <a
              href="http://www.browndesignworkshop.org/calendar"
              style={{ textDecoration: "underline" }}
            >
              calendar
            </a>
            . We ask you to respect the time of other users when the space is in
            heavy demand. During busy parts of the semester, 3D Printing jobs
            are capped 6 hours before 10 pm, and 12 hours after 10 pm until
            closing. If you start a print before 2 pm on a day that the BDW is
            open, your print will be cancelled by the monitors on opening shift.
          </Text>
        </Stack>
        <Box display="flex" justifyContent="center" alignItems="center">
          <img
            src={poster}
            alt="Poster"
            style={{ width: "700px", height: "500px" }}
          />
        </Box>
      </GridItem>
    </Grid>
  );
}

export default ResourcesPage;
