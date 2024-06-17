// import React from "react";

// export const ScoreAdmin = () => {
//     return(
//         <>

//         </>
//     )
// }



import React, { useState } from 'react';
import { Box, Input, Button, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';

export const ScoreAdmin = ({ student, onSave }) => {
  const [task1Score, setTask1Score] = useState('');
  const [task2Score, setTask2Score] = useState('');
  const toast = useToast();

  const saveScore = async () => {
    try {
      const scores = {
        task1: task1Score,
        task2: task2Score
      };
      await axios.post(`${process.env.REACT_APP_database}/score`, { regNo: student.Reg_No, scores });
      toast({ title: 'Scores saved successfully', status: 'success', position: 'top', isClosable: true });
      onSave();  
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to save scores', status: 'error', position: 'bottom-left', isClosable: true });
    }
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" padding={4} marginBottom={4}>
      <Text fontWeight="bold">{student.Name.toUpperCase()} ({student.Reg_No.toUpperCase()})</Text>
      <Input
        type="number"
        placeholder="Score for Task 1"
        value={task1Score}
        onChange={(e) => setTask1Score(e.target.value)}
        marginBottom={2}
      />
      <Input
        type="number"
        placeholder="Score for Task 2"
        value={task2Score}
        onChange={(e) => setTask2Score(e.target.value)}
        marginBottom={2}
      />
      <Button colorScheme="teal" onClick={saveScore}>Add Score</Button>
    </Box>
  );
};



