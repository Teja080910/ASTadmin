import {
  Accordion,
  AccordionItem,
  Badge,
  Box,
  Button,
  Input,
  Spinner,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BootcampNav } from "../bootcampnav/bootcampnav";
import "./attendance.css";
import StudentAttendancePortal from "./attendanceAnylitics";
import { motion } from "framer-motion";
import RefreshIcon from "@mui/icons-material/Refresh";
import { students } from "../../actions/api";
export const BootAttendance = () => {
  const [dat, sdat] = useState([]);
  const [select, sselect] = useState("");
  const [year, syear] = useState(sessionStorage.year || 1);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [regd, setRegd] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const date = new Date();
  const toast = useToast();
  const searchRef = useRef(null);
  const [activeButton, setActiveButton] = useState("absent");

  const Attend = async (registerno) => {
    try {
      setShow(true);
      const response = await axios.post(
        process.env.REACT_APP_database + "/attendstudents",
        { registerno }
      );
      if (response?.data?.message) {
        toast({
          title: registerno + " Attend",
          status: "success",
          position: "top",
          isClosable: true,
        });
        fetchData();
      } else {
        toast({
          title: "Try again",
          status: "error",
          position: "bottom-left",
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Absent = async (registerno) => {
    try {
      const response1 = await axios.post(
        process.env.REACT_APP_database + "/absentstudent",
        { registerno }
      );
      if (response1) {
        toast({
          title: registerno + " Absent",
          status: "success",
          position: "top",
          isClosable: true,
        });
        fetchData();
      } else {
        toast({
          title: "Try again",
          status: "error",
          position: "bottom-left",
          isClosable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Year = (selectedYear) => {
    sessionStorage.year = selectedYear;
    syear(selectedYear);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .post(students + "/bootcampstudents")
      .then((result) => {
        sdat(result.data.sort((a, b) => a.Year - b.Year));
        setFilteredData(result.data.sort((a, b) => a.Year - b.Year));
        setActiveButton("absent");
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setIsLoading(false);
      
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
    const handleKeyPress = (event) => {
      if (event.shiftKey && event.key === "F") {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const fetchfilterData = async () => {
    const filtered = dat?.filter(
      (user) =>
        (user?.Reg_No?.toLowerCase().includes(select) ||
          user?.Reg_No?.toUpperCase().includes(select) ||
          user?.Name?.toUpperCase().includes(select) ||
          user?.Name?.toLowerCase().includes(select)) &&
        (parseInt(user?.Year) || parseInt(user?.Year[0])) ===
          parseInt(sessionStorage.year)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchfilterData();
  }, [select, dat, year]);

  const handleAttendStudents = () => {
    setActiveButton("attend");
    setFilteredData(
      dat.filter(
        (student) =>
          student?.Year.toString() === sessionStorage.year &&
          student?.Date === date.toDateString()
      )
    );
  };

  const handleAbsentStudents = () => {
    setActiveButton("absent");
    setFilteredData(
      dat.filter(
        (student) =>
          student?.Year.toString() === sessionStorage.year &&
          student?.Date !== date.toDateString()
      )
    );
  };

  const MotionBox = motion(Box);
  return (
    <>
      <BootcampNav />
      <div className="yearbtns">
        <Button
          className="yearbtnsink"
          style={{
            backgroundColor: "#17D7A0",
            borderRadius: "10px",
            border: year === 1 ? "solid 3px black" : "white",
          }}
          onClick={() => Year(1)}
        >
          <b>I B.Tech</b>
        </Button>
        <Button
          className="yearbtnsink"
          style={{
            backgroundColor: "#CCA8E9",
            borderRadius: "10px",
            border: year === 2 ? "solid 3px black" : "white",
          }}
          onClick={() => Year(2)}
        >
          <b>II B.Tech</b>
        </Button>
        <Button
          className="yearbtnsink"
          style={{
            backgroundColor: "#A1EAFB",
            borderRadius: "10px",
            border: year === 3 ? "solid 3px black" : "white",
          }}
          onClick={() => Year(3)}
        >
          <b>III B.Tech</b>
        </Button>
        <Button
          className="yearbtnsink"
          style={{
            backgroundColor: "#F185B3",
            borderRadius: "10px",
            border: year === 4 ? "solid 3px black" : "white",
          }}
          onClick={() => Year(4)}
        >
          <b>IV B.Tech</b>
        </Button>
      </div>
      <br />
      <div>
        <Box display="flex" justifyContent="center" mb={6}>
          <Input
            ref={searchRef}
            id="search"
            value={select}
            placeholder="Enter User mail or name"
            onChange={(e) => sselect(e.target.value)}
            width="50%"
            p={1}
            boxShadow={"base"}
          />
        </Box>

        <table className="studetail">
          <Box display={"flex"} justifyContent={"center"}>
            <Box
              width={"fit-content"}
              display={"flex"}
              justifyContent={"center"}
              bg={"gray.200"}
              p={2}
              borderRadius={25}
              gap={3}
              m={1}
              color={"white"}
            >
              <Button borderRadius={25} colorScheme="pink" onClick={fetchData}>
                <Tooltip label="Refresh To Get Updated Data" placement="top">
                  <RefreshIcon />
                </Tooltip>
              </Button>
              <MotionBox
                initial={{ x: activeButton === "attend" ? 0 : -1 }}
                animate={{ x: activeButton === "attend" ? 0 : -1 }}
                transition={{ type: "spring", stiffness: 600 }}
              >
                <Button
                  bg={activeButton === "attend" ? "green.500" : "gray.200"}
                  borderRadius={25}
                  onClick={handleAttendStudents}
                  _hover={{
                    bg: activeButton === "attend" ? "green.500" : "gray.200",
                  }}
                  color={activeButton === "attend" ? "white" : "black"}
                  style={{ transition: "background-color 2s" }}
                >
                  Attendees
                  <Badge borderRadius={"250px"} fontSize={"15px"} m={2}>
                    {
                      dat?.filter(
                        (student) =>
                          student?.Year.toString() === sessionStorage.year &&
                          student?.Date === date.toDateString()
                      )?.length
                    }
                  </Badge>
                </Button>
              </MotionBox>
              <MotionBox
                initial={{ x: activeButton === "absent" ? 0 : 1 }}
                animate={{ x: activeButton === "absent" ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 600 }}
              >
                <Button
                  bg={activeButton === "absent" ? "red.500" : "gray.200"}
                  borderRadius={25}
                  onClick={handleAbsentStudents}
                  _hover={{
                    bg: activeButton === "absent" ? "red.500" : "gray.200",
                  }}
                  color={activeButton === "absent" ? "white" : "black"}
                  style={{ transition: "background-color 2s" }}
                >
                  Absentees
                  <Badge
                    borderRadius={"250px"}
                    fontSize={"14px"}
                    m={2}
                    justifyContent={"center"}
                  >
                    {
                      dat?.filter(
                        (student) =>
                          student?.Year.toString() === sessionStorage.year &&
                          student?.Date !== date.toDateString()
                      )?.length
                    }
                  </Badge>
                </Button>
              </MotionBox>
              <StudentAttendancePortal dat={dat} date={date} />
            </Box>
          </Box>
          {isLoading ? (
            <tr>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="50vh"
              >
                <Spinner size="xl" />
              </Box>
            </tr>
          ) : (
            <Accordion allowToggle>
              {filteredData?.length > 0 ? (
                filteredData?.map((x, index) => (
                  <AccordionItem
                    key={index}
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                    p={1}
                  >
                    <Tooltip
                      label={`Mobile Number : ${x?.Number}`}
                      placement="top"
                    >
                      <Box
                        style={{ fontFamily: "bold" }}
                        flex="1"
                        textAlign="left"
                      >
                        {index + 1}. {x?.Name.toUpperCase()} (
                        {x?.Reg_No.toUpperCase()})
                      </Box>
                    </Tooltip>
                    {x?.Date !== date.toDateString() ? (
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          Attend(x?.Reg_No);
                        }}
                        onClickCapture={() =>
                          setRegd({ num: x?.Reg_No, name: x?.Name })
                        }
                      >
                        Attend
                      </Button>
                    ) : (
                      <Button
                        colorScheme="red"
                        onClick={() => Absent(x?.Reg_No)}
                      >
                        Absent
                      </Button>
                    )}
                  </AccordionItem>
                ))
              ) : (
                <tr textAlign="center" width="100%">
                  <Text>
                    No data matches your current Search <Badge>{select}</Badge>{" "}
                    or the selected Year <Badge>{year} B.Tech</Badge>
                  </Text>
                </tr>
              )}
            </Accordion>
          )}
        </table>
      </div>
    </>
  );
};
