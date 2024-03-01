import { Box, CircularProgress } from "@mui/material";

function LoadingComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: 20,
      }}
    >
      <CircularProgress size={"10rem"} />
    </Box>
  );
}

export default LoadingComponent;
