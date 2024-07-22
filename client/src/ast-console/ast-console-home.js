import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Switch, Input, Button, FormControl, FormLabel, IconButton, useToast, VStack, HStack, Divider, Text } from '@chakra-ui/react';
import { ConsoleActions } from './console-action/console-actions';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ConsoleHome = ({ adminEmail }) => {
  const [routes, setRoutes] = useState([]);
  const [newRoute, setNewRoute] = useState({ path: '', name: '' });
  const [editRoute, setEditRoute] = useState({ path: '', name: '' });
  const toast = useToast(); // Initialize toast notifications

  useEffect(() => {
    // Fetch routes from the server based on admin email
    ConsoleActions.fetchRoutes(adminEmail)
      .then(response => {
        if (!response.data?.error) {
          setRoutes(response.data);
        } else {
          toast({
            title: 'Error',
            description: response.data.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching routes:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch routes.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }, [adminEmail, toast]);

  const toggleVisibility = (path) => {
    ConsoleActions.toggleRouteVisibility(path, adminEmail)
      .then(response => {
        if (response.data.success) {
          const newRoutes = routes.map(route => 
            route.path === path ? { ...route, visible: !route.visible } : route
          );
          setRoutes(newRoutes);
          toast({
            title: 'Success',
            description: 'Route visibility updated.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Error',
            description: response.data.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(error => {
        console.error('Error toggling route visibility:', error);
        toast({
          title: 'Error',
          description: 'Failed to toggle route visibility.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const addRoute = () => {
    if (newRoute.path && newRoute.name) {
      ConsoleActions.addRoute(newRoute, adminEmail)
        .then(response => {
          if (response.data.success) {
            setRoutes([...routes, { ...newRoute, visible: true }]);
            setNewRoute({ path: '', name: '' });
            toast({
              title: 'Success',
              description: 'New route added.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Error',
              description: response.data.error,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch(error => {
          console.error('Error adding new route:', error);
          toast({
            title: 'Error',
            description: 'Failed to add new route.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  const deleteRoute = (path) => {
    ConsoleActions.deleteRoute(path, adminEmail)
      .then(response => {
        if (response.data.success) {
          setRoutes(routes.filter(route => route.path !== path));
          toast({
            title: 'Success',
            description: 'Route deleted.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Error',
            description: response.data.error,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch(error => {
        console.error('Error deleting route:', error);
        toast({
          title: 'Error',
          description: 'Failed to delete route.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const updateRoute = (path) => {
    if (editRoute.name) {
      ConsoleActions.updateRouteName(path, editRoute.name, adminEmail)
        .then(response => {
          if (response.data.success) {
            const newRoutes = routes.map(route => 
              route.path === path ? { ...route, name: editRoute.name } : route
            );
            setRoutes(newRoutes);
            setEditRoute({ path: '', name: '' });
            toast({
              title: 'Success',
              description: 'Route name updated.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Error',
              description: response.data.error,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch(error => {
          console.error('Error updating route name:', error);
          toast({
            title: 'Error',
            description: 'Failed to update route name.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">

        <Box maxW={{base:"100%",md:"75%",lg:"50%"}} m={1} boxShadow={"base"} p={4}>
<Text align="center" as="h3">Add Routes</Text> 
       
        <FormControl>
          <FormLabel fontWeight="bold">Path</FormLabel>
          <Input
            value={newRoute.path}
            onChange={(e) => setNewRoute({ ...newRoute, path: e.target.value })}
            placeholder="/new-path"
            variant="outline"
          />
          <FormLabel mt={4} fontWeight="bold">Name</FormLabel>
          <Input
            value={newRoute.name}
            onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
            placeholder="New Route"
            variant="outline"
          />
          <Button mt={4} colorScheme="teal" onClick={addRoute}>Add Route</Button>
        </FormControl>
        </Box>
        <Divider my={4} />
        <Text align="center" as="h3">Avaliable Routes</Text> 

        <Table variant="simple" >
          <Thead>
            <Tr>
              {/* <Th>Route</Th> */}
              <Th>Component</Th>
              <Th>Is Visible ?</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {routes.map((route, index) => (
              <Tr key={index}>
                {/* <Td>{route.path}</Td> */}
                <Td>
                  {editRoute.path === route.path ? (
                    <Input
                      value={editRoute.name}
                      onChange={(e) => setEditRoute({ ...editRoute, name: e.target.value })}
                      placeholder="Edit Route Name"
                      variant="outline"
                    />
                  ) : (
                    route.name
                  )}
                </Td>
                <Td>
                  <Switch
                    isChecked={route.visible}
                    onChange={() => toggleVisibility(route.path)}
                    colorScheme="teal"
                  />
                </Td>
                <Td>
                  {editRoute.path === route.path ? (
                    <Button colorScheme="blue" onClick={() => updateRoute(route.path)} ml={2}>Update</Button>
                  ) : (
                    <IconButton
                      icon={<FaEdit />}
                      onClick={() => setEditRoute({ path: route.path, name: route.name })}
                      aria-label="Edit"
                      colorScheme="blue"
                      mr={2}
                    />
                  )}
                  <IconButton
                    icon={<FaTrash />}
                    onClick={() => deleteRoute(route.path)}
                    aria-label="Delete"
                    colorScheme="red"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Box>
  );
};

export default ConsoleHome;
