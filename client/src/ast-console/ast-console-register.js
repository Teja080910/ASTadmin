import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Link,
    VStack
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import './ast-console.css';
import { AST } from "./styles/ast";
import { Motion } from "./styles/motion";
import { useState } from "react";

export const ASTConsoleRegister = ({ data, change }) => {
    const [check, setCheck] = useState(false)
    return (
        <Flex bg="gray.100" w={"100%"} p={5} align="center" justify="center" h="100%">
            <div className="boxmotion">
                <Motion />
                <AST />
            </div>
            <Box bg="white" p={5} rounded="md" id="signinform" w={"100%"}>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        phonenumber: "",
                        event: "",
                        start: "",
                        club: "",
                        noofpersons: "",
                        admin: "",
                    }}
                    onSubmit={(values) => {
                        data(values)
                    }}
                >
                    {({ handleSubmit, errors, touched }) => (
                        <form onSubmit={handleSubmit}>
                            <VStack spacing={4} align="flex-start">
                                <FormControl>
                                    <FormLabel htmlFor="email">Admin Email Address</FormLabel>
                                    <Field
                                        as={Input}
                                        id="email"
                                        name="email"
                                        type="email"
                                        variant="filled"
                                        placeholder="Enter email"
                                    />
                                </FormControl>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <Field
                                        as={Input}
                                        id="password"
                                        name="password"
                                        type="password"
                                        variant="filled"
                                        placeholder="Enter password"
                                        validate={(value) => {
                                            let error;

                                            if (value.length < 6) {
                                                error = "Password must contain at least 6 characters";
                                            }

                                            return error;
                                        }}
                                    />
                                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                                </FormControl>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="phonenumber">Phone Number</FormLabel>
                                    <Field
                                        as={Input}
                                        id="phonenumber"
                                        name="phonenumber"
                                        type="number"
                                        variant="filled"
                                        placeholder="Enter phone number"
                                    />
                                </FormControl>

                                <Flex gap={8}>
                                    <FormControl isInvalid={!!errors.password && touched.password}>
                                        <FormLabel htmlFor="event">Event Name</FormLabel>
                                        <Field
                                            as={Input}
                                            id="event"
                                            name="event"
                                            type="text"
                                            variant="filled"
                                            placeholder="Enter event name"
                                        />
                                    </FormControl>

                                    <FormControl isInvalid={!!errors.password && touched.password}>
                                        <FormLabel htmlFor="club">Club Name</FormLabel>
                                        <Field
                                            as={Input}
                                            id="club"
                                            name="club"
                                            type="text"
                                            variant="filled"
                                            placeholder="Enter club name"
                                        />
                                    </FormControl>
                                </Flex>

                                <Flex gap={8}>
                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="start">Event Counduct Time</FormLabel>
                                    <Field
                                        as={Input}
                                        id="start"
                                        name="start"
                                        type="date"
                                        variant="filled"
                                        placeholder="Enter date"
                                    />
                                </FormControl>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="noofpersons">How Many Accounts </FormLabel>
                                    <Field
                                        as={Input}
                                        id="noofpersons"
                                        name="noofpersons"
                                        type="number"
                                        variant="filled"
                                        placeholder="Enter members < 10"
                                    />
                                </FormControl>
                                </Flex>

                                <Field
                                    as={Checkbox}
                                    id="rememberMe"
                                    name="rememberMe"
                                    colorScheme="purple"
                                    onChange={() => {setCheck(check?false:true) }}
                                >
                                    Super Admin?
                                </Field>

                                {
                                    check&&<FormControl>
                                        <FormLabel htmlFor="admin">Enter Password</FormLabel>
                                        <Field
                                            as={Input}
                                            id="admin"
                                            name="admin"
                                            type="password"
                                            variant="filled"
                                            placeholder="Enter password"
                                        />
                                    </FormControl>
                                }

                                <Field
                                    as={Link}
                                    id="rememberMe"
                                    name="rememberMe"
                                    colorScheme="purple"
                                    onClick={() => change()}
                                >
                                    Sign In?
                                </Field>

                                <Button type="submit" colorScheme="purple" width="full">
                                    Register
                                </Button>
                            </VStack>
                        </form>
                    )}
                </Formik>
            </Box>
            <div className="boxmotion">
                <AST />
                <Motion />
            </div>
        </Flex>
    );
}