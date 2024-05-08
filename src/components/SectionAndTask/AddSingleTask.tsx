import { Button, Stack, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TaskSupabase } from "../../utils/ProjectTypes.ts";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { usePostNewTaskSet } from "../../utils/UseQueryHookSupabase.ts";
import { Database } from "../../supabaseTypes.ts";
type tasksType = Database["public"]["Tables"]["tasks"]["Row"];

function AddSingleTask({
  SectionRef,
  handleCloseAddSingleTask,
}: {
  SectionRef: string;
  handleCloseAddSingleTask: () => void;
}) {
  const [newTaskText, setNewTaskText] = useState({
    title: "",
    id: crypto.randomUUID(),
    completed: false,
    sectionId: SectionRef,
  } as tasksType);

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
        autoFocus
        onBlur={() => {
          setTimeout(() => {
            handleCloseAddSingleTask();
          }, 100);
        }}
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
