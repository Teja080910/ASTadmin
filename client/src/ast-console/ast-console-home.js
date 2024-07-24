import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Switch, Input, Button, FormControl, FormLabel, IconButton, useToast, VStack, Divider, Text } from '@chakra-ui/react';
import { ConsoleActions } from './console-action/console-actions';
import { FaTrash, FaEdit } from 'react-icons/fa';

const ConsoleHome = ({ adminEmail,password}) => {
  const [routes, setRoutes] = useState({});
  const [newRoute, setNewRoute] = useState('');
  const [editRoute, setEditRoute] = useState('');
  const [editNewRoute, setEditNewRoute] = useState('');
  const toast = useToast();

  useEffect(() => {
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
    ConsoleActions.toggleRouteVisibility(path, adminEmail,password)
      .then(response => {
        if (response.data.success) {
          setRoutes(prevRoutes => ({
            ...prevRoutes,
            [path]: !prevRoutes[path]
          }));
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
    if (newRoute) {
      ConsoleActions.addRoute({ path: newRoute }, adminEmail,password)
        .then(response => {
          if (response.data.success) {
            setRoutes(prevRoutes => ({
              ...prevRoutes,
              [newRoute]: true
            }));
            setNewRoute('');
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
    ConsoleActions.deleteRoute(path, adminEmail,password)
      .then(response => {
        if (response.data.success) {
          setRoutes(prevRoutes => {
            const newRoutes = { ...prevRoutes };
            delete newRoutes[path];
            return newRoutes;
          });
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

  const updateRoute = (oldPath) => {
    ConsoleActions.updateRouteName(oldPath, editNewRoute, adminEmail,password)
      .then(response => {
        if (response.data.success) {
          setRoutes(prevRoutes => {
            const newRoutes = { ...prevRoutes };
            delete newRoutes[oldPath];
            newRoutes[editNewRoute] = prevRoutes[oldPath];
            return newRoutes;
          });
          setEditRoute('');
          setEditNewRoute('');
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
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        <Box maxW={{ base: "100%", md: "75%", lg: "50%" }} m={1} boxShadow="base" p={4}>
          <Text align="center" as="h3">Add Routes</Text>
          <FormControl>
            <FormLabel fontWeight="bold">Path</FormLabel>
            <Input
              value={newRoute}
              onChange={(e) => setNewRoute(e.target.value)}
              placeholder="/new-path"
              variant="outline"
            />
            <Button mt={4} colorScheme="teal" onClick={addRoute}>Add Route</Button>
          </FormControl>
        </Box>
        <Divider my={4} />
        <Text align="center" as="h3">Available Routes</Text>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Path</Th>
              <Th>Is Visible?</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(routes).map((path, index) => (
              <Tr key={index}>
                <Td>
                  {editRoute === path ? (
                    <Input
                      value={editNewRoute}
                      onChange={(e) => setEditNewRoute(e.target.value)}
                      placeholder="Edit Route Path"
                      variant="outline"
                    />
                  ) : (
                    path
                  )}
                </Td>
                <Td>
                  <Switch
                    isChecked={routes[path]}
                    onChange={() => toggleVisibility(path)}
                    colorScheme="teal"
                  />
                </Td>
                <Td>
                  {editRoute === path ? (
                    <>
                      <Button colorScheme="blue" onClick={() => updateRoute(path)} ml={2}>Update</Button>
                      <Button colorScheme="gray" onClick={() => { setEditRoute(''); setEditNewRoute(''); }} ml={2}>Cancel</Button>
                    </>
                  ) : (
                    <IconButton
                      icon={<FaEdit />}
                      onClick={() => { setEditRoute(path); setEditNewRoute(path); }}
                      aria-label="Edit"
                      colorScheme="blue"
                      mr={2}
                    />
                  )}
                  <IconButton
                    icon={<FaTrash />}
                    onClick={() => deleteRoute(path)}
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
