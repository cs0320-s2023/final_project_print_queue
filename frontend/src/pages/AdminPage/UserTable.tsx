import React, { useEffect, useState } from "react";
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
import UserService, { IUser } from "../../utils/UserService";

export interface IUserObject {
  [key: string]: IUser;
}

function UserTable() {
  const [users, setUsers] = useState<IUserObject>({});

  useEffect(() => {
    UserService.getAll(setUsers);
  }, []);

  return (
    <>
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
                    <AuthRolesMenu
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

interface AuthRolesMenuProps {
  authRole: string;
  uid: string;
  user: IUser;
}

const AuthRolesMenu = ({ authRole, uid, user }: AuthRolesMenuProps) => {
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

export default UserTable;
