import { useToast } from "@chakra-ui/react";
import axios from "axios";
import CryptoAES from "crypto-js/aes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbars } from "../nav&foot/nav";
import { Box, VStack, Button, Input, Text } from "@chakra-ui/react";

export const Admin = () => {
  const nav = useNavigate();
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [loading, setLoading] = useState(false);
  const date = new Date();
  const toast = useToast();
  const Submit = async () => {
    setLoading(true);
    try {
      const responce = await axios.post(process.env.REACT_APP_database + "/admincheck/" + gmail);
      if (responce.data?.Password === password) {
        if (responce.data.Dates !== date.toDateString()) {
          const res1 = await axios.post(process.env.REACT_APP_database + "/totaldays");
          if (res1.data) {
            if (res1.data.Date !== date.toDateString()) {
              let tdays = parseInt(res1.data.Days) + 1;
              const res = await axios.post(process.env.REACT_APP_database + "/updateadmin/" + gmail + "/" + date.toDateString() + "/" + tdays);
              if (res) {
                sessionStorage.gmail = gmail;
                sessionStorage.password = CryptoAES.encrypt(password, gmail).toString();
                toast({ title: "Login Success", description: "Admin successfully logged in Today", status: "success", position: "top", isClosable: true });
                setTimeout(() => nav("/attendance"), 1000);
              } else {
                toast({ title: "Try again", description: "Please login again", status: "error", position: "bottom-left", isClosable: true });
              }
            } else {
              sessionStorage.gmail = gmail;
              sessionStorage.password = CryptoAES.encrypt(password, gmail).toString();
              toast({ title: "Login Success", description: "Admin successfully logged in Today", status: "success", position: "top", isClosable: true });
              setTimeout(() => nav("/attendance"), 1000);
            }
          }
        } else {
          sessionStorage.gmail = gmail;
          sessionStorage.password = CryptoAES.encrypt(password, gmail).toString();
          sessionStorage.removeItem("yoga");
          toast({ title: "Login Success", description: "Admin successfully logged in again", status: "success", position: "top", isClosable: true });
          setTimeout(() => nav("/attendance"), 1000);
        }
      } else {
        toast({ title: "Please register as admin", description: "Credentials unmatched", status: "error", position: "bottom-left", isClosable: true });
      }
    } catch (e) {
      toast({ title: "Network Error", description: e?.name, status: "warning", position: "bottom-left", isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const handelkeydown = (e) => {
    if (e.key === "Enter") Submit();
  };

  return (
    <>
      <Navbars />
      <Box maxW="420px" mx="auto" mt={{ base: 8, md: 20 }} p={8} bg="white" borderRadius="xl" boxShadow="card" border="1px solid" borderColor="surface.100">
        <VStack spacing={6} align="stretch">
          <Text fontSize="xl" fontWeight={700} textAlign="center" color="brand.600">Attendance Login</Text>
          <Box>
            <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Admin Gmail</Text>
            <Input type="text" placeholder="Enter Admin Gmail" value={gmail} onChange={(e) => setgmail(e.target.value)} />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Password</Text>
            <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} onKeyDown={handelkeydown} />
          </Box>
          <Button onClick={Submit} isLoading={loading} loadingText="Signing in..." size="lg" w="full">Submit</Button>
        </VStack>
      </Box>
    </>
  );
};

export const Adminreg = () => {
  const nav = useNavigate();
  const [gmail, setgmail] = useState([]);
  const [password, setpassword] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const Submit = async () => {
    setLoading(true);
    await axios.post(process.env.REACT_APP_database + "/admincheck/" + gmail + "/" + password)
      .then(async (res) => {
        if (res.data) {
          toast({ title: "Already Register", status: "error", position: "bottom-left", isClosable: true });
        } else {
          if (await axios.post(process.env.REACT_APP_database + "/adminregi/" + gmail + "/" + password)) {
            toast({ title: "Successfully Registered", status: "success", position: "top-right", isClosable: true });
            nav("/adminlogin");
          }
        }
      })
      .catch((e) => toast({ title: e.message, description: e.name, status: "error", position: "bottom-left", isClosable: true }))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <Navbars />
      <Box maxW="420px" mx="auto" mt={{ base: 8, md: 20 }} p={8} bg="white" borderRadius="xl" boxShadow="card" border="1px solid" borderColor="surface.100">
        <VStack spacing={6} align="stretch">
          <Text fontSize="xl" fontWeight={700} textAlign="center" color="brand.600">Admin Register</Text>
          <Box>
            <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Admin Gmail</Text>
            <Input type="text" placeholder="Enter Admin Gmail" value={gmail} onChange={(e) => setgmail(e.target.value)} />
          </Box>
          <Box>
            <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Password</Text>
            <Input type="password" placeholder="Enter Password" value={password} onChange={(e) => setpassword(e.target.value)} />
          </Box>
          <Button onClick={Submit} isLoading={loading} loadingText="Registering..." size="lg" w="full">Add Admin</Button>
        </VStack>
      </Box>
    </>
  );
};
