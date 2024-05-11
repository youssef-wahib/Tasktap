import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Database } from "../../../supabaseTypes.ts";
import EditTask from "./EditTask.tsx";
import DeleteTask from "./DeleteTask.tsx";
import { useEditTask } from "../../../utils/useQuerySupabase.ts";
type tasksType = Database["public"]["Tables"]["tasks"]["Row"];

function InteractiveTask({ title, completed, id }: tasksType) {
  const [taskState, setTaskState] = useState(completed);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const { mutate: updateTaskState } = useEditTask();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  function handleChangeState() {
    setTaskState(!taskState);
    updateTaskState({ id, edit: !taskState });
  }

  return (
    <Card
      elevation={0}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Stack
        spacing={2}
        direction={"row"}
        p={0.5}
        m={0.5}
        alignItems={"center"}
      >
        {isEditingTask ? null : (
          <CardActionArea sx={{ py: 0.7 }} onClick={handleChangeState}>
            <Stack spacing={1} direction={"row"} alignItems={"center"} px={1}>
              {taskState ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
              <Typography
                variant={"h6"}
                pl={2}
                sx={{ textDecoration: !taskState ? "" : "line-through" }}
              >
                {title}
              </Typography>
            </Stack>
          </CardActionArea>
        )}
        <EditTask
          id={id}
          task={title as string}
          setIsEditingTask={setIsEditingTask}
        />
        <DeleteTask Id={id} />
      </Stack>
    </Card>
  );
}
export default InteractiveTask;
