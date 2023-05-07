import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import {
  GetStateServerResponse,
  Job,
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
    <>
      <Box>
        <Heading as="h1" size="lg">
          Admin Dashboard
        </Heading>
      </Box>
      <UserTable />
      <PrintersTable />
    </>
  );
}

export default AdminDashboard;
