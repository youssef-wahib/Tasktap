import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedSnackbars from "../reusableComponents/EventSuccessSnackBar.tsx";
import { useDeleteProject } from "../../utils/useQuerySupabase.ts";

export default function DeleteProjectConfirmation({
  ProjectId,
}: {
  ProjectId: string;
}) {
  const [open, setOpen] = useState(false);
  const { mutate, isSuccess } = useDeleteProject();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleDelete() {
    mutate(ProjectId);
  }

  return (
    <>
      <Button
        endIcon={<DeleteIcon />}
        variant="contained"
        onClick={handleClickOpen}
        color={"error"}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setTimeout(() => handleClose(), 5000)}
      >
        <DialogTitle>Are you sure you want to delete this Project?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>yes</Button>
          <Button onClick={handleClose}>no</Button>
        </DialogActions>
      </Dialog>
      {isSuccess ? <CustomizedSnackbars message={"Project Deleted"} /> : null}
    </>
  );
}
