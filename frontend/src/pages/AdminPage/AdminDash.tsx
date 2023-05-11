import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  GetStateServerResponse,
  Printer,
  ServerErrorResponse,
  isGetStateServerResponse,
  isServerErrorResponse,
} from "../../utils/types";
import UserService, { IUser } from "../../utils/UserService";
import UserTable from "./UserTable";
import PrintersTable from "./PrintersTable";

export interface IUserObject {
  [key: string]: IUser;
}

function AdminDashboard() {
  const [users, setUsers] = useState<IUserObject>({});
  const [printerItems, setPrinterItems] = useState<Printer[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    UserService.getAll(setUsers);
    const url =
      "https://bdw-printer-queue.onrender.com/qHandle?command=getState";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const responseJson: GetStateServerResponse | ServerErrorResponse =
          await response.json();
        if (isGetStateServerResponse(responseJson)) {
          setPrinterItems(responseJson.printers);
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
    };
    fetchData();
  }, []);

  return (
    <Container maxW={"9xl"} maxH={"100%"} px={12}>
      <Grid
        gridTemplateRows={"auto auto auto"}
        gridTemplateColumns={"1fr"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem>
          <Stack align={"left"} py={6}>
            <Heading
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            >
              <Text>
                <span style={{ color: "#FF7B15" }}>PrintQ</span> Admin Dashboard
              </Text>
            </Heading>
            <Text>
              Welcome to the Admin Dashboard, the centralized hub for managing
              user authorization roles, printer status, and filament color
              settings. As an admin, you can assign different authorization
              roles to users, ensuring they have access to only the areas of the
              system that are relevant to their job responsibilities.
              Additionally, you can monitor and control the status of printers
              from this dashboard.
            </Text>
          </Stack>
        </GridItem>
        <GridItem py={5}>
          <Heading pb={2}>User Authorization</Heading>
          <UserTable />
        </GridItem>
        <GridItem>
          <Heading pb={2}>Printers</Heading>
          <PrintersTable />
        </GridItem>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
