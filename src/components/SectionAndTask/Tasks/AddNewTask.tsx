import {
  Button,
  CardActionArea,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useGetUser, usePostNewTask } from "../../../utils/useQuerySupabase.ts";
import { Database } from "../../../supabaseTypes.ts";

type TasksType = Database["public"]["Tables"]["tasks"]["Row"];

function AddNewTask({
  SectionRef,
  order,
}: {
  SectionRef: string;
  order: number | undefined;
}) {
  const { data: userResponse, isSuccess: userFetched } = useGetUser();
  const [userId, setUserId] = useState("");
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const { mutate: addTask } = usePostNewTask();

  useEffect(() => {
    if (userFetched && userResponse.data.user) {
      setUserId(userResponse.data.user.id);
    }
  }, [userResponse, userFetched]);

  const [newTaskText, setNewTaskText] = useState<TasksType>({
    createdBy: "",
    id: crypto.randomUUID(),
    title: "",
    completed: false,
    sectionId: SectionRef,
    order: order ?? 0, // Assume a default order if undefined
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = event.target.value.trim();
    if (newValue) {
      setNewTaskText((prevState) => ({
        ...prevState,
        title: newValue,
      }));
    }
  };

  const handleAddTask = () => {
    if (userId && newTaskText.title) {
      const updatedTask = {
        ...newTaskText,
        id: crypto.randomUUID(), // Update ID for new task
        createdBy: userId,
      };

      addTask(updatedTask);
      setNewTaskText((prev) => ({
        ...prev,
        id: crypto.randomUUID(), // Prepare a new ID in case of another addition
        title: "", // Reset title for new input
      }));
    }
    setIsAddingNewTask(false);
  };

  return (
    <>
      {isAddingNewTask ? (
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            onKeyDown={(event) => event.key === "Enter" && handleAddTask()}
            autoFocus
            sx={{ flexGrow: 1 }}
            type="text"
            label="New Task"
            variant="outlined"
            onChange={handleInputChange}
          />
          <Button endIcon={<AddTaskIcon />} onClick={handleAddTask}>
            Add Task
          </Button>
          <Button onClick={() => setIsAddingNewTask(false)}>Cancel</Button>
        </Stack>
      ) : (
        <CardActionArea
          onClick={() => setIsAddingNewTask(true)}
          sx={{ "&:hover": { color: "rgba(95,158,160)" } }}
        >
          <Stack spacing={1} direction="row" alignItems="center" px={2} py={1}>
            <AddCircleIcon />
            <Typography variant="h6" pl={2}>
              Add Task
            </Typography>
          </Stack>
        </CardActionArea>
      )}
    </>
  );
}

export default AddNewTask;
