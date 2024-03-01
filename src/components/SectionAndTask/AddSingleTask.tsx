import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TaskSupabase } from "../../utils/ProjectTypes.ts";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { usePostNewTaskSet } from "../../utils/UseQueryHookSupabase.ts";

function AddSingleTask({
  SectionRef,
  handleCloseAddSingleTask,
}: {
  SectionRef: string;
  handleCloseAddSingleTask: () => void;
}) {
  const [newTaskText, setNewTaskText] = useState({
    Task: "",
    TaskId: crypto.randomUUID(),
    State: false,
    SectionRef: SectionRef,
  } as TaskSupabase);

  const { mutate: addTask } = usePostNewTaskSet();

  function handleSetTask(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newValue = event.target.value;
    setNewTaskText((prevState) => ({
      ...prevState,
      Task: newValue,
    }));
  }
  function handleAddTask() {
    addTask([newTaskText]);
    handleCloseAddSingleTask();
  }

  return (
    <Stack direction={"row"} spacing={2} mb={2}>
      <TextField
        sx={{ width: "87%" }}
        type={"text"}
        label={"New Task"}
        variant="outlined"
        onChange={(event) => handleSetTask(event)}
      />
      <Button endIcon={<AddTaskIcon />} onClick={handleAddTask}>
        add Task
      </Button>
    </Stack>
  );
}

export default AddSingleTask;
