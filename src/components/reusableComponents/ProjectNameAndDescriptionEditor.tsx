import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { useEdit } from "../../utils/useQuerySupabase.ts";
import { ChangeEvent, useState } from "react";

export default function ProjectNameAndDescriptionEditor({
  Id,
  ProjectName,
  DescriptionName,
}: {
  Id: string;
  ProjectName: string;
  DescriptionName?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: updateSection } = useEdit("projects");
  const [textEdit, setTextEdit] = useState(ProjectName);
  const { mutate: updateDescription } = useEdit("projects");
  const [textEditDescription, setTextEditDescription] = useState(
    DescriptionName as string,
  );

  function handleSubmitEdit() {
    updateSection({
      Id,
      textEdit,
      columnTitle: "name",
      selectionTable: "projects",
      eqColumn: "id",
    });
    updateDescription({
      Id,
      textEdit: textEditDescription,
      columnTitle: "description",
      selectionTable: "projects",
      eqColumn: "id",
    });
    handleClose();
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => setOpen(true);
  function handleTextEditName(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTextEdit(event.target.value);
  }

  function handleTextEditDescription(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setTextEditDescription(event.target.value);
  }
  return (
    <>
      <Typography
        variant={"h4"}
        color={"text"}
        align={"center"}
        onClick={handleOpen}
      >
        {ProjectName}
      </Typography>

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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Project Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            fullWidth
            variant="outlined"
            value={textEdit}
            onChange={(event) => handleTextEditName(event)}
          />
        </DialogContent>
        <DialogTitle>Edit Description</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            fullWidth
            variant="outlined"
            value={textEditDescription}
            onChange={(event) => handleTextEditDescription(event)}
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
