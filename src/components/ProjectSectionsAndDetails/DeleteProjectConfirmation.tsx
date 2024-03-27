import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAllWithRef } from "../../utils/UseQueryHookSupabase.ts";
import CustomizedSnackbars from "../reuseableComponents/EventSuccessSnackBar.tsx";

export default function DeleteProjectConfirmation({
  SectionId,
  ProjectId,
}: {
  SectionId: string[];
  ProjectId: string;
}) {
  const [open, setOpen] = useState(false);
  const { mutate: DeleteProject, isSuccess } = useDeleteAllWithRef({
    table: "Projects",
  });
  const { mutate: DeleteAllSection } = useDeleteAllWithRef({
    table: "Sections of Projects",
    onSuccessCallback: () =>
      DeleteProject({
        ReferenceId: ProjectId,
        table: "Projects",
        eqColumn: "ProjectId",
      }),
  });

  const { mutate: DeleteAllTasks } = useDeleteAllWithRef({
    table: "Tasks of each Section",
    onSuccessCallback: () =>
      DeleteAllSection({
        ReferenceId: ProjectId,
        table: "Sections of Projects",
        eqColumn: "ProjectRef",
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
        Delete Project
      </Button>
      <Dialog
        open={open}
        keepMounted
        onClose={() => setTimeout(() => handleClose(), 5000)}
      >
        <DialogTitle>Are you sure you want to delete this Project?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteSectionAndTask}>yes</Button>
          <Button onClick={handleClose}>no</Button>
        </DialogActions>
      </Dialog>
      {isSuccess ? <CustomizedSnackbars message={"Project Deleted"} /> : null}
    </>
  );
}
