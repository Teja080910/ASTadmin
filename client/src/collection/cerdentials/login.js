import {
  Box,
  Button,
  useToast,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Grid,
  Flex,
  Input,
  InputGroup,
  Kbd,
  InputRightElement,
  Text,
  Spinner,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Actions } from "../../actions/actions";
import { Navbars } from "../nav&foot/nav";
import { SednOTP } from "./sendotp";
import { DeleteConform } from "./deleteConformation";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Login = () => {
  const [dat, setDat] = useState([]);
  const [data, setData] = useState();
  const [atnd, setAtnd] = useState();
  const [select, setSelect] = useState("");
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState();
  const [tat, setTat] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showdelete, setShowdelete] = useState(false);
  const [deletestudent, setDeletestudent] = useState();
  const date = new Date();
  const toast = useToast();
  const searchRef = useRef(null);

  const handleSend = async (regd) => {
    try {
      const res = await Actions.SendOtp(regd);
      if (res?.data?.message) {
        setData(res?.data);
        toast({ title: res.data.message, status: "success", position: "top-right", isClosable: true });
      } else {
        toast({ title: res.data.error, status: "error", position: "bottom-right", isClosable: true });
      }
    } catch (error) {
      toast({ title: "Failed to send OTP", status: "error", position: "bottom-right", isClosable: true });
    }
  };

  const handleYearSelect = (year) => {
    sessionStorage.setItem("year", year);
    window.location.reload();
  };

  const handleDeleteStudent = (stu) => {
    setDeletestudent(stu);
    setShowdelete(true);
  };

  const handleDelete = async () => {
    document.getElementById("password").style.display = "block";
    try {
      const adminCheckRes = await axios.post(`${process.env.REACT_APP_database}/admincheck/${sessionStorage.gmail}/${otp}`);
      if (adminCheckRes.data) {
        await axios.post(`${process.env.REACT_APP_database}/deletestudent/${atnd}`);
        window.location.reload();
      } else {
        toast({ title: "Enter correct password", status: "error", position: "bottom-left", isClosable: true });
      }
    } catch (error) {
      toast({ title: "Failed to delete student", status: "error", position: "bottom-left", isClosable: true });
    }
  };

  const handleRegister = () => sessionStorage.removeItem("yoga");

  const fetchData = async () => {
    try {
      const studentRes = await axios.post(`${process.env.REACT_APP_database}/students`);
      const storeddata = studentRes.data.sort((a, b) => b?.Num - a?.Num);
      setDat(storeddata);
      const totalDaysRes = await axios.post(`${process.env.REACT_APP_database}/totaldays`);
      setTat(totalDaysRes.data);
      setIsLoading(false);
    } catch (error) {
      toast({ title: "Failed to fetch data", status: "error", position: "bottom-right", isClosable: true });
    }
  };

  useEffect(() => {
    fetchData();
    const handleKeyDown = (event) => {
      if (event.shiftKey && (event.key === "F" || event.key === "f")) {
        searchRef.current.focus();
        searchRef.current.select(2);
        searchRef.current.value = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAttendName = () => {
    const updatedDat = dat.map((student) =>
      student.Reg_No === atnd ? { ...student, Login: date.toDateString(), Num: parseInt(student.Num) + 1 } : student
    );
    setDat(updatedDat);
  };

  const yearColors = { 1: '#6366f1', 2: '#d946ef', 3: '#f59e0b', 4: '#22c55e' };

  return (
    <Box bg="surface.50" minH="100vh">
      <Navbars />
      <SednOTP atnd={atnd} isOpen={show} onClose={() => setShow(false)} data={data} refresh={handleAttendName} />
      <DeleteConform atnd={deletestudent} isOpen={showdelete} handleDelete={handleDelete} onClose={() => setShowdelete(false)} />
      
      <Box className="otp" id="password" display="none">
        <input type="password" align="center" placeholder="Enter Password" onChange={(e) => setOtp(e.target.value)} />
        <Box display="flex" justifyContent="space-between">
          <Button onClick={handleDelete}><b>Submit</b></Button>
          <Button bg="red" onClick={() => (document.getElementById("password").style.display = "none")}><b>X</b></Button>
        </Box>
      </Box>

      <Box maxW="1200px" mx="auto" px={{ base: 2, md: 4 }} py={6}>
        <Text className="clgname" textAlign="center" mb={4}>SRKREC CSE DEPT.</Text>
        
        <HStack justify="center" gap={3} mb={6} flexWrap="wrap">
          {[1, 2, 3, 4].map((year) => (
            <Button
              key={year}
              bg={yearColors[year]}
              color="white"
              _hover={{ transform: 'translateY(-1px)', boxShadow: `0 4px 12px ${yearColors[year]}40` }}
              onClick={() => handleYearSelect(year)}
              size="md"
              borderRadius="md"
              fontWeight={600}
            >
              {year} Year
            </Button>
          ))}
        </HStack>

        <Box bg="white" borderRadius="xl" boxShadow="card" border="1px solid" borderColor="surface.100" overflow="hidden" className="animate-fade-in">
          <Grid templateColumns="repeat(3, 1fr)" gap={0} borderBottom="1px solid" borderColor="surface.100" bg="surface.50">
            <Box textAlign="center" p={4} borderRight="1px solid" borderColor="surface.100">
              <Text fontSize="xs" fontWeight={600} color="surface.400" textTransform="uppercase" letterSpacing="0.05em">Total Days</Text>
              <Text fontSize="2xl" fontWeight={700} color="brand.600" mt={1}>{tat?.Days || '-'}</Text>
            </Box>
            <Box textAlign="center" p={4} borderRight="1px solid" borderColor="surface.100">
              <Text fontSize="xs" fontWeight={600} color="surface.400" textTransform="uppercase" letterSpacing="0.05em">Scrum Master</Text>
              <Text fontSize="2xl" fontWeight={700} color="brand.600" mt={1}>{tat?.Scum || '-'}</Text>
            </Box>
            <Box textAlign="center" p={4}>
              <Link to="/register" onClick={handleRegister}>
                <Button size="sm" colorScheme="brand" borderRadius="md">Register</Button>
              </Link>
            </Box>
          </Grid>

          <Box p={4} borderBottom="1px solid" borderColor="surface.100" className="sticky-search-box">
            <InputGroup>
              <Input
                type="text"
                autoComplete="none"
                placeholder="Search by name or register number..."
                onChange={(e) => setSelect(e.target.value)}
                ref={searchRef}
                bg="surface.50"
                border="1px solid"
                borderColor="surface.200"
                _focus={{ borderColor: 'brand.400', boxShadow: 'glow' }}
              />
              <InputRightElement mr={4} mt={1}>
                <Kbd color="surface.500" bg="surface.100" border="1px solid" borderColor="surface.200" borderRadius="md">Shift</Kbd>
                <Text mx={1} color="surface.400">+</Text>
                <Kbd color="surface.500" bg="surface.100" border="1px solid" borderColor="surface.200" borderRadius="md">F</Kbd>
              </InputRightElement>
            </InputGroup>
          </Box>

          <Box overflowX="auto">
            <Table variant="simple" size="sm">
              {isLoading ? (
                <Tbody>
                  <Tr>
                    <Td colSpan={6} textAlign="center" py={10}>
                      <Spinner size="xl" color="brand.500" thickness="3px" />
                    </Td>
                  </Tr>
                </Tbody>
              ) : (
                <>
                  <Thead>
                    <Tr>
                      <Th px={4} py={3}>SNO</Th>
                      <Th px={4} py={3}>REGISTER NUMBER</Th>
                      <Th px={4} py={3}>NAME</Th>
                      <Th px={4} py={3}>ATTEND</Th>
                      <Th px={4} py={3}>STREAK</Th>
                      <Th px={4} py={3}>REMOVE</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {dat
                      ?.filter(
                        (user) =>
                          user?.Reg_No.toLowerCase().includes(select?.toLowerCase()) ||
                          user?.Name.toLowerCase().includes(select?.toLowerCase())
                      )
                      ?.map(
                        (x, index) =>
                          x.Year === sessionStorage.year && (
                            <Tr key={x.Reg_No} _hover={{ bg: 'surface.50' }}>
                              <Td px={4}>{index + 1}</Td>
                              <Td px={4} fontWeight={500}>{x?.Reg_No.toUpperCase()}</Td>
                              <Td px={4} fontWeight={600}>{x?.Name.toUpperCase()}</Td>
                              <Td px={4}>
                                {x.Login !== date.toDateString() && (
                                  <Button
                                    bg="brand.500"
                                    color="white"
                                    size="sm"
                                    borderRadius="md"
                                    _hover={{ bg: 'brand.600' }}
                                    onClick={() => { handleSend(x?.Reg_No); setShow(true); setAtnd(x?.Reg_No); }}
                                  >
                                    Attend
                                  </Button>
                                )}
                                {x.Login === date.toDateString() && (
                                  <Badge colorScheme="green" variant="subtle" px={2} py={1} borderRadius="full">Done</Badge>
                                )}
                              </Td>
                              <Td px={4}>
                                <Box className="main-streak-text">
                                  <Text className="streak-value">{parseInt(x?.Num)}</Text>
                                </Box>
                              </Td>
                              <Td px={4}>
                                <Button
                                  bg="red.50"
                                  color="red.500"
                                  size="sm"
                                  borderRadius="md"
                                  _hover={{ bg: 'red.100' }}
                                  onClick={() => handleDeleteStudent(x?.Reg_No)}
                                  onClickCapture={() => setAtnd(x.Gmail)}
                                >
                                  <DeleteOutlineIcon fontSize="small" />
                                </Button>
                              </Td>
                            </Tr>
                          )
                      )}
                  </Tbody>
                </>
              )}
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
