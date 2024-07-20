import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  Heading,
  Textarea,
  Badge,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions } from "../../actions/actions";
import "./hackathontasks.css";

export const RoundInput = ({ tasks, reload }) => {
  const [round, setRound] = useState(1);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [team, setTeam] = useState(parseInt(tasks[0]?.TeamCode) || "");
  const [search, setSearch] = useState("");
  const [load, setLoad] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const saveround = useSelector((state) => state.user.round);
  const taskref = useRef(null);

  useEffect(() => {
    if (round && team) {
      const existingTask = findExistingTask(round, team);
      if (existingTask) {
        setTask(existingTask.Task);
        setDescription(existingTask.Desc);
      } else {
        setTask("");
        setDescription("");
      }
    }
  }, [round, team]);

  const findExistingTask = (round, team) => {

    const teamData = tasks.find((t) => t.TeamCode === parseInt(team));
 
    if (teamData && teamData.Rounds) {
     
      setEditingTask(true)
      return teamData.Rounds[round]; 
     
    }
    setEditingTask(false)
    return null;

  };

  const handleSubmit = async () => {
    setLoad(true);
    if ((round || saveround) && task && description && team) {
      try {
        const response = await Actions.InsertRound(
          team,
          round || saveround,
          task,
          description
        );
        if (response?.data?.message) {
          setLoad(false);
          toast({
            title: response?.data?.message,
            status: "success",
            position: "top-right",
            isClosable: true,
          });
          reload();
          resetForm();
        }
        if (response?.data?.error) {
          setLoad(false);
          toast({
            title: response?.data?.error,
            status: "error",
            position: "bottom-right",
            isClosable: true,
          });
        }
      } catch (error) {
        setLoad(false);
        toast({
          title: error.message,
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
        console.error("Error adding new task:", error);
      }
    } else {
      setLoad(false);
      toast({
        title: "All fields are required",
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  const handleDelete = async (team, round, task, description) => {
    try {
      const response = await Actions.DeleteRound(
        team,
        round,
        task,
        description
      );
      if (response?.data?.message) {
        toast({
          title: response?.data?.message,
          status: "success",
          position: "top-right",
          isClosable: true,
        });
        reload();
      }
      if (response?.data?.error) {
        toast({
          title: response?.data?.error,
          status: "error",
          position: "bottom-right",
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        position: "bottom-right",
        isClosable: true,
      });
      console.error("Error deleting task:", error);
    }
  };

  const handleEdit = (teamCode, round, task, description) => {
    setRound(round);
    setTask(task);
    setDescription(description);
    setTeam(teamCode);
    setEditingTask({ teamCode, round, task, description });
    taskref.current.focus();
  };

  const resetForm = () => {
    setRound("");
    setTask("");
    setDescription("");
    setTeam("");
    setEditingTask(null);
  };

  return (
    <Box
      className="task-form"
      p={5}
      borderWidth={1}
      borderRadius="lg"
      shadow="md"
    >
      <Stack spacing={4}>
        <Select
          placeholder="Select Round"
          value={round || saveround}
          onChange={(e) => {
            setRound(e.target.value);
            dispatch({ type: "ROUND", payload: { round: e.target.value } });
          }}
          size="lg"
        >
          <option value={1}>Round 1</option>
          <option value={2}>Round 2</option>
          <option value={3}>Round 3</option>
        </Select>
        <Select
          placeholder="Select Team Code"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          size="lg"
        >
          {tasks?.map((team) => (
            <option key={team?.TeamCode} value={team?.TeamCode}>
              {team?.TeamCode} -{team?.Team}
            </option>
          ))}
        </Select>
        <Input
          placeholder="Enter task title"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          size="lg"
          ref={taskref}
        />
        <Textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="lg"
        />
        <Box display={"flex"} justifyContent={"space-between"} gap={5}>
          <Button
            colorScheme="cyan"
            onClick={handleSubmit}
            isLoading={load}
            width="100%"
          >
            {editingTask ? "Update Round" : "Add round"}
          </Button>
          {editingTask && (
            <Button onClick={resetForm} colorScheme="red" width="100%">
              Cancel Edit
            </Button>
          )}
        </Box>
      </Stack>
      <Box mt={8}>
        <Heading size="lg" mb={4}>
          Rounds in Hackathon
        </Heading>
        <Input
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter team code or name"
          mb={4}
          size="lg"
        />
        {tasks
          ?.filter(
            (team) =>
              team.Team?.toLowerCase()?.includes(search.toLowerCase()) ||
              team.TeamCode.toString().includes(search)
          )
          .map((task, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderRadius="xl"
              mb={5}
              boxShadow="base"
            >
              <Box
                display={"flex"}
                justifyContent="space-between"
                backgroundColor="gray.200"
                p={3}
                boxShadow="base"
                borderRadius="xl"
              >
                <Badge size="xl" colorScheme={team?.Team ? "red" : "purple"}>
                  {task?.Team || "Not Registered"}
                </Badge>
                <Badge size="xl" colorScheme="green">{task?.TeamCode}</Badge>
              </Box>
              <Box
                display={"flex"}
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={"space-evenly"}
                gap={5}
                p={4}
              >
                {task.Rounds &&
                  Object.values(task.Rounds).map((val, taskindex) => (
                    <Box key={taskindex} mt={4} boxShadow="base" p={5}>
                      <Heading size="md" color="green">
                        Round: {taskindex + 1}
                      </Heading>
                      <Text className="task-title">Title: {val.Task}</Text>
                      <Text className="task-description">
                        Description: {val.Desc}
                      </Text>
                      <Box display="flex" gap={5}>
                        <Button
                          mt={2}
                          bg="#CE5A67"
                          color="white"
                          onClick={() =>
                            handleDelete(
                              task.TeamCode,
                              taskindex + 1,
                              val.Task,
                              val.Desc
                            )
                          }
                        >
                          Delete
                        </Button>
                        <Button
                          mt={2}
                          colorScheme="blue"
                          onClick={() =>
                            handleEdit(
                              task.TeamCode,
                              taskindex + 1,
                              val.Task,
                              val.Desc
                            )
                          }
                        >
                          Edit
                        </Button>
                      </Box>
                    </Box>
                  ))}
              </Box>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
