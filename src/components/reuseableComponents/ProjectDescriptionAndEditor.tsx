import * as React from "react";
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useEditSection } from "../../utils/UseQueryHookSupabase.ts";
import { ChangeEvent, useState } from "react";

export default function ProjectDescriptionAndEditor({
  Id,
  columnTitle,
  selectionTable,
  eqColumn,
  labelText,
  DescriptionName,
}: {
  Id: string;
  columnTitle: string;
  selectionTable: string;
  eqColumn: string;
  labelText: string;
  DescriptionName: string | undefined;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: updateSection } = useEditSection(selectionTable);
  const [textEdit, setTextEdit] = useState(DescriptionName as string);

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
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);
  function handleTextEdit(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTextEdit(event.target.value);
  }

  return (
    <>
      {!DescriptionName ? (
        <Typography
          variant={"h6"}
          py={1}
          onClick={handleOpen}
          sx={{
            ["&:hover"]: {
              color: "rgba(95,158,160)",
            },
          }}
        >
          Add Description
        </Typography>
      ) : (
        <>
          <Typography variant={"h5"} py={1}>
            Description:
          </Typography>
          <Typography
            variant={"h6"}
            pb={1}
            pl={3}
            color={"textSecondary"}
            onClick={handleOpen}
          >
            {DescriptionName}
          </Typography>
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>{labelText}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            variant="outlined"
            value={textEdit}
            onChange={(event) => handleTextEdit(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmitEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
