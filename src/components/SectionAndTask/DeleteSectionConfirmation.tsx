import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAllWithRef } from "../../utils/UseQueryHookSupabase.ts";
import CustomizedSnackbars from "../reuseableComponents/EventSuccessSnackBar.tsx";

export default function DeleteSectionConfirmation({
  SectionId,
}: {
  SectionId: string;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: DeleteSection, isSuccess } = useDeleteAllWithRef({
    table: "Sections of Projects",
  });

  const { mutate: DeleteAllTasks } = useDeleteAllWithRef({
    table: "Tasks of each Section",
    onSuccessCallback: () =>
      DeleteSection({
        ReferenceId: SectionId,
        table: "Sections of Projects",
        eqColumn: "SectionId",
      }),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function handleDeleteSectionAndTask() {
    DeleteAllTasks({
      ReferenceId: SectionId,
      table: "Tasks of each Section",
      eqColumn: "SectionRef",
    });
  }

  return (
    <>
      <Button
        endIcon={<DeleteIcon />}
        variant="contained"
        onClick={handleClickOpen}
        color={"error"}
      >
        Delete Section
      </Button>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to delete this section and all related tasks?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteSectionAndTask}>yes</Button>
          <Button onClick={handleClose}>no</Button>
        </DialogActions>
      </Dialog>
      {isSuccess ? <CustomizedSnackbars message={"Section Deleted"} /> : null}
    </>
  );
}
