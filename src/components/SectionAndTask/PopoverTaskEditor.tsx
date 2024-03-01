import { ChangeEvent, SetStateAction, useState } from "react";
import { IconButton, Popover, TextField, Stack, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import { useEditTask } from "../../utils/UseQueryHookSupabase.ts";

export default function PopoverTaskEditor({ TaskId }: { TaskId: string }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [textEdit, setTextEdit] = useState("");
  const { mutate: updateTask } = useEditTask();
  function handleTextEdit(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTextEdit(event.target.value);
  }
  const handleClick = (event: {
    currentTarget: SetStateAction<HTMLButtonElement | null>;
  }) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleSubmitEdit() {
    updateTask({ TaskId, textEdit });
    handleClose();
  }
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={handleClick}>
        <EditIcon fontSize="medium" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          alignContent={"center"}
          direction={"column"}
          sx={{ p: 2 }}
          spacing={1}
        >
          <TextField
            label={"EditTask"}
            multiline
            variant={"standard"}
            onChange={(event) => handleTextEdit(event)}
          />
          <Button
            size={"large"}
            endIcon={<SwitchAccessShortcutAddIcon />}
            onClick={handleSubmitEdit}
          >
            Save Edit
          </Button>
        </Stack>
      </Popover>
    </>
  );
}
