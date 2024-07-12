import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    VStack
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import './ast-console.css';
import { Motion } from "./styles/motion";
import { AST } from "./styles/ast";

export default function ASTConsole() {
    return (
        <Flex bg="gray.100" w={"100%"} align="center" justify="center" h="100vh">
            <div className="boxmotion">
                <Motion />
                <AST />            </div>
            <Box bg="white" p={5} rounded="md" id="signinform" w={"60%"}>
                <Formik>
                    <VStack spacing={4} align="flex-start">
                        <h4>Welcome, To AST console</h4>
                        <FormControl>
                            <FormLabel htmlFor="email">Email Address</FormLabel>
                            <Field
                                as={Input}
                                id="email"
                                name="email"
                                type="email"
                                variant="filled"
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Field
                                as={Input}
                                id="password"
                                name="password"
                                type="password"
                                variant="filled"
                                validate={(value) => {
                                    let error;

                                    if (value?.length < 6) {
                                        error = "Password must contain at least 6 characters";
                                    }

                                    return error;
                                }}
                            />
                            <FormErrorMessage></FormErrorMessage>
                        </FormControl>
                        <Field
                            as={Checkbox}
                            id="rememberMe"
                            name="rememberMe"
                            colorScheme="purple"
                        >
                            Remember me?
                        </Field>
                        <Button type="submit" colorScheme="purple" width="full">
                            Login
                        </Button>
                    </VStack>
                </Formik>
            </Box>
            <div className="boxmotion">
                <AST />
                <Motion />
            </div>
        </Flex>
    );
}