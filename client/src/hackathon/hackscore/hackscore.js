import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  Kbd,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { Actions } from "../../actions/actions";
import "./hackscore.css";
import { SearchIcon } from "@chakra-ui/icons";

export const HackScore = () => {
  const [dat, setDat] = useState([]);
  const [select, setSelect] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [marks, setMarks] = useState({});
  const toast = useToast();
  const searchInputRef = useRef(null);

  const fetchStudentData = async () => {
    try {
      const res = await Actions.TeamsCodes();
      setDat(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const GivenMarks = async (code, marks, taskindex) => {
    try {
      const res = await Actions.Roundmarks(code, marks, taskindex);
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
    } catch (error) {
      toast({
        title: error?.message,
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.shiftKey && (event.key === "f" || event.key === "F")) {
      event.preventDefault();
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    fetchStudentData();
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="scores">
      <br />
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
                            <Kbd color="black">shift</Kbd> + <Kbd color="black">F</Kbd> <SearchIcon />
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
                user?.Team?.toLowerCase().includes(select) ||
                user?.Team?.toUpperCase().includes(select) ||
                user?.TeamCode?.toString().includes(select)
            )
            .map((team, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                overflow="auto"
                shadow="lg"
                m={4}
                p={4}
                textAlign="center"
                width="100%"
                maxW="xx-l"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Heading
                    as="h2"
                    size="md"
                    mb={4}
                    color={!team?.Team ? "red" : "darkgreen"}
                  >
                    {team?.Team || "Not Selected"}
                  </Heading>
                  <Heading as="h2" size="md" mb={4}>
                    {team?.TeamCode}
                  </Heading>
                </Flex>

                {team?.Team && team?.Rounds && (
                  <Table variant="simple" colorScheme="gray">
                    <Thead>
                      <Tr>
                        <Th>Round</Th>
                        <Th>Task</Th>
                        <Th>Score</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Object.values(team?.Rounds || {}).map(
                        (round, taskindex) => (
                          <Tr key={`round-${taskindex}`}>
                            <Td>{taskindex + 1}</Td>
                            <Td>{round?.Task}</Td>
                            <Td>
                              <Input
                                size="sm"
                                width="50px"
                                textAlign="center"
                                value={
                                  marks[`${team?.TeamCode}-${taskindex + 1}`] ||
                                  round?.Marks ||
                                  ""
                                }
                                onChange={(e) =>
                                  setMarks((state) => ({
                                    ...state,
                                    [`${team?.TeamCode}-${taskindex + 1}`]:
                                      e.target.value,
                                  }))
                                }
                              />
                            </Td>
                            <Td>
                              <Button
                                size="sm"
                                colorScheme="blue"
                                onClick={() =>
                                  GivenMarks(
                                    team?.TeamCode,
                                    marks[`${team?.TeamCode}-${taskindex + 1}`],
                                    taskindex + 1
                                  )
                                }
                              >
                                Save
                              </Button>
                            </Td>
                          </Tr>
                        )
                      )}
                    </Tbody>
                  </Table>
                )}
              </Box>
            ))}
        </Flex>
      )}
    </div>
  );
};

export default HackScore;
