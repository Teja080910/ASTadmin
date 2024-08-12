import React, { useState, useEffect } from 'react';
import { Box, keyframes } from '@chakra-ui/react';

// Define keyframes for the shaking effect
const shaking = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
`;

const Curtains = ({ isOpen, setIsOpen }) => {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);

  // Synchronize local state with prop changes
  useEffect(() => {
    setLocalIsOpen(isOpen);
  }, [isOpen]);

  const handleDoubleClick = () => {
    setLocalIsOpen(!localIsOpen);

    // Set a timeout to close the curtains after 2 seconds
    if (localIsOpen) {
      setTimeout(() => {
        setLocalIsOpen(false);
        setIsOpen(false);
      }, 2000);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <Box
      position="relative"
      height="100vh"
      width="100%"
      onDoubleClick={handleDoubleClick}
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
     

      <Box
        position="absolute"
        top="0"
        left={localIsOpen ? "0" : "-50%"}
        width="50%"
        height="100%"
        bgImage={`url('../static/left-curtain.png')`}
        bgSize="cover"
        bgColor={"white"}
        objectPosition={"start"}
        bgRepeat="no-repeat"
        bgPosition="bottom"
        transition="left 2s ease"
        zIndex="1"
      >
     
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          height="30px"
          bg="linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0))"
          animation={localIsOpen ? `${shaking} 0.5s linear infinite` : 'none'}
        />
      </Box>


      <Box
        position="absolute"
        top="0"
        right={localIsOpen ? "0" : "-50%"}
        width="50%"
        height="100%"
        bgImage={`url('../static/right-curtain.png')`}
        bgSize="cover"
        bgRepeat="no-repeat"
        bgColor={"white"}
        bgPosition="bottom"
        transition="right 2s ease"
        zIndex="1"
      >
       
        <Box
          position="absolute"
          bottom="0"
          left="0"
          width="100%"
          height="30px"
          bg="linear-gradient(to left, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0))"
          animation={localIsOpen ? `${shaking} 0.5s linear infinite` : 'none'}
        />
      </Box>
    </Box>
  );
};

export default Curtains;
