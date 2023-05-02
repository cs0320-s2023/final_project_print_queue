import React, { useEffect, useState } from "react";
import UserService, { IUser } from "../utils/UserService";
import {
  Box,
  Heading,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export interface IUserObject {
  [key: string]: IUser;
}

function AdminDashboard() {
  const [users, setUsers] = useState<IUserObject>({});

  useEffect(() => {
    UserService.getAll(setUsers);
  }, []);

  return (
    <>
      <Box>
        <Heading as="h1" size="lg">
          Admin Dashboard
        </Heading>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <TableCaption>User Authorization Table</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(users).map((key) => {
              return (
                <Tr key={key}>
                  <Td>{users[key].displayName}</Td>
                  <Td>{users[key].email}</Td>
                  <Td>
                    <AdminRolesMenu
                      authRole={users[key].role}
                      uid={key}
                      user={users[key]}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

interface AdminRolesMenuProps {
  authRole: string;
  uid: string;
  user: IUser;
}

const AdminRolesMenu = ({ authRole, uid, user }: AdminRolesMenuProps) => {
  const [role, setRole] = useState(authRole);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (role === e.target.value) return;
    let updatedUser = { ...user, role: e.target.value };
    UserService.update(uid, updatedUser);
  };

  return (
    <Select onChange={(e) => handleChange(e)} placeholder={role}>
      <option value="viewer">viewer</option>
      <option value="user">user</option>
      <option value="admin">admin</option>
      <option value="dev">dev</option>
    </Select>
  );
};

export default AdminDashboard;
