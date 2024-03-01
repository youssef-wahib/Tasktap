import { ChangeEvent, SetStateAction, useState } from "react";
import { Popover, TextField, Stack, Button, IconButton } from "@mui/material";

import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";
import { useEditSection } from "../../utils/UseQueryHookSupabase.ts";
import BorderColorIcon from "@mui/icons-material/BorderColor";
export default function PopoverEditor({
  Id,
  columnTitle,
  selectionTable,
  eqColumn,
  labelText,
}: {
  Id: string;
  columnTitle: string;
  selectionTable: string;
  eqColumn: string;
  labelText: string;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [textEdit, setTextEdit] = useState("");
  const { mutate: updateSection } = useEditSection(selectionTable);
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
    updateSection({
      Id,
      textEdit,
      columnTitle,
      selectionTable,
      eqColumn,
    });
    handleClose();
  }
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton size={"large"} onClick={handleClick}>
        <BorderColorIcon fontSize={"medium"} />
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
            label={labelText}
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
