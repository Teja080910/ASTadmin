import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
import {
  useToast,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spinner,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export const Yoga = () => {
  const [dat, sdat] = useState([]);
  const [atnd, satnd] = useState({});
  const [select, sselect] = useState("");
  const [year, syear] = useState("");
  const [otp, sotp] = useState("");
  const [x, sx] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const date = new Date();
  const searchRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Attend = async () => {
    try {
      const responce = await axios.post(
        process.env.REACT_APP_database + "/student/" + atnd.Gmail
      );
      if (responce.data) {
        if (x === 1) {
          atnd.Num = parseInt(responce.data.MrngStreak) + 1;
          sx(2);
        }
        const responce1 = await axios.post(
          process.env.REACT_APP_database +
            "/sadhanaloginstudent/" +
            atnd.Gmail +
            "/" +
            atnd.Num +
            "/" +
            date.toDateString()
        );
        if (responce1) {
          toast({
            title: atnd.Reg_No + " Attend",
            status: "success",
            position: "top",
            isClosable: true,
          });
          setTimeout(() => {
            window.location.reload(1);
          }, 1000);
        }
      } else {
        toast({
          title: "Student not found",
          status: "error",
          position: "bottom-left",
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Register = async () => {
    const res = await axios.post(
      process.env.REACT_APP_database + "/sadhanasignup/" + otp
    );
    if (res) {
      toast({
        title: "Register Successfully",
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });
      setTimeout(() => {
        window.location = "/yoga";
      }, 1000);
    } else {
      toast({
        title: "Mail not found",
        status: "error",
        position: "bottom-left",
        isClosable: true,
      });
    }
  };

  const Complete = () => {
    sessionStorage.removeItem("name");
  };

  const Year = () => {
    sessionStorage.year = year;
    window.location.reload(1);
  };

  useEffect(() => {
    axios.post(process.env.REACT_APP_database + "/students").then((result) => {
      sdat(result.data.sort((a, b) => a.Year - b.Year));
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === "F") {
        searchRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const filteredData = dat.filter(
    (user) =>
      user.Reg_No.toLowerCase().includes(select) ||
      user.Reg_No.toUpperCase().includes(select) ||
      user.Name.toUpperCase().includes(select) ||
      user.Name.toLowerCase().includes(select)
  );

  return (
    <>
      <Navbars />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="email"
              placeholder="Enter Gmail"
              onChange={(e) => {
                sotp(e.target.value);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={Register}>
              <b>Submit</b>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="clgname">SRKREC Daily Yoga</div>
      <br />
      <div className="yearbtns">
        <Link
          className="yearbtnsink"
          onClick={Year}
          onClickCapture={(e) => {
            syear(1);
          }}
        >
          <b>1st Year</b>
        </Link>
        <Link
          className="yearbtnsink"
          style={{ backgroundColor: "red" }}
          onClick={Year}
          onClickCapture={(e) => {
            syear(2);
          }}
        >
          <b>2nd Year</b>
        </Link>
        <Link
          className="yearbtnsink"
          style={{ backgroundColor: "blueviolet" }}
          onClick={Year}
          onClickCapture={(e) => {
            syear(3);
          }}
        >
          <b>3rd Year</b>
        </Link>
        <Link
          className="yearbtnsink"
          style={{ backgroundColor: "green" }}
          onClick={Year}
          onClickCapture={(e) => {
            syear(4);
          }}
        >
          <b>4th Year</b>
        </Link>
      </div>
      <br />
      <div>
        <Box boxShadow="base" borderRadius="md" ml={{ base: "1", md: "10" }} mr={{ base: "1", md: "10" }} overflow="auto">
          <Box display="flex" justifyContent="right" p={3}>
            <Input
              id="search"
              ref={searchRef}
              value={select}
              type="text"
              autoComplete="off"
              className="studentcheck"
              placeholder="Enter User mail or name"
              onChange={(e) => sselect(e.target.value)}
            />
            <Button onClick={onOpen} colorScheme="gray" color="black" m={2}>
              Register
            </Button>
          </Box>
          <Table variant="simple" size="lg" p={3}>
            <Thead>
              <Tr>
                <Th>SNO</Th>
                <Th>REGISTER NUMBER</Th>
                <Th>NAME</Th>
                <Th>CLICK</Th>
                <Th>STREAK</Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    <Spinner size="xl" />
                  </Td>
                </Tr>
              ) : filteredData.length > 0 ? (
                filteredData.map(
                  (x, index) =>
                    x.Year === sessionStorage.year &&
                    x.SadhanaReg === true && (
                      <Tr key={index}>
                        <Td>{index + 1}</Td>
                        <Td>{x.Reg_No}</Td>
                        <Td>
                          <b>{x.Name}</b>
                        </Td>
                        <Td>
                          {x.MrngLogin !== date.toDateString() ? (
                            <Button
                              colorScheme="blue"
                              onClick={() => {
                                satnd(x);
                                Attend();
                              }}
                            >
                              Attend
                            </Button>
                          ) : (
                            <Text>Already Attended</Text>
                          )}
                        </Td>
                        <Td>
                          <Box>
                            <Box className="main-streak-text" height={"45px"}>
                              <b>{parseInt(x.MrngStreak)}</b>
                            </Box>
                          </Box>
                        </Td>
                      </Tr>
                    )
                )
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center">
                    <Text>No data found</Text>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
        <div className="form-group" style={{ display:"flex",justifyContent:"center" }}>
          <Link onClick={Complete} to="/" className="complteday">
            <b>Complete Day</b>
          </Link>
        </div>
      </div>
    </>
  );
};
