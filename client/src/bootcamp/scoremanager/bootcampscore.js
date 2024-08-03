import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { Actions } from "../../actions/actions";
import "./scoremanager.css";
import { DeleteIcon } from "@chakra-ui/icons"

export const BootcampScore = () => {
  const [dat, setDat] = useState([]);
  const [select, setSelect] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [marks, setMarks] = useState({});
  const toast = useToast();
  const searchInputRef = useRef(null);

  const fetchStudentData = async () => {
    try {
      const res = await Actions.Students();
      setDat(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const GivenMarks = async (user, marks, total, dayindex, taskindex) => {
    if (marks <= parseInt(total)) {
      await Actions.Givenmarks(user, marks, dayindex, taskindex)
        .then((res) => {
          if (res?.data) {
            fetchStudentData();
            toast({
              title: res?.data?.message,
              status: "success",
              position: "top-right",
              isClosable: true,
            });
          } else {
            toast({
              title: res?.data?.error,
              status: "error",
              position: "bottom-right",
              isClosable: true,
            });
          }
        })
        .catch((e) => {
          toast({
            title: e?.message,
            status: "error",
            position: "bottom-right",
            isClosable: true,
          });
        });
    } else {
      toast({
        title: "Marks error",
        status: "warning",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  const RemoveTask = async (user, marks, dayindex, taskindex) => {
    await Actions.RemoveTask(user, marks, dayindex, taskindex)
      .then((res) => {
        if (res?.data) {
          fetchStudentData();
          toast({
            title: res?.data?.message,
            status: "success",
            position: "top-right",
            isClosable: true,
          });
        } else {
          toast({
            title: res?.data?.error,
            status: "error",
            position: "bottom-right",
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        toast({
          title: e?.message,
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    fetchStudentData();

    const handleKeyDown = (event) => {
      if (event.shiftKey && (event.key === "f" || event.key === "F")) {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="scores">
      <Box display="flex" justifyContent="center" mb={6}>
        <InputGroup width="70%">
          <Input
            ref={searchInputRef}
            id="search"
            value={select}
            placeholder="Enter User mail or name"
            onChange={(e) => setSelect(e.target.value)}
          />
          <InputRightElement pointerEvents="none" width="auto">
            <Flex alignItems="center">
              <Kbd color="black">shift</Kbd> + <Kbd color="black">F</Kbd>{" "}
              <SearchIcon />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Box>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Flex flexDirection="column" alignItems="center">
          {dat
            .filter(
              (user) =>
                user?.Reg_No?.toString()?.toLowerCase()?.includes(select) ||
                user?.Reg_No?.toString()?.toUpperCase()?.includes(select) ||
                user?.Name?.toUpperCase()?.includes(select) ||
                user?.Name?.toLowerCase()?.includes(select)
            )
            ?.map(
              (x, index) =>
                x?.Tasks && (
                  <Box
                    key={index}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="auto"
                    shadow="lg"
                    m={4}
                    p={4}
                    width="100%"
                    maxW="xxl"
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="center"
                      mb={4}
                    >
                      <Heading as="h2" size="md" mb={4}>
                        {x?.Name?.toUpperCase()}
                      </Heading>

                      <Badge colorScheme="blue">{x?.Year} B.Tech</Badge>
                    </Flex>
                    <Table variant="simple" colorScheme="gray">
                      <Thead>
                        <Tr>
                          <Th>Day</Th>
                          <Th>Task No</Th>
                          <Th>Task</Th>
                          <Th>Score</Th>
                          <Th>Max Marks</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {Object.entries(x?.Tasks || {})?.map(
                          ([key, val]) =>
                            val && val?.map((val2, taskindex) => (
                              <Tr key={`${key}-${taskindex}`}>
                                <Td>{key}</Td>
                                <Td>{taskindex + 1}</Td>
                                <Td>{val2?.Task}</Td>
                                <Td>
                                  <Input
                                    size="sm"
                                    width="50px"
                                    textAlign="center"
                                    value={
                                      marks[`${x?.Name}-${key}-${taskindex}`] ||
                                      val2?.GetMarks ||
                                      ""
                                    }
                                    onChange={(e) =>
                                      setMarks((state) => ({
                                        ...state,
                                        [`${x?.Name}-${key}-${taskindex}`]: e.target.value,
                                      }))
                                    }
                                  />
                                </Td>
                                <Td>{val2?.Marks}</Td>
                                <Td display={"flex"} gap={2}>
                                  <Button
                                    size="sm"
                                    colorScheme="blue"
                                    width={"fit-content"}
                                    onClick={() =>
                                      GivenMarks(
                                        x?.Reg_No,
                                        marks[`${x?.Name}-${key}-${taskindex}`] || val2?.GotMarks,
                                        val2?.Marks,
                                        key,
                                        taskindex
                                      )
                                    }
                                  >
                                    Save
                                  </Button>
                                  <Popover>
                                    <PopoverTrigger>
                                      <Button bg={"red"} color={"white"} size="sm" width={"fit-content"}>
                                        <DeleteIcon />
                                      </Button>
                                    </PopoverTrigger>
                                    <Portal>
                                      <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverHeader align="center">Delete Task</PopoverHeader>
                                        <PopoverCloseButton />
                                        <PopoverBody
                                          justifyContent="center"
                                          display={"flex"}
                                          style={{ flexDirection: "column" }}
                                          gap={3}
                                        >
                                          <Button
                                            size="sm"
                                            colorScheme="red"
                                            onClick={() =>
                                              RemoveTask(
                                                x?.Reg_No,
                                                val2?.Task,
                                                key,
                                                taskindex
                                              )
                                            }
                                          >
                                            X
                                          </Button>
                                        </PopoverBody>
                                      </PopoverContent>
                                    </Portal>
                                  </Popover>
                                </Td>
                              </Tr>
                            ))
                        )}
                      </Tbody>
                    </Table>
                  </Box>
                )
            )}
        </Flex>
      )}
    </div>
  );
};

export default BootcampScore;
