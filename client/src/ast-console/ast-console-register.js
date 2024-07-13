import {
    Box,
    Button,
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

export const ASTConsoleRegister = ({ data, change }) => {
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
                                        />
                                    </FormControl>
                                </Flex>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="start">Event Counduct Time</FormLabel>
                                    <Field
                                        as={Input}
                                        id="start"
                                        name="start"
                                        type="date"
                                        variant="filled"
                                    />
                                </FormControl>

                                <FormControl isInvalid={!!errors.password && touched.password}>
                                    <FormLabel htmlFor="noofpersons">How Many Accounts you want less than 10</FormLabel>
                                    <Field
                                        as={Input}
                                        id="noofpersons"
                                        name="noofpersons"
                                        type=" number"
                                        variant="filled"
                                    />
                                </FormControl>

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