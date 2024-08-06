import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Spinner
} from "@chakra-ui/react";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useRef, useState } from "react";
import { Actions } from "../../actions/actions";
import { SearchData } from "./bootcampscoresearch";
import "./scoremanager.css";

export const BootcampScore = () => {
  const [dat, setDat] = useState([]);
  const [select, setSelect] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const searchInputRef = useRef(null);

  const fetchStudentData = async () => {
    await Actions.Students()
      .then((res) => {
        setDat(res?.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e))
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

  let filteredData;

  select?filteredData = dat?.filter(
    (user) =>
      user?.Reg_No?.toString()?.toLowerCase()?.includes(select) ||
      user?.Reg_No?.toString()?.toUpperCase()?.includes(select) ||
      user?.Name?.toUpperCase()?.includes(select) ||
      user?.Name?.toLowerCase()?.includes(select)
  ):filteredData=dat


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
        <SearchData filteredData={filteredData} refesh={() => fetchStudentData()} />
      )}
    </div>
  );
};

export default BootcampScore;
