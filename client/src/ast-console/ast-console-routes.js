import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack
} from '@chakra-ui/react';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import React, { useEffect, useRef, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ConsoleActions } from './console-action/console-actions';

const ConsoleHome = ({ adminEmail }) => {
  const [routes, setRoutes] = useState({});
  const [newRoute, setNewRoute] = useState('');
  const [editRoute, setEditRoute] = useState('');
  const [editNewRoute, setEditNewRoute] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef()
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {

    ConsoleActions.fetchRoutes(adminEmail)
      .then(response => {
        if (!response.data?.error) {
          setRoutes(response?.data?.routes);
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
    ConsoleActions.toggleRouteVisibility(path)
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
      ConsoleActions.addRoute({ path: newRoute })
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
            onClose();
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
    ConsoleActions.deleteRoute(path)
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
    ConsoleActions.updateRouteName(oldPath, editNewRoute)
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

  // Filter routes based on search query
  const filteredRoutes = Object.keys(routes).filter(route =>
    route.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === 'f' && event.shiftKey) {
        searchRef.current.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Route</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel fontWeight="bold">Path</FormLabel>
                <Input
                  value={newRoute}
                  onChange={(e) => setNewRoute(e.target.value)}
                  placeholder="/new-path"
                  variant="outline"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={addRoute}>Add Route</Button>
              <Button ml={3} onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Box justifyContent={"flex-end"} display={"flex"}>
          <Button colorScheme="teal" onClick={onOpen}>Add Route</Button>
        </Box>
        <Text align="center" as="h3">Available Routes</Text>
        <InputGroup size="md" mb={4}>
          <Input
            placeholder="Search routes"
            ref={searchRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outline"
          />
          <InputRightElement width="auto" mr={2}>
            <Kbd bg='teal'>shift</Kbd> + <Kbd bg='teal'>f</Kbd>
          </InputRightElement>
        </InputGroup>
        <Box overflow="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Path</Th>
                <Th>Is Visible?</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredRoutes.map((path, index) => (
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
                  <Td style={{ display: "flex", flexDirection: "row", gap: 2 }}>
                    {editRoute === path ? (
                      <>
                        <Button colorScheme="green" onClick={() => updateRoute(path)} p={0} width={"fit-content"}>
                          <DoneIcon />
                        </Button>
                        <Button colorScheme="orange" onClick={() => { setEditRoute(''); setEditNewRoute(''); }} p={0} width={"fit-content"}>
                          <ClearIcon />
                        </Button>
                      </>
                    ) : (
                      <IconButton
                        icon={<FaEdit />}
                        onClick={() => { setEditRoute(path); setEditNewRoute(path); }}
                        aria-label="Edit"
                        colorScheme="blue"
                        w={"fit-content"}
                      />
                    )}
                    <IconButton
                      icon={<FaTrash />}
                      onClick={() => deleteRoute(path)}
                      aria-label="Delete"
                      colorScheme="red"
                      w={"fit-content"}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
    </Box>
  );
};

export default ConsoleHome;