import { useToast, Button, Box } from "@chakra-ui/react";
import { Actions } from "../../../actions/actions";

export const StartAndStop = ({ timer, start, stop, setEventTime, deleteTimer,setTimerTitle ,timers }) => {
  const toast = useToast();

  const StartHackathon = async () => {
    setEventTime(); 
    await Actions.Start()
      .then((res) => {
        if (res?.data?.message) {
          timer = "24hrs";
          start();
          setEventTime(); 
        } else {
          toast({ title: res?.data?.error, position: 'bottom-right', status: 'error', isClosable: true });
        }
      })
      .catch((e) => {
        toast({ title: e?.message, position: 'bottom-right', status: 'error', isClosable: true });
      });
  };

  const StopHackathon = async () => {
    setTimerTitle('hackathon')
    deleteTimer(timers.filter((timer)=> timer.title =="hackathon")[0].id); // Call deleteTimer to remove the timer

    await Actions.Stop()
      .then((res) => {
        if (res?.data?.message) {
          console.log("set animation");
          stop();
          
          deleteTimer(timers.filter((timer)=>(timer.title =="hackathon")[0].id)); // Call deleteTimer to remove the timer
        } else {
          toast({ title: res?.data?.error, position: 'bottom-right', status: 'error', isClosable: true });
        }
      })
      .catch((e) => {
        toast({ title: e?.message, position: 'bottom-right', status: 'error', isClosable: true });
      });
  };

  return (
    <Box borderRadius='md' color='white'>
      <Button colorScheme='teal' size='md' onClick={StartHackathon}>Start Hackathon</Button>
      <Button colorScheme='red' size='md' onClick={StopHackathon}>Stop Hackathon</Button>
    </Box>
  );
};
