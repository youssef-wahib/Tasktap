import {
  Button,
  CardActionArea,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { Database } from "../../../supabaseTypes.ts";
import { usePostNewTask } from "../../../utils/useQuerySupabase.ts";
import AddCircleIcon from "@mui/icons-material/AddCircle";
type tasksType = Database["public"]["Tables"]["tasks"]["Row"];

function AddNewTask({
  SectionRef,
  order,
}: {
  SectionRef: string;
  order: number | undefined;
}) {
  const [newTaskText, setNewTaskText] = useState({
    title: "",
    completed: false,
    sectionId: SectionRef,
    order: order ? order : 0,
  } as tasksType);
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const { mutate: addTask } = usePostNewTask();

  function handleSetTask(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newValue = event.target.value;
    setNewTaskText((prevState) => ({
      ...prevState,
      title: newValue.trim(),
    }));
  }
  function handleAddTask() {
    setIsAddingNewTask(false);

    setNewTaskText((prevState) => ({
      ...prevState,
      id: crypto.randomUUID(),
    }));
    if (newTaskText.title?.trim().length) {
      addTask(newTaskText);
    }
  }

  return (
    <>
      {isAddingNewTask ? (
        <Stack direction={"row"} spacing={2} mb={2}>
          <TextField
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddTask();
              }
            }}
            autoFocus
            sx={{ flexGrow: "1" }}
            type={"text"}
            label={"New Task"}
            variant="outlined"
            onChange={(event) => handleSetTask(event)}
          />
          <Button endIcon={<AddTaskIcon />} onClick={handleAddTask}>
            add Task
          </Button>
          <Button onClick={() => setIsAddingNewTask(false)}>cancel</Button>
        </Stack>
      ) : (
        <CardActionArea
          onClick={() => setIsAddingNewTask(true)}
          sx={{
            "&:hover": {
              color: "rgba(95,158,160)",
            },
          }}
        >
          <Stack
            spacing={1}
            direction={"row"}
            alignItems={"center"}
            px={2}
            py={1}
          >
            <AddCircleIcon />
            <Typography variant={"h6"} pl={2}>
              Add Task
            </Typography>
          </Stack>
        </CardActionArea>
      )}
    </>
  );
}

export default AddNewTask;
