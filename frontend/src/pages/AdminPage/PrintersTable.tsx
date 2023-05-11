import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import {
  GetStateServerResponse,
  Printer,
  ServerErrorResponse,
  UpdatePrinterServerResponse,
  isGetStateServerResponse,
  isServerErrorResponse,
  isUpdatePrinterServerResponse,
} from "../../utils/types";
import { Status } from "../../utils/types";
import { IUser } from "../../utils/UserService";

export interface IUserObject {
  [key: string]: IUser;
}

function PrintersTable() {
  const [printerItems, setPrinterItems] = useState<Printer[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
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
            "Error: Json returned is not of type GetStateServerResponse or ServerErrorResponse"
          );
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    fetchData();
  }, [update]);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>BDW 3D Printers</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Filament</Th>
              <Th>Update Printer</Th>
            </Tr>
          </Thead>
          <Tbody>
            {printerItems.map((printer) => {
              return (
                <PrinterTableRow
                  key={printer.name}
                  printer={printer}
                  setUpdate={setUpdate}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

interface PrinterRowProps {
  printer: Printer;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const PrinterTableRow = ({ printer, setUpdate }: PrinterRowProps) => {
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [filament, setFilament] = useState<string>(printer.filament);
  const [status, setStatus] = useState<string>(printer.status);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const url = `https://bdw-printer-queue.onrender.com/qHandle?command=update&printer_name=${printer.name}&filament=${filament}&status=${status}`;
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const responseJson: UpdatePrinterServerResponse | ServerErrorResponse =
          await response.json();
        if (isUpdatePrinterServerResponse(responseJson)) {
          toast({
            title: "Printer has been successfully updated. Please reload page.",
            status: "success",
            isClosable: true,
            position: "top",
          });
          setUpdate(true);
          setLoading(false);
        } else if (isServerErrorResponse(responseJson)) {
          toast({
            title: "Printer could not be updated. Please try again.",
            status: "error",
            isClosable: true,
            position: "top",
          });
          setLoading(false);
        } else {
          toast({
            title: "Printer could not be updated. Please try again.",
            status: "error",
            isClosable: true,
            position: "top",
          });
          console.log(
            "Error: Json returned is not of type EnqueueServerResponse or ServerErrorResponse"
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  };

  return (
    <>
      <Tr key={printer.name}>
        <Td>{printer.name}</Td>
        <Td>
          <Select
            onChange={(e) => setStatus(e.target.value)}
            placeholder={status}
          >
            <option value="available">{Status.AVAILABLE}</option>
            <option value="busy">{Status.BUSY}</option>
            <option value="pending">{Status.PENDING}</option>
            <option value="maintenance">{Status.MAINTENANCE}</option>
            <option value="reserved">{Status.RESERVED}</option>
          </Select>
        </Td>
        <Td>
          <Select
            onChange={(e) => setFilament(e.target.value)}
            placeholder={filament}
          >
            <option value="green">Green</option>
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="blue">Blue</option>
            <option value="orange">Black</option>
            <option value="blue">Yellow</option>
            <option value="orange">White</option>
            <option value="blue">Grey</option>
          </Select>
        </Td>
        <Td>
          <Button
            isLoading={loading}
            loadingText="Updating"
            colorScheme="orange"
            variant="solid"
            onClick={(e) => handleUpdate(e)}
          >
            Update
          </Button>
        </Td>
      </Tr>
    </>
  );
};

export default PrintersTable;
