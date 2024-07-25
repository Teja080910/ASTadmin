import React, { useEffect, useState } from "react";
import { Box, Spinner, Text, FormControl, FormLabel, Input, Button, Select, Table, Thead, Tbody, Tr, Th, Td, useToast } from "@chakra-ui/react";
import axios from "axios";

export const AdminManagementPanel = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [adminType, setAdminType] = useState("");

  const toast = useToast();
  const fetchAdmins = async () => {
    try {
      const response = await axios.post("http://localhost:8000/ast-console/admins/getadmins");
      setAdmins(response.data.admins);
      setLoading(false);
    } catch (err) {
      setError("Error fetching admins");
      setLoading(false);
    }
  };
  useEffect(() => {


    fetchAdmins();
  }, []);

  const handleDelete = async (mail) => {
    try {
      const response = await axios.post("http://localhost:8000/ast-console/admins/deleteadmin", { adminMail: mail });

      if (response.data.message === "Admin deleted successfully") {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.Gmail !== mail));
        toast({
          title: "Success",
          description: "Admin deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Failed to delete admin",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
      toast({
        title: "Error",
        description: "Error deleting admin",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCreateAdmin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/ast-console/admins/addadmin", {
        mail,
        password,
        phone,
        adminType,
      });
      if (response.data.error) {
        setError(response.data.error);
        toast({
          title: "Error",
          description: response.data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {

       
        fetchAdmins()
        setMail("");
        setPassword("");
        setPhone("");
        setAdminType("");
        toast({
          title: "Success",
          description: "Admin created successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      setError("Error creating admin");
      toast({
        title: "Error",
        description: "Error creating admin",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };



  return (
    <Box p={5}>
      <Text fontSize="xl" mb={4}>Admin Management Panel</Text>

      <FormControl id="email" mb={4}>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
      </FormControl>

      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>

      <FormControl id="phone" mb={4}>
        <FormLabel>Phone</FormLabel>
        <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </FormControl>

      <FormControl id="adminType" mb={4}>
        <FormLabel>Admin Type</FormLabel>
        <Select value={adminType} onChange={(e) => setAdminType(e.target.value)}>
          <option value="">Select Admin Type</option>
          <option value="admin">Admin</option>
          <option value="edit">Edit</option>
          <option value="superAdmin">Super Admin</option>
        </Select>
      </FormControl>

      <Button colorScheme="blue" onClick={handleCreateAdmin}>Create Admin</Button>

      <Table variant="simple" mt={4}>
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Phone</Th>
        
            <Th>Org</Th>
            <Th>Super Admin</Th>
            <Th>Edit</Th>
            <Th>Admin</Th>
       
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {admins.map((admin) => (
            <Tr key={admin._id}>
              <Td>{admin.Gmail}</Td>
              <Td>{admin.Number}</Td>
              <Td>{admin.isOrg ? 'Yes' : 'No'}</Td>
              <Td>{admin.isSuperAdmin ? 'Yes' : 'No'}</Td>
              <Td>{admin.isEdit ? 'Yes' : 'No'}</Td>
              <Td>{admin.isAdmin ? 'Yes' : 'No'}</Td>
           
              <Td>
                <Button width={"fit-content"} colorScheme="red" onClick={() => handleDelete(admin.Gmail)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
