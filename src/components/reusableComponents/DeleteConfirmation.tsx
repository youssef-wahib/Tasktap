import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomizedSnackbars from "./EventSuccessSnackBar.tsx";
import { useDelete } from "../../utils/useQuerySupabase.ts";

export default function DeleteConfirmation({
  Id,
  table,
}: {
  Id: string;
  table: string;
}) {
  const [open, setOpen] = useState(false);
  const { mutate, isSuccess } = useDelete(table);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleDelete() {
    mutate(Id);
  }
  const name = table === "projects" ? "project" : "section";
  return (
    <>
      <Button
        endIcon={<DeleteIcon />}
        variant="contained"
        onClick={handleClickOpen}
        color={"error"}
      >
        Delete {name}
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setTimeout(() => handleClose(), 5000)}
      >
        <DialogTitle>Are you sure you want to delete this {name}</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>yes</Button>
          <Button onClick={handleClose}>no</Button>
        </DialogActions>
      </Dialog>
      {isSuccess ? <CustomizedSnackbars message={`${name} Deleted`} /> : null}
    </>
  );
}