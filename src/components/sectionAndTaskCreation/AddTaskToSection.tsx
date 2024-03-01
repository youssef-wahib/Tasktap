import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TaskSupabase } from "../../utils/ProjectTypes.ts";
interface taskType {
  Index: number;
  getTaskFromUser: (Task: TaskSupabase) => void;
  SectionRef: string;
}
function AddTaskToSection({ getTaskFromUser, Index, SectionRef }: taskType) {
  const [getTaskAndId, setGetTaskAndId] = useState({
    Task: "",
    TaskId: crypto.randomUUID(),
    State: false,
    SectionRef: SectionRef,
  });
  function handleSetTask(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const newValue = event.target.value;
    setGetTaskAndId((prevState) => ({
      ...prevState,
      Task: newValue,
    }));
    getTaskFromUser({ ...getTaskAndId, Task: newValue });
  }
  const taskTitle = "task " + ++Index;
  return (
    <TextField
      type={"text"}
      label={taskTitle}
      variant="outlined"
      onChange={(event) => handleSetTask(event)}
    />
  );
}

export default AddTaskToSection;
