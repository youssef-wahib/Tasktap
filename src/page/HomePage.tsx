import {
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import SwitchAccessShortcutAddIcon from "@mui/icons-material/SwitchAccessShortcutAdd";

import { usePostNewProject } from "../utils/UseQueryHookSupabase.ts";
import { BaseProjectTypeSupabase } from "../utils/ProjectTypes.ts";

function HomePage() {
  const [empty, setEmpty] = useState(false);
  const {
    mutate: addNewProject,
    isError,
    isSuccess,
    error,
  } = usePostNewProject();
  const [ProjectId, setProjectId] = useState(crypto.randomUUID());
  const [ProjectName, setProjectName] = useState("");
  const [ProjectDescription, setProjectDescription] = useState("");
  function handleClearState() {
    setProjectName("");
    setProjectDescription("");
    setProjectId(crypto.randomUUID());
  }

  function handlePosting() {
    const postData = {
      ProjectId,
      ProjectDescription,
      ProjectName,
      CreatedAt: new Date().toLocaleString(),
    } as BaseProjectTypeSupabase;
    ProjectName.length ? addNewProject(postData) : setEmpty(true);
    console.log(isSuccess);
    console.log(!ProjectName.length);
    if (isSuccess === !!ProjectName.length) {
      handleClearState();
    }
  }

  if (isError) console.log(error);

  return (
    <Container sx={{ pt: "5%" }}>
      <Card variant={"outlined"}>
        <CardContent>
          <Typography
            color={"text.primary"}
            variant={"h2"}
            gutterBottom
            align={"center"}
          >
            Create Your Project
          </Typography>
          <Typography color={"text.secondary"} variant={"h5"} align={"center"}>
            Enter the name of your project and a small description.
          </Typography>
        </CardContent>
        <Container sx={{ p: 3 }} maxWidth={"sm"}>
          <Stack direction={"column"} spacing={4}>
            <TextField
              variant={"outlined"}
              label={"Project Name"}
              required
              value={ProjectName}
              onChange={(event) => {
                setProjectName(event.target.value);
                if (event.target.value.length) setEmpty(false);
              }}
            />
            <TextField
              variant={"outlined"}
              label={"Project Description"}
              value={ProjectDescription}
              onChange={(event) => setProjectDescription(event.target.value)}
            />

            <Button
              disableElevation
              color={"secondary"}
              variant={"contained"}
              onClick={() => handlePosting()}
              startIcon={<SwitchAccessShortcutAddIcon />}
              disabled={empty}
            >
              Add Project
            </Button>

            {empty ? (
              <Typography variant={"h6"} align={"center"}>
                Please enter the project Name
              </Typography>
            ) : null}
          </Stack>
        </Container>
      </Card>
    </Container>
  );
}

export default HomePage;
