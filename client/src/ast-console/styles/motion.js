import { Box, Container, keyframes } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// import '../ast-console.css'

const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const animation = `${animationKeyframes} 2s ease-in-out infinite`;

export const Motion = () => {
    return (
        <Container h="30vh" id="motion"  width={"100%"} display="flex" alignItems="center" justifyContent="center">
            <Box
                as={motion.div}
                animation={animation}
                padding="2"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                width="12"
                height="12"
                display="flex"
            />
        </Container>
    )
};