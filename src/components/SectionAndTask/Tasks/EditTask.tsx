import { useEditTask } from "../../../utils/useQuerySupabase.ts";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Dispatch, SetStateAction, useState } from "react";

function EditTask({
  id,
  task,
  setIsEditingTask,
}: {
  id: string;
  task: string;
  setIsEditingTask: Dispatch<SetStateAction<boolean>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState(task);

  const { mutate } = useEditTask();

  function handleOpenEdit() {
    setIsEditing(true);
    setIsEditingTask(true);
  }

  function handleSetTask() {}
  function handleCloseEdit() {
    if (edit !== task) mutate({ id, edit });
    setIsEditing(false);
    setIsEditingTask(false);
  }
  return (
    <>
      {isEditing ? (
        <TextField
          autoFocus
          onBlur={() => {
            setTimeout(() => {
              handleCloseEdit();
            }, 100);
          }}
          fullWidth
          value={edit}
          type={"text"}
          label={"New Task"}
          variant="outlined"
          onChange={(event) => {
            setEdit(event.target.value);
            handleSetTask();
          }}
        />
      ) : (
        <IconButton onClick={handleOpenEdit}>
          <EditIcon fontSize="medium" />
        </IconButton>
      )}
    </>
  );
}

export default EditTask;
