import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cerdentials/signup.css";
import { Navbars } from "../nav&foot/nav";
import { Box, Input, Text, Button, VStack, HStack, Select, Radio, RadioGroup, Stack } from "@chakra-ui/react";

const Signup = () => {
  const nav = useNavigate();
  const [check, SetCheck] = useState("");
  const [name, SetName] = useState("");
  const [regd, SetRegd] = useState("");
  const [year, SetYear] = useState("");
  const [branch, Setbranch] = useState("");
  const [email, SetEmail] = useState("");
  const [num, snum] = useState(0);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const Handleclick = async () => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setLoading(true);
    try {
      if (emailRegex.test(email)) {
        const res = await axios.post(process.env.REACT_APP_database + "/student/" + email)
        {
          if (res.data) {
            SetCheck("E-mail or Register Number is already exists");
          }
          else {
            const res = await axios.post(process.env.REACT_APP_database + "/signup/" + email + "/" + name + "/" + regd + "/" + year + "/" + branch + "/" + num)
            {
              if (res) {
                toast({ title: "Register Successfully", status: 'success', position: "top-right", isClosable: true });
                setTimeout(() => { window.location = '/login'; window.history.back(); }, 1000);
              }
              else {
                toast({ title: "Try again", status: "error", position: "bottom-left", isClosable: true });
              }
            }
          }
        }
      }
      else {
        SetCheck("Invalid Email");
      }
    }
    catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const Login = () => {
    if (sessionStorage.yoga === "Yoga@9899") {
      window.location = '/yoga';
    }
    else {
      window.history.back();
    }
  }

  return (
    <>
      <Navbars />
      <Box minH="100vh" bg="surface.50" py={10}>
        <Box maxW="480px" mx="auto" bg="white" borderRadius="xl" boxShadow="card" border="1px solid" borderColor="surface.100" p={8}>
          <Text fontSize="xl" fontWeight={700} textAlign="center" color="brand.600" mb={6}>Student Signup</Text>
          
          {check && (
            <Text fontSize="sm" color="red.500" textAlign="center" mb={4} fontWeight={500}>{check}</Text>
          )}

          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Full Name</Text>
              <Input type="text" placeholder="Full Name" value={name} onChange={(e) => SetName(e.target.value.toUpperCase())} />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Register Number</Text>
              <Input type="text" placeholder="Regd.no" value={regd} onChange={(e) => SetRegd(e.target.value.toUpperCase())} />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Year Of Studying</Text>
              <RadioGroup onChange={SetYear} value={year}>
                <HStack spacing={6}>
                  <Radio value="1" colorScheme="brand">1st</Radio>
                  <Radio value="2" colorScheme="brand">2nd</Radio>
                  <Radio value="3" colorScheme="brand">3rd</Radio>
                  <Radio value="4" colorScheme="brand">4th</Radio>
                </HStack>
              </RadioGroup>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Branch</Text>
              <Select value={branch} onChange={(e) => Setbranch(e.target.value)} placeholder="Choose one">
                <option value="AIDS">Artificial Intelligence And Data Science</option>
                <option value="AIML">Artificial Intelligence And Machine Learning</option>
                <option value="Civil">Civil</option>
                <option value="CSBS">Computer Science And Business System</option>
                <option value="CSD">Computer Science And Design</option>
                <option value="CSE">Computer Science And Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="ECE">Electrical And Communication</option>
                <option value="EEE">Electrical And Electronics</option>
                <option value="MECH">Mechanical</option>
              </Select>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight={600} color="surface.600" mb={1}>Email</Text>
              <Input type="email" placeholder="G-mail" value={email} onChange={(e) => SetEmail(e.target.value)} />
            </Box>

            <HStack spacing={4} pt={2}>
              <Button onClick={Handleclick} isLoading={loading} loadingText="Registering..." width="full">Register</Button>
              <Button variant="outline" width="full" onClick={Login}>Attend</Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </>
  );
}
export default Signup;
