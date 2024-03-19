import { ChangeEvent, useState } from "react";
import { IconButton, TextField, Stack, Button, Dialog } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import { useEditTask } from "../../utils/UseQueryHookSupabase.ts";

export default function PopoverTaskEditor({
  TaskId,
  taskValue,
}: {
  TaskId: string;
  taskValue: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [textEdit, setTextEdit] = useState(taskValue);
  const { mutate: updateTask } = useEditTask();
  function handleTextEdit(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTextEdit(event.target.value);
  }
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  function handleSubmitEdit() {
    updateTask({ TaskId, Edit: textEdit });
    handleClose();
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <EditIcon fontSize="medium" />
      </IconButton>
      <Dialog open={isOpen} onClose={handleClose} maxWidth={"md"} fullWidth>
        <Stack
          justifyContent={"space-evenly"}
          direction={"row"}
          sx={{ p: 4 }}
          spacing={2}
        >
          <TextField
            label={"Edit task"}
            autoFocus
            sx={{ width: "80%" }}
            variant="outlined"
            value={textEdit}
            onChange={(event) => handleTextEdit(event)}
          />
          <Button
            size={"medium"}
            endIcon={<SwitchAccessShortcutAddIcon />}
            onClick={handleSubmitEdit}
          >
            Save Edit
          </Button>
        </Stack>
      </Dialog>
    </>
  );
}
