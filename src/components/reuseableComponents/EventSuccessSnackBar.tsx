import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";

export default function CustomizedSnackbars({ message }: { message: string }) {
  const [openMessage, setOpenMessage] = useState(true);
  function handleClose() {
    setOpenMessage(false);
  }
  return (
    <Snackbar open={openMessage} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
