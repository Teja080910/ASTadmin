import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Kbd,
  Popover,
  PopoverAnchor,
  PopoverBody,
  PopoverContent,
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
  const [dup, setDup] = useState('');
  const [studata, setStudata] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [isLoad, setIsLoad] = useState(false);
  const [isOpen, setOpen] = useState(true)
  const searchInputRef = useRef(null);

  const fetchStudentData = async () => {
    await Actions.StudentNames()
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

  const Student = async (reg) => {
    setIsLoad(true)
    await Actions.Student(reg)
      .then((res) => {
        setStudata(res?.data)
        setDup(res?.data?.Reg_No)
        setIsLoad(false)
        setSelect('')
      })
      .catch((e) => {
        console.log(e)
        setIsLoad(true)
      })
  }

  useEffect(() => {
    select.length >= 10 && Student(select)
  }, [select])


  let filteredData;
  select ? filteredData = dat?.filter(
    (user) =>
      user?.Reg_No?.toString()?.toLowerCase()?.includes(select) ||
      user?.Reg_No?.toString()?.toUpperCase()?.includes(select) ||
      user?.Name?.toUpperCase()?.includes(select) ||
      user?.Name?.toLowerCase()?.includes(select)
  ) : filteredData = dat

  return (
    !isLoading ? <div className="scores">
      <Box width={"100%"} align={"center"}>
        <Popover
          isOpen={isOpen}
          onOpen={setOpen.on}
          onClose={setOpen.off}
          closeOnBlur={false}
          isLazy
          lazyBehavior='keepMounted'
        >
          <HStack align={"center"}>
            <PopoverAnchor >
              <InputGroup >
                <Input
                  id="search"
                  value={select}
                  placeholder="Enter User mail or name"
                  autoFocus
                  onChange={(e) => setSelect(e.target.value.toUpperCase())}
                />
                <InputRightElement pointerEvents="none" width="auto">
                  <Flex alignItems="center">
                    <Kbd color="black">shift</Kbd> + <Kbd color="black">F</Kbd>{" "}
                    <SearchIcon />
                  </Flex>
                </InputRightElement>
              </InputGroup>
            </PopoverAnchor>
          </HStack>
          {select && <PopoverContent width={"100%"} maxHeight={"50vh"} overflowY={"scroll"}>
            {
              filteredData?.map((val) => (
                <PopoverBody width={"100%"} onClick={() => setSelect(val?.Reg_No)}>{val?.Name + "-" + val?.Reg_No}</PopoverBody>
              ))
            }
          </PopoverContent>}
        </Popover>
      </Box>
      <SearchData select={studata} load={isLoad} refesh={() => Student(dup)} />
    </div> : <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
    >
      <Spinner size="xl" />
    </Box>
  );
};

export default BootcampScore;
