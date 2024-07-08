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
  const [ showdelete, setShowdelete] = useState(false)
  const [deletestudent,setDeletestudent] = useState();
  const date = new Date();
  const toast = useToast();
  const searchRef = useRef(null);

  const handleSend = async (regd) => {
    try {
      const res = await Actions.SendOtp(regd);
      if (res?.data?.message) {
        setData(res?.data);
        toast({
          title: res.data.message,
          status: "success",
          position: "top-right",
          isClosable: true,
        });
      } else {
        toast({
          title: res.data.error,
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to send OTP",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  const handleYearSelect = (year) => {
    sessionStorage.setItem("year", year);
    window.location.reload();
  };

  const handleDeleteStudent = (stu) => {
 
    setDeletestudent(stu)
    setShowdelete(true) 
 };

  const handleDelete = async () => {
    document.getElementById("password").style.display = "block";
    try {
      const adminCheckRes = await axios.post(
        `${process.env.REACT_APP_database}/admincheck/${sessionStorage.gmail}/${otp}`
      );
      if (adminCheckRes.data) {
        await axios.post(
          `${process.env.REACT_APP_database}/deletestudent/${atnd}`
        );
        window.location.reload();
      } else {
        toast({
          title: "Enter correct password",
          status: "error",
          position: "bottom-left",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to delete student",
        status: "error",
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  const handleRegister = () => {
    sessionStorage.removeItem("yoga");
  };

  const fetchData = async () => {
    try {
      const studentRes = await axios.post(
        `${process.env.REACT_APP_database}/students`
      );
      const storeddata = studentRes.data.sort((a, b) => b?.Num - a?.Num);
      setDat(storeddata);
      const totalDaysRes = await axios.post(
        `${process.env.REACT_APP_database}/totaldays`
      );
      setTat(totalDaysRes.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to fetch data",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
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
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Navbars />
      <SednOTP
        atnd={atnd}
        isOpen={show}
        onClose={() => setShow(false)}
        data={data}
      
      />
       <DeleteConform
        atnd={deletestudent}
        isOpen={showdelete}
        handleDelete={handleDelete}
        onClose={() => setShowdelete(false)}
      />
      <Box className="otp" id="password" display="none">
        <input
          type="password"
          align="center"
          placeholder="Enter Password"
          onChange={(e) => setOtp(e.target.value)}
        />
        <Box display="flex" justifyContent="space-between">
          <Button onClick={handleDelete}>
            <b>Submit</b>
          </Button>
          <Button
            bg="red"
            onClick={() =>
              (document.getElementById("password").style.display = "none")
            }
          >
            <b>X</b>
          </Button>
        </Box>
      </Box>
      <Box className="clgname" textAlign="center" my={4}>
        SRKREC CSE DEPT.
      </Box>
      <Flex justifyContent="center" gap={10} mb={4}>
        <Button className="yearbtnsink" onClick={() => handleYearSelect(1)}>
          <b>1st Year</b>
        </Button>
        <Button
          className="yearbtnsink"
          bg={"red.300"}
          onClick={() => handleYearSelect(2)}
        >
          <b>2nd Year</b>
        </Button>
        <Button
          className="yearbtnsink"
          bg={"blue.300"}
          onClick={() => handleYearSelect(3)}
        >
          <b>3rd Year</b>
        </Button>
        <Button
          className="yearbtnsink"
          bg={"green.300"}
          onClick={() => handleYearSelect(4)}
        >
          <b>4th Year</b>
        </Button>
      </Flex>

      <Box
        borderWidth="1px"
        borderRadius="lg"
       
        shadow="md"
        mt={4}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6} overflow="auto">
          <Box
            textAlign="center"
            p={2}
            borderRadius="md"
            border="1px"
            borderColor="gray.200"
            m={2}
            boxShadow="base"
          >
            <Box>Total days</Box>
            <Box>{tat.Days}</Box>
          </Box>

          <Box
            textAlign="center"
            p={2}
            borderRadius="md"
            border="1px"
            borderColor="gray.200"
            m={2}
               boxShadow="base"
          >
            <Box textAlign="center">
              <b>Scrum Master</b>
            </Box>
            <Box>{tat.Scum}</Box>
          </Box>
          <Box
            minW={"50px"}
            textAlign="center"
            p={3}
            borderRadius="md"
            border="1px"
            borderColor="gray.200"
            m={2}
               boxShadow="base"
          >
            <Link to="/register" onClick={handleRegister}>
              <Button>Register</Button>
            </Link>
          </Box>
        </Grid>
        <Box
         ml={{ base: "1", md: "10" }}
         mr={{ base: "1", md: "10" }}
         p={2}
         boxShadow="base"
         borderRadius="md"
         overflow="auto"
         
      className="sticky-search-box"
         mb={5}
         bg="white"
         zIndex={2}
            
            >
          <InputGroup>
            <Input
              type="text"
              autoComplete="none"
              placeholder="Enter User mail or name"
              onChange={(e) => setSelect(e.target.value)}
              ref={searchRef}
            />
            <InputRightElement mr={12} mt={3}>
              <Kbd color={"gray.600"}>Shift</Kbd> + <Kbd color={"gray.600"}>F</Kbd>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box boxShadow="base" borderRadius="md" ml={{ base: "1", md: "10" }} mr={{ base: "1", md: "10" }} overflow="auto">

    
        <Table variant="simple" size="lg" id="studetail"  p={3} >
          {isLoading ? (
            <Tbody>
              <Tr>
                <Td colSpan={6} textAlign="center">
                  Loading...
                </Td>
              </Tr>
            </Tbody>
          ) : (
            <>
              <Thead>
                <Tr>
                  <Th>SNO</Th>
                  <Th>REGISTER NUMBER</Th>
                  <Th>NAME</Th>
                  <Th>CLICK</Th>
                  <Th>Streak</Th>
                  <Th>Remove</Th>
                </Tr>
              </Thead>
              <Tbody>
                {dat
                  ?.filter(
                    (user) =>
                      user?.Reg_No.toLowerCase().includes(
                        select?.toLowerCase()
                      ) ||
                      user?.Name.toLowerCase().includes(select?.toLowerCase())
                  )
                  ?.map(
                    (x, index) =>
                      x.Year === sessionStorage.year && (
                        <Tr key={x.Reg_No}>
                          <Td>{index + 1}</Td>
                          <Td>{x?.Reg_No.toUpperCase()}</Td>
                          <Td>{x?.Name.toUpperCase()}</Td>
                          <Td>
                            {x.Login !== date.toDateString() && (
                              <Button
                                bg="#3498db"
                                color="white"
                                borderRadius="8px"
                                onClick={() => {
                                  handleSend(x?.Reg_No);
                                  setShow(true);
                                  setAtnd(x?.Reg_No);
                                }}
                              >
                                <b>Attend</b>
                              </Button>
                            )}
                          </Td>
                          <Td>
                            <Box>
                              <Box className="main-streak-text" height={"45px"}>
                                <b>{parseInt(x?.Num)}</b>
                              </Box>
                            </Box>
                          </Td>
                          <Td>
                            <Button
                              bg="red"
                              color="white"
                              borderRadius="5px"
                              onClick={()=>handleDeleteStudent(x?.Reg_No)}
                              onClickCapture={() => setAtnd(x.Gmail)}
                            >
                            <DeleteOutlineIcon />
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
    </>
  );
};

export default Login;
