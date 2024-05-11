import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDelete } from "../../../utils/useQuerySupabase.ts";

function DeleteTask({ Id }: { Id: string }) {
  const { mutate: deleteTask } = useDelete("tasks");
  function handleDeleteTask() {
    deleteTask(Id);
  }
  return (
    <IconButton onClick={handleDeleteTask}>
      <DeleteIcon fontSize="medium" />
    </IconButton>
  );
}

export default DeleteTask;
