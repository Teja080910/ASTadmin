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

export const ASTConsole = ({ gmail, password, action, change, load }) => {
    return (
        <Flex bg="gray.100" w={"100%"} align="center" justify="center" h="100vh">
            <div className="boxmotion">
                <Motion />
                <AST />
            </div>
            <Box bg="white" p={5} rounded="md" id="signinform" w={"60%"}>
                <Formik>
                    <VStack spacing={4} align="flex-start">
                        <h4>Welcome, To AST console</h4>
                        <FormControl>
                            <FormLabel htmlFor="email" >Email Address</FormLabel>
                            <Field
                                as={Input}
                                id="email"
                                name="email"
                                type="email"
                                variant="filled"
                                onChange={(e) => gmail(e.target.value)}
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
                                onChange={(e) => password(e.target.value)}
                            />
                            <FormErrorMessage></FormErrorMessage>
                        </FormControl>
                        <Field
                            as={Link}
                            id="rememberMe"
                            name="rememberMe"
                            colorScheme="purple"
                            onClick={() => change()}
                        >
                            Register?
                        </Field>
                        <Button type="submit" colorScheme="purple" width="full" onClick={() => action()}>
                            {load ? "Logining..." : "Login"}
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